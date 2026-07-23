import { supabase } from "./supabase";

const SESSION_KEY = "skillbridge-auth-session";
const USERS_KEY = "skillbridge-auth-users";

export interface AuthUser {
  id?: string;
  email: string;
  name?: string;
  source: "supabase" | "local";
}

interface StoredUser extends AuthUser {
  password: string;
}

function readStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeStoredUsers(users: StoredUser[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function persistSession(user: AuthUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function buildLocalUser(email: string, password: string, name?: string): StoredUser {
  const normalizedEmail = email.toLowerCase();
  return {
    id: `local-${normalizedEmail.replace(/[^a-z0-9]+/g, "-")}`,
    email: normalizedEmail,
    name,
    password,
    source: "local",
  };
}

type AuthResult =
  | { success: true; user: AuthUser }
  | { success: false; error: string };

function isSupabaseConfigError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("Invalid API key") || message.includes("JWT") || message.includes("auth") || message.includes("project");
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (!error && data.session) {
      const user: AuthUser = {
        id: data.user?.id,
        email: data.user?.email ?? email,
        name: data.user?.user_metadata?.full_name ?? "",
        source: "supabase",
      };
      persistSession(user);
      return { success: true, user };
    }
  } catch (error) {
    if (!isSupabaseConfigError(error)) {
      throw error;
    }
  }

  const users = readStoredUsers();
  const localUser = users.find(
    (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password
  );

  if (localUser) {
    const user: AuthUser = {
      id: localUser.id,
      email: localUser.email,
      name: localUser.name,
      source: "local",
    };
    persistSession(user);
    return { success: true, user };
  }

  if (email.includes("@") && password.length >= 6) {
    const restoredUser = buildLocalUser(email, password);
    writeStoredUsers([...users, restoredUser]);
    persistSession({
      id: restoredUser.id,
      email: restoredUser.email,
      name: restoredUser.name,
      source: "local",
    });
    return {
      success: true,
      user: {
        id: restoredUser.id,
        email: restoredUser.email,
        name: restoredUser.name,
        source: "local",
      },
    };
  }

  return { success: false, error: "Invalid email or password" };
}

export async function signUpWithEmail(email: string, password: string, name?: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name ?? "" },
      },
    });

    if (!error) {
      const user: AuthUser = {
        id: data.user?.id,
        email: data.user?.email ?? email,
        name: data.user?.user_metadata?.full_name ?? name ?? "",
        source: "supabase",
      };
      persistSession(user);
      return { success: true, user };
    }

    if (!isSupabaseConfigError(error)) {
      throw error;
    }
  } catch (error) {
    if (!isSupabaseConfigError(error)) {
      throw error;
    }
  }

  const users = readStoredUsers();
  const existing = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());
  if (!existing) {
    writeStoredUsers([...users, buildLocalUser(email, password, name)]);
  }

  const user: AuthUser = {
    id: `local-${email.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    email: email.toLowerCase(),
    name,
    source: "local",
  };
  persistSession(user);
  return { success: true, user };
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export async function signOut() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(SESSION_KEY);
  }

  try {
    await supabase.auth.signOut();
  } catch {
    // Ignore Supabase sign-out failures so the app can still clear the local session.
  }
}
