---
name: changelog
layer: all
status: stable
---

# 토큰 변경 기록

추가, 이름 변경, 폐기, 값 변경을 기록합니다. 형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를 따르고, 버전은 유의적 버전을 씁니다.

- MAJOR: 토큰 삭제, 이름 변경의 완료(이전 이름 제거)
- MINOR: 토큰 추가, 이름 변경의 시작(새 이름 추가 + 이전 이름 폐기 예정)
- PATCH: 값만 변경, 문서 수정

## 폐기 예정 토큰

에이전트는 아래 표의 "이전 이름"을 새로 쓰지 않는다. 기존 사용처를 발견하면 "대체 토큰"으로 바꾸자고 제안한다.

| 이전 이름 | 대체 토큰 | 폐기 예정 버전 | 삭제 예정 버전 |
|---|---|---|---|
| — | — | — | — |

## [Unreleased]

### 변경 (크레딧 절감)
- `agent-brief.md` 추가: 화면 작업용 요약. 토큰 목록(이름·용도·짝)은 JSON에서 자동 생성. AGENTS.md의 화면 작업 경로를 이 파일 하나로 변경
- 자동 생성 값 표(hex·px, 대비, 역조회)를 `tokens/values/`로 분리
- AGENTS.md: 매번 principles·tokens/README를 먼저 읽던 지시 삭제, 여러 프레임 처리 순서 추가
- 검증 범위를 "작업이 끝날 때 한 번, 바꾼 노드만"으로 축소 (FIG-96, CHK-69)

### 변경
- `CLAUDE.md`, `.github/copilot-instructions.md` 삭제. 도구 공용 진입점 `AGENTS.md` 하나로 통일 (README의 에이전트 연결 안내 갱신)

### 추가
- `figma-properties.md` 9. 단위: FIG-90~96 (px 기준, 줄 높이 px, 자간 %→em, 플러그인 API 단위 객체, % 크기 → Fill·fr, rem·em 환산, 미바인딩 숫자 점검)과 점검표 CHK-67~69
- `tokens:check` CHK-17: px·rem 외 단위 오류, 4 미만 줄 높이 경고
- `component-patterns.md`: 공개 디자인 시스템 7종에서 3종 이상에 있는 컴포넌트 50개의 구조 기준, 13개의 수치 범위(중앙값 ±20%), 규칙 PAT-01~08, 점검표 CHK-70~75. 원자료는 `research/component-benchmark.json`
- `playbooks/create-component.md`: 레시피 → 규격표 → 승인 → 제작 → 측정 검증
- Foundation `Size/64`·`80`·`96`, Semantic `Control Min Width/Sm`·`Md`·`Lg`, Component `Button/{Size}/Container/Min Width` — 라벨이 짧은 버튼이 정사각형이 되지 않도록 최소 너비를 높이의 2배로 둔다
- `figma-properties.md`: Figma 디자인 속성(구조, 오토 레이아웃, Constraints, 겉보기, 텍스트, 레이아웃 가이드, 컴포넌트, 모드)의 사용 기준 FIG-01~86과 점검표 CHK-40~66

## [0.1.0] — 키트 초안

### 추가
- Foundation: Gray, Blue, Red, Green, Amber 스케일(라이트·다크 각 12단계), White, Black, Black Alpha, Space, Size, Radius, Stroke, Type, Breakpoint
- Semantic Color: Surface, Fill, Text, Icon, Border, Overlay, Shadow (Light, Dark)
- Semantic Responsive: Margin, Gap, Inset, Control Height, Icon Size, Hit Area, Corner, Border Width, Font Family, Font Size, Line Height, Font Weight (Mobile, Tablet, Desktop)
- Component: Button
