
export type YTVideo = any;

export const CATEGORY_MAP: Record<string, number | "keyword"> = {
  all: 0,
  politics: 25,       // News & Politics
  entertainment: 24,  // Entertainment
  variety: 24,        // Treat as Entertainment
  economy: "keyword",
  society: "keyword",
  ict: "keyword",     // 정보통신·SW
  coding: "keyword"   // 코딩/프로그래밍
};

export const KEYWORDS: Record<string, string[]> = {
  economy: ["경제", "금리", "인플레", "환율", "고용", "주식", "부동산", "실업", "무역", "성장", "GDP", "recession", "inflation", "rate", "economy", "stocks"],
  society: ["사회", "사고", "재난", "교육", "복지", "노동", "파업", "출산", "범죄", "문화", "이슈", "사회문제", "society", "strike", "welfare"],
  ict: ["ICT", "정보통신", "통신사", "5G", "6G", "AI", "인공지능", "반도체", "칩", "칩셋", "CPU", "GPU", "소프트웨어", "SW", "클라우드", "Cloud", "SaaS", "오픈소스", "오픈 소스", "오라클", "마이크로소프트", "구글", "애플", "삼성", "SK", "네이버", "카카오"],
  coding: ["코딩", "프로그래밍", "개발자", "프론트엔드", "백엔드", "풀스택", "알고리즘", "자료구조", "JavaScript", "TypeScript", "Python", "C++", "C#", "Java", "Go", "Rust", "React", "Next.js", "Vue", "Spring", "Django"]
};

export function pickEuropeRegions() {
  return ["GB", "DE", "FR", "IT", "ES", "NL", "SE"];
}
