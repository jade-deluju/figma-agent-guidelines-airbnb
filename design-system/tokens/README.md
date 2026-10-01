---
name: tokens-index
layer: all
status: stable
---

# 토큰 구조 지도

토큰 작업을 시작하기 전에 읽는 첫 문서입니다. 어떤 컬렉션이 있고, 무엇을 참조하고, 어느 문서에 결정이 있는지 보여줍니다.

## 컬렉션

<!-- GENERATED:START id=collections-summary — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
| 컬렉션 | 레이어 | 모드 | 토큰 수 | 파일 |
|---|---|---|---|---|
| Foundation | foundation | Default | 191 | `tokens/foundation.tokens.json` |
| Semantic Color | semantic | Light, Dark | 57 | `tokens/semantic-color.{mode}.tokens.json` |
| Semantic Responsive | semantic | Mobile, Tablet, Desktop | 51 | `tokens/semantic-responsive.{mode}.tokens.json` |
| Component | component | Default | 65 | `tokens/component.tokens.json` |
<!-- GENERATED:END -->

| 컬렉션 | 참조 대상 | 결정 문서 |
|---|---|---|
| Foundation | 없음 (원시값) | [foundation.md](foundation.md) |
| Semantic Color | Foundation | [semantic-color.md](semantic-color.md) |
| Semantic Responsive | Foundation | [semantic-responsive.md](semantic-responsive.md) |
| Component | Semantic Color, Semantic Responsive | [components/](components/README.md) |

## 참조 흐름

```
Component ──▶ Semantic Color ─────▶ Foundation
          └─▶ Semantic Responsive ─┘
```

- 화살표 방향으로 한 단계만 참조한다 (PRN-03).
- 모드는 Semantic 두 컬렉션에만 있다 (PRN-04). Component는 모드가 없지만 참조한 Semantic을 통해 테마와 폭을 따라간다.

## Variable과 Style

| 대상 | 담는 곳 | 이유 |
|---|---|---|
| 색, 간격, 크기, 모서리, 선 두께 | Variable | 값 하나이고 모드 전환이 필요하다 |
| 글꼴, 글자 크기, 줄 높이, 굵기 (값 하나씩) | Variable | Text Style 안에서 바인딩해 모드 전환을 받는다 |
| 타이포 조합 | Text Style | 여러 값을 한 이름으로 묶어야 한다. 바인딩 표는 [semantic-responsive.md](semantic-responsive.md#text-style-바인딩) |
| 그림자 | Effect Style | 여러 값(오프셋, 블러, 색)의 조합. 색만 `Shadow/*` 배리어블에 바인딩한다 |
| 브레이크포인트 | Foundation Variable (바인딩 안 함) | 코드의 미디어 쿼리 기준과 모드 이름의 기준 |

## 파일 이름 규칙

- `tokens/{컬렉션}.tokens.json` — 모드가 없는 컬렉션 (Foundation, Component)
- `tokens/{컬렉션}.{모드}.tokens.json` — 모드가 있는 컬렉션. 모드 이름은 소문자 (예: `semantic-color.dark.tokens.json`)
- 컬렉션 이름은 kebab-case: `foundation`, `semantic-color`, `semantic-responsive`, `component`
- Figma에서 내보낸 파일 이름이 다르면 이 규칙에 맞게 바꿔 저장한다. 절차는 [sync-from-figma](../playbooks/sync-from-figma.md)

## Figma 설정 체크

| 컬렉션 | 발행 숨김 | 스코프 | Code syntax (Web) |
|---|---|---|---|
| Foundation | 켬 | 모두 끔 | 비워 둠 |
| Semantic Color | 끔 | 문서 항목의 `스코프` | 문서 항목의 `코드`를 `var(...)`로 감싸 입력 |
| Semantic Responsive | 끔 | 문서 항목의 `스코프` | 위와 같음 |
| Component | 끔 | 속성에 맞는 스코프 하나 ([code-mapping.md](../code-mapping.md)) | 규칙대로 입력 |

변수 설명(Description)에는 문서의 `역할` 문장을 그대로 넣는다. `npm run tokens:check`가 둘을 비교한다 (CHK-11).

## 문서 읽는 순서 (작업별)

| 작업 | 읽을 문서 |
|---|---|
| 화면을 만든다 | [agent-brief.md](../agent-brief.md) → (필요할 때만) 원본 문서의 해당 항목 |
| 값(hex·px)을 확인한다 | [values/](values/) |
| 컴포넌트를 만든다 | [component-patterns.md](../component-patterns.md) → [create-component](../playbooks/create-component.md) |
| 컴포넌트 토큰을 만든다 | [components/README.md](components/README.md) → [derive-component-tokens](../playbooks/derive-component-tokens.md) |
| 토큰을 추가·변경한다 | [add-token](../playbooks/add-token.md) 또는 [rename-deprecate](../playbooks/rename-deprecate.md) |
| 하드코딩을 정리한다 | [tokenize-hardcoded](../playbooks/tokenize-hardcoded.md) → foundation.md 역조회 |
