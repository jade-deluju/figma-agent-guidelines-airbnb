# Figma Agent Guidelines (실습용 초안)

Figma 디자인 시스템의 규칙(배리어블·토큰, 디자인 속성, 컴포넌트 형태)을 AI 에이전트가 읽을 수 있는 형태로 GitHub에서 관리하는 시작 키트입니다. 강의 "AI Readable한 Figma 활용 A to Z" 실습용이며, 가상의 모바일 앱을 가정한 샘플 값이 들어 있습니다.

모든 파일은 그대로 동작하는 초안입니다. `CUSTOMIZE` 표시가 있는 곳만 바꾸면 내 서비스의 규칙이 됩니다.

## 들어 있는 것

```
AGENTS.md                      에이전트 진입점 (도구 공용): 작업별로 어떤 문서를 읽을지, 항상 지킬 규칙
DESIGN.md                      화면 생성 도구용 한 장 요약
.github/
  pull_request_template.md     토큰 변경 PR 체크 항목
  workflows/tokens-check.yml   PR마다 자동 검사
design-system/
  agent-brief.md               화면 작업용 요약 — 에이전트가 화면 작업 때 이 파일 하나로 시작
  principles.md                설계 원칙 (PRN)
  naming.md                    이름 문법과 허용 어휘 (NAM)
  glossary.md                  용어 사전
  figma-properties.md          Figma 디자인 속성 사용 기준 (FIG) + 작업 후 점검표
  component-patterns.md        공개 디자인 시스템 7종 기반 컴포넌트 레시피 (PAT) + 형태 점검표
  research/                    레시피의 원자료 (시스템별 추출값)
  code-mapping.md              Figma 이름 → 코드 이름, 모드 → CSS (MAP)
  checklist.md                 검증 항목 (CHK) — 스크립트와 같은 ID
  CHANGELOG.md                 변경·폐기 기록
  tokens/
    README.md                  컬렉션 구조 지도
    foundation.md              재료 (FND)
    semantic-color.md          색 결정 — 테마 모드 (SEM)
    semantic-responsive.md     공간·크기·모양·타이포 결정 — 폭 모드 (RSP)
    components/                컴포넌트별 배선 (CMP) — README, _template, button
    values/                    자동 생성 값 표 (hex·px, 대비, 역조회) — 값이 필요할 때만
  playbooks/                   반복 작업 절차 6종
  decisions/                   결정 기록 (ADR)
tokens/                        Figma에서 내보낸 DTCG JSON (지금은 샘플)
scripts/tokens.mjs             sync · check · build (의존성 없음)
dist/tokens.css                코드용 CSS 변수 (자동 생성)
```

## 시작하기

1. **레포 만들기** — 이 폴더를 새 GitHub 레포로 올립니다. 팀에서 여러 번 쓸 거라면 레포 설정에서 Template repository로 지정해 두면 "Use this template"으로 복제할 수 있습니다.
2. **바꿀 곳 찾기** — VS Code에서 전체 검색(⌘⇧F / Ctrl+Shift+F)으로 `CUSTOMIZE`를 찾습니다.
3. **우선순위대로 바꾸기** — 아래 표.
4. **Figma에 배리어블 만들기** — 문서를 보고 직접 만들거나, Figma MCP가 연결된 에이전트에게 맡깁니다.
   > 예: "AGENTS.md를 먼저 읽고, design-system/tokens/ 문서대로 Figma에 Foundation → Semantic Color → Semantic Responsive 순서로 배리어블을 만들어 줘. 만들기 전에 계획을 먼저 보여줘."
5. **내보내고 맞추기** — Figma에서 DTCG JSON으로 내보내 `tokens/`에 덮어쓴 뒤 `npm run tokens:sync` → `npm run tokens:check`. 절차는 [sync-from-figma](design-system/playbooks/sync-from-figma.md).
6. **커밋·푸시** — PR을 열면 GitHub Actions가 같은 검사를 돌립니다.

## 커스터마이징 우선순위

| 우선순위 | 무엇 | 어디 |
|---|---|---|
| 꼭 | 서비스 이름과 분위기 | `AGENTS.md`, `DESIGN.md` |
| 꼭 | 브랜드 색 | `foundation.md` 생성 파라미터의 Blue 행 → Figma 값 교체 → 내보내기 |
| 꼭 | 글꼴 | Foundation `Type/Family/Sans` |
| 권장 | 톤의 의미 | `semantic-color.md`의 톤 |
| 권장 | 브레이크포인트, 모드 수 | `foundation.md`, `semantic-responsive.md` |
| 권장 | 섹션 2에서 정한 레이어·스타일 네이밍과 맞추기 | `naming.md` 허용 어휘, `button.md` 해부도, Text Style 표, `figma-properties.md` |
| 필요할 때 | 컴포넌트 추가 | `components/_template.md` 복사 |
| 그대로 | 원칙, 이름 문법, 스크립트 | — |

## 명령어

Node 18 이상이 필요합니다. 설치할 패키지는 없습니다.

| 명령 | 하는 일 |
|---|---|
| `npm run tokens:sync` | `tokens/*.json`을 읽어 문서의 GENERATED 블록을 다시 만든다 |
| `npm run tokens:check` | 규칙 위반을 검사한다 (checklist.md의 CHK-01~14, 17) |
| `npm run tokens:check -- --src ../my-app/src` | 코드 폴더의 원시 색값과 Foundation 직접 사용까지 검사한다 (CHK-15·16) |
| `npm run tokens:build` | `dist/tokens.css`를 만든다 |

터미널이 익숙하지 않다면 에이전트에게 맡겨도 됩니다.
> 예: "npm run tokens:check를 실행하고 실패 항목을 checklist.md의 보고 형식으로 정리해 줘."

## 손으로 쓰는 곳, 자동으로 만들어지는 곳

| 구분 | 무엇 | 바꾸는 방법 |
|---|---|---|
| 값의 원본 | Figma 배리어블 | Figma에서 |
| 값의 거울 | `tokens/*.tokens.json` | Figma에서 내보내기 (직접 수정 금지) |
| 자동 생성 | `<!-- GENERATED -->` 블록, `dist/tokens.css` | `npm run tokens:sync`, `npm run tokens:build` |
| 손으로 쓰는 결정 | 규칙, 역할·쓸 때·쓰지 말 때·짝, 해부도, 절차, ADR | 마크다운에서 직접 |

## 샘플 값에 대해

- 팔레트는 OKLCH로 생성했습니다. 파라미터는 `foundation.md`에 있습니다.
- 모든 전경 토큰은 짝 목록의 모든 면 위에서, Light·Dark 두 모드 모두 대비 기준(텍스트 4.5:1, 아이콘·식별 테두리 3:1)을 넘습니다. 결과는 `semantic-color.md`의 짝 대비 검증 표에서 볼 수 있습니다.
- 실제 Figma 내보내기는 샘플과 표기 방식이 조금 다를 수 있습니다. 스크립트는 흔한 차이(치수를 숫자로 쓰는 경우 등)를 함께 읽습니다.

## 에이전트 연결

규칙의 원본은 루트의 `AGENTS.md` 하나입니다. 특정 AI 도구 전용 파일을 따로 두지 않으므로, 어떤 LLM이나 에이전트를 써도 같은 규칙을 읽습니다.

- **AGENTS.md를 자동으로 읽는 도구**(VS Code + GitHub Copilot 등): 레포를 열면 바로 적용됩니다. 적용되지 않으면 도구 설정에서 AGENTS.md 사용 옵션을 확인하세요.
- **자동으로 읽지 않는 도구**: 첫 메시지에 "AGENTS.md를 먼저 읽고 시작해"라고 적습니다. 도구 전용 지침 파일이 꼭 필요하다면 그 파일에는 규칙을 옮겨 적지 말고 "루트의 AGENTS.md를 따른다" 한 줄만 둡니다. 규칙이 두 곳에 있으면 어긋나기 때문입니다.
