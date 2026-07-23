import { NextResponse } from "next/server";
import { sriLankanJobListings } from "../../lib/careerData";

export const dynamic = "force-dynamic";

function cleanText(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parseJobsFromHtml(html: string) {
  const anchors = Array.from(html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi));
  const keywordPattern = /(intern|developer|engineer|analyst|designer|software|qa|data|support|product|research)/i;

  const jobs = anchors
    .map(([, href, label]) => ({ href, label: cleanText(label) }))
    .filter(({ label, href }) => label && keywordPattern.test(label) && /job|career|intern|hire|apply/i.test(href))
    .slice(0, 8)
    .map(({ label, href }, index) => {
      const title = label.length > 60 ? label.slice(0, 60) + "..." : label;
      return {
        id: `scraped-${index + 1}`,
        title,
        company: "Local employer",
        location: "Sri Lanka",
        type: /intern/i.test(label) ? "Internship" : "Full-time",
        salaryLkr: "Updated from local listings",
        description: `Opportunity discovered from a public local careers page. Visit the listing for full details.`,
        skills: ["Communication", "Problem Solving"],
        matchScore: 78 + index,
        externalUrl: href,
      };
    });

  return jobs;
}

export async function GET() {
  try {
    const res = await fetch("https://www.topjobs.lk/", {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Unable to fetch jobs");

    const html = await res.text();
    const parsedJobs = parseJobsFromHtml(html);

    return NextResponse.json(parsedJobs.length ? parsedJobs : sriLankanJobListings);
  } catch {
    return NextResponse.json(sriLankanJobListings);
  }
}
