export interface LeaderboardEntry {
  name: string;
  university: string;
  score: number;
  badge: string;
}

export const leaderboardData: LeaderboardEntry[] = [
  { name: "Nimasha", university: "University of Colombo", score: 92, badge: "Top 5%" },
  { name: "Dilan", university: "SLIIT", score: 88, badge: "Rising" },
  { name: "Kavindu", university: "Moratuwa", score: 84, badge: "Consistent" },
  { name: "Sadee", university: "University of Kelaniya", score: 81, badge: "Steady" },
];
