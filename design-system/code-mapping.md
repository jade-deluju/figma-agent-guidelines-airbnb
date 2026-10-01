---
name: code-mapping
layer: all
status: stable
---

# 코드 매핑

Figma 배리어블 이름을 코드 이름으로 바꾸는 규칙과, 모드를 코드에서 전환하는 방법입니다. `npm run tokens:build`가 이 규칙으로 `dist/tokens.css`를 만듭니다.

## 규칙

- **[MAP-01] MUST** 코드 이름은 `--{접두어}{경로를 소문자 kebab-case로}`. 접두어는 컬렉션마다 하나다.

  | 컬렉션 | 접두어 | Figma 이름 | 코드 이름 |
  |---|---|---|---|
  | Foundation | `fnd-` | `Color/Gray Dark/12` | `--fnd-color-gray-dark-12` |
  | Semantic Color | `color-` | `Fill/Primary Subtle/Hover` | `--color-fill-primary-subtle-hover` |
  | Semantic Responsive | 없음 | `Font Size/Heading Lg` | `--font-size-heading-lg` |
  | Component | 없음 | `Button/Primary/Container/Background/Hover` | `--button-primary-container-background-hover` |

  - 이유: 변환 규칙이 하나면 AI가 이름을 추측하지 않고 계산한다. `fnd-` 접두어는 "직접 쓰지 말 것"을 코드에서도 눈에 띄게 한다 (FND-01, CHK-16).
  - 문서 항목의 `코드` 필드는 이 규칙의 결과와 같아야 한다 (CHK-10).
- **[MAP-02] MUST** Figma 배리어블의 Code syntax(Web)에 `var(--코드 이름)`을 입력한다. Foundation은 비워 둔다.
  - 이유: Dev Mode와 MCP가 배리어블을 읽을 때 코드 이름을 함께 넘긴다. 에이전트가 이름을 다시 지어내지 않는다.
- **[MAP-03] MUST** 모드는 코드에서 이렇게 전환한다.
  - 테마: 기본은 Light. `<html data-theme="dark">`일 때 Dark 값.
  - 폭: 기본은 Mobile. `min-width` 미디어 쿼리로 Tablet, Desktop 값. 기준은 Foundation `Breakpoint/*`.
  - 컴포넌트 코드는 모드를 몰라도 된다. 같은 변수 이름이 모드에 따라 다른 값을 가진다.
  - <!-- CUSTOMIZE: 시스템 설정을 따르려면 data-theme 대신 prefers-color-scheme 미디어 쿼리를 쓰도록 scripts/tokens.mjs의 buildCss를 바꾼다 -->
- **[MAP-04] MUST NOT** `dist/tokens.css`를 손으로 고치지 않는다. Figma → 내보내기 → `npm run tokens:build` 순서로만 바뀐다.
- **[MAP-05] MUST NOT** Figma의 State 배리언트를 컴포넌트 prop으로 만들지 않는다. Hover는 `:hover`, Pressed는 `:active`, Focus는 `:focus-visible`, Disabled는 `disabled` 속성이다.
  - 이유: State는 사용자 인터랙션의 결과이지 개발자가 넘기는 값이 아니다. prop으로 만들면 실제 인터랙션과 표시가 어긋난다.

## 컴포넌트 코드에서 쓰는 순서

1. 컴포넌트 토큰이 있으면 컴포넌트 토큰 (`var(--button-primary-container-background-hover)`)
2. 없으면 Semantic (`var(--color-text-secondary)`, `var(--gap-stack)`)
3. Foundation(`--fnd-*`)은 쓰지 않는다

## 예시

```css
@import "../dist/tokens.css";

.button {
  height: var(--button-md-container-height);
  padding-inline: var(--button-md-container-padding-x);
  gap: var(--button-md-container-gap);
  border-radius: var(--button-base-container-radius);
  font-family: var(--button-base-label-font-family);
  font-weight: var(--button-base-label-font-weight);
  font-size: var(--button-md-label-font-size);
  line-height: var(--button-md-label-line-height);
}
.button[data-variant="primary"] {
  background: var(--button-primary-container-background-default);
  color: var(--button-primary-label-color-default);
}
.button[data-variant="primary"]:hover { background: var(--button-primary-container-background-hover); }
.button[data-variant="primary"]:active { background: var(--button-primary-container-background-pressed); }
.button:focus-visible {
  outline: var(--button-base-focus-ring-width) solid var(--button-base-focus-ring-color);
}
.button[data-variant="primary"]:disabled {
  background: var(--button-primary-container-background-disabled);
  color: var(--button-primary-label-color-disabled);
}
```

<!-- CUSTOMIZE: Tailwind·CSS-in-JS·네이티브 앱을 쓰면 이 문서에 해당 형식의 규칙을 추가하고, buildCss 대신 그 형식으로 내보내는 명령을 scripts/tokens.mjs에 추가한다 -->
