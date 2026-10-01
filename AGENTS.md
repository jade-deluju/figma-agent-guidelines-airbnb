# AGENTS.md

이 레포는 디자인 시스템의 토큰 규칙을 AI 에이전트에게 전달합니다. 값의 원본은 Figma 배리어블이고, 이 레포는 그 값의 거울(`tokens/`)과 결정(`design-system/`)을 담습니다.

이 파일은 특정 AI 도구 전용이 아닌 공용 지침입니다. 어떤 에이전트든 이 파일을 규칙의 원본으로 삼습니다.

<!-- CUSTOMIZE: 서비스 이름과 한 줄 설명 -->

## 읽는 방법

아래 표에서 지금 작업에 해당하는 문서만 읽는다. 전부 읽지 않는다.

- 화면 작업(만들기·수정·리디자인)은 [design-system/agent-brief.md](design-system/agent-brief.md) 하나로 시작한다. 판단이 안 될 때만 원본 문서의 해당 항목 하나를 찾아 읽는다.
- `principles.md`와 `tokens/README.md`는 규칙을 고치거나 토큰을 추가·변경할 때만 읽는다.
- `tokens/values/`(hex·px 값 표)는 값이 꼭 필요할 때만 연다.

## 작업별 라우팅

| 작업 | 읽을 문서 | 따를 절차 |
|---|---|---|
| Figma에서 화면 만들기·수정·리디자인 | `agent-brief.md` (필요한 항목만 원본에서) | 끝나면 `agent-brief.md`의 마무리 점검 |
| 컴포넌트 만들기 | `component-patterns.md`, `tokens/components/README.md`, `figma-properties.md` | `playbooks/create-component.md` |
| 컴포넌트 토큰 만들기 | `tokens/components/README.md`, 해당 컴포넌트 문서 | `playbooks/derive-component-tokens.md` |
| 토큰 추가 | `naming.md`, 해당 레이어 문서 | `playbooks/add-token.md` |
| 이름 변경·폐기 | `CHANGELOG.md` | `playbooks/rename-deprecate.md` |
| 하드코딩 값 정리 | `tokens/values/foundation.values.md`의 역조회 | `playbooks/tokenize-hardcoded.md` |
| Figma 변경을 레포에 반영 | `tokens/README.md` | `playbooks/sync-from-figma.md` |
| 코드 작성 | `code-mapping.md`, 해당 컴포넌트 문서 | — |
| 작업 검증 | 화면: `agent-brief.md` 마무리 점검 · 컴포넌트: `component-patterns.md`·`figma-properties.md` 점검표 · 토큰: `checklist.md` | — |

경로는 모두 `design-system/` 아래다.

## 항상 지키는 규칙

1. 화면과 코드에 원시값(hex, px)을 쓰지 않는다. [PRN-06]
2. Foundation 토큰을 레이어나 코드에 직접 쓰지 않는다. [FND-01]
3. 목록에 없는 토큰을 만들지 않는다. 맞는 토큰이 없으면 멈추고 add-token 형식으로 제안한다. [PRN-07]
4. 참조는 Component → Semantic → Foundation, 한 단계 아래로만. [PRN-03]
5. 테마와 화면 폭에 따라 다른 토큰을 고르지 않는다. 같은 토큰에 모드를 적용한다. [PRN-04, RSP-01]
6. 텍스트·아이콘·테두리는 문서의 `짝` 목록에 있는 면 위에서만 쓴다. [SEM-05]
7. `Primary` 톤은 라이트에서 검정, 다크에서 흰색인 주요 행동이다. 브랜드 색은 `Accent`다. [ADR-0001]
8. CHANGELOG의 폐기 예정 표에 있는 토큰은 새로 쓰지 않는다.
9. `tokens/*.tokens.json`, `GENERATED` 블록, `dist/`를 직접 고치지 않는다. [PRN-01, MAP-04]
10. 화면은 Frame과 오토 레이아웃으로 만들고, 요소마다 Resizing(Hug·Fill·Fixed)을 의도대로 정한다. [FIG-01, FIG-10, FIG-20]
11. 컴포넌트를 만들기 전에 `component-patterns.md`에서 같은 컴포넌트의 레시피를 찾고, 기본 크기 수치는 범위 안에서 고른다. 형태를 추측하지 않는다. [PAT-01, PAT-02]

## 여러 프레임을 처리할 때

1. 문서는 세션 시작 때 한 번만 읽는다.
2. 첫 프레임을 만들고 검증해 패턴(구조, 토큰 선택)을 확정한다.
3. 나머지 프레임에는 그 패턴을 그대로 적용한다. 프레임마다 문서를 다시 읽거나 같은 판단을 반복하지 않는다.
4. 검증은 프레임마다 작업이 끝날 때 한 번, 바꾼 노드만 한다. 스크린샷은 프레임당 마지막에 한 번.

## 명령

- `npm run tokens:sync` — 문서의 GENERATED 블록 갱신
- `npm run tokens:check` — 규칙 검사. 코드까지 검사하려면 `npm run tokens:check -- --src <폴더>`
- `npm run tokens:build` — `dist/tokens.css` 생성

화면 작업을 마치면 [agent-brief.md의 마무리 점검](design-system/agent-brief.md)으로, 컴포넌트 작업을 마치면 [figma-properties.md](design-system/figma-properties.md#점검표)와 [component-patterns.md](design-system/component-patterns.md#점검표) 점검표로 검사한다. 토큰이나 문서를 바꿨다면 `npm run tokens:check`도 실행한다. 두 결과 모두 [checklist.md](design-system/checklist.md)의 보고 형식으로 결과를 보고한다.

## 승인이 필요한 작업

아래는 먼저 제안하고, 사람이 승인한 뒤에 실행한다.

- Figma 배리어블 생성, 삭제, 이름 변경
- 하드코딩 매핑표의 일괄 교체
- 규칙 문서(principles, naming의 허용 어휘, 각 레이어의 규칙) 수정

## 문서를 고칠 때

- 프런트매터를 유지한다.
- 규칙은 `[ID] MUST / MUST NOT` + 한 줄 이유 형식을 지킨다.
- 토큰 항목은 필드 순서를 지킨다 (역할 → 쓸 때 → 쓰지 말 때 → 짝 → 대비 기준 → 스코프 → 코드 → 상태 → 비고).
- `<!-- CUSTOMIZE: ... -->` 주석은 사람이 바꿀 곳 표시다. 요청받지 않으면 지우지 않는다.
