
# YouTube Hot Clip (KR / US / EU)

Next.js(App Router) + **MUI**로 만든 **급상승/이슈 영상 모음**.  
지역(한국/미국/유럽)과 카테고리(종합·정치·경제·사회·연예·예능·정보통신·SW·코딩)를 선택하고, **다크/라이트/나이트 모드**를 지원합니다.

## ✨ Features
- KR / US / EU(대표 국가 묶음) **트렌딩 영상** 수집
- 카테고리 탭: 종합 · 정치(News & Politics) · 경제(키워드 필터) · 사회(키워드 필터) · 연예(Entertainment) · 예능(Entertainment) · **정보통신·SW(ICT 키워드)** · **코딩(프로그래밍 키워드)**
- 키워드 필터 입력(예: 금리, 총선, 파업, AI, Python ...)
- **MUI 테마 3종**: Light / Dark / Night
- 반응형 카드 그리드, 썸네일/채널/업로드일/조회수 표시
- 로딩 시 **스피너 + wait 커서** 표시

## 🛠️ Tech Stack
- Next.js 15 App Router
- React 18
- MUI v6 (Material UI)
- SWR

## 🔑 환경 변수
루트에 `.env.local`을 만들고 **YouTube Data API v3** 키를 넣어주세요.
```env
YT_API_KEY=YOUR_YOUTUBE_API_KEY
```

> NOTE: 유럽(EU)은 GB/DE/FR/IT/ES/NL/SE 대표 국가들의 트렌딩을 합쳐 상위 일부를 노출합니다.

## ▶️ 실행
```bash
npm i
next dev
# build
next build && next dev
```

## 📁 주요 파일
- `app/page.tsx` : 대시보드(클라이언트) — 지역/카테고리/검색 제어 및 목록 렌더
- `app/api/trending/route.ts` : 서버 API — YouTube 트렌딩 취합/필터/정규화
- `components/*` : 테마, 탭/토글, 카드 컴포넌트
- `lib/youtube.ts` : 카테고리 매핑/키워드/유럽 국가 목록

## 📌 한계와 메모
- 유튜브 API는 일일 쿼터 제한이 있으므로 운영 시 캐시/백엔드 저장을 권장합니다.
- ‘경제/사회/정보통신·SW/코딩’은 YouTube 카테고리로 구분이 애매하므로 **제목 키워드**로 1차 필터링합니다.
- “급상승”은 `chart=mostPopular`을 사용해 근사치로 구현했습니다.
