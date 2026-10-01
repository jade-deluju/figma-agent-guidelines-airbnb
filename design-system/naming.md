---
name: naming
layer: all
status: stable
---

# 네이밍 규칙

토큰 이름은 AI가 패턴으로 읽고 패턴으로 만듭니다. 문법과 어휘를 닫아 두면 한 가지 의미에 한 가지 이름만 나옵니다. 중복 토큰의 가장 흔한 원인은 동의어(Bg / Background / Surface)입니다.

## 규칙

- **[NAM-01] MUST** 경로는 `/`로 나누고 일반에서 구체 순서로 쓴다.
  - 이유: Figma 피커가 `/` 단위로 그룹을 묶고 접두어 검색이 된다. `Primary/Text`처럼 거꾸로 쓰면 텍스트 토큰이 한곳에 모이지 않는다.
- **[NAM-02] MUST** 단어는 대문자(또는 숫자)로 시작하고 띄어쓰기로 나눈다. 예: `On Primary`, `Line Height`
  - 이유: Figma 화면에서 읽기 쉽고, 코드 이름으로 바꾸는 규칙이 하나로 끝난다 ([code-mapping.md](code-mapping.md)).
  - <!-- CUSTOMIZE: 팀이 다른 표기(예: kebab-case)를 쓰면 이 규칙과 scripts/tokens.mjs의 CHK-06 검사를 함께 바꾼다 -->
- **[NAM-03] MUST NOT** 컬렉션끼리 최상위 그룹 이름을 겹치지 않는다. Foundation은 스케일 이름(`Space`, `Radius`)을, Semantic은 속성·역할 이름(`Gap`, `Corner`)을 쓴다.
  - 이유: 코드에서 합쳐지면 `Space/16`과 `Space/Section`이 한 그룹에 섞여 어느 레이어인지 구분되지 않는다.
- **[NAM-04]** Semantic Color 문법: `{Target}/{Role}[/{State}]`
- **[NAM-05]** Semantic Responsive 문법: `{Property}/{Role}`
- **[NAM-06]** Component 문법: `{Component}/{Variant}/{Part}/{Property}[/{State}]`
  - Variant — 그 토큰이 의존하는 배리언트 값(Type 값, Size 값). 어떤 배리언트와도 무관하면 `Base`.
  - Part — 해부도의 레이어 이름과 같다 (CMP-05).
  - State — 상태에 따라 값이 달라질 때만 붙인다.
- **[NAM-07]** Foundation 문법: 색은 `Color/{Scale}/{Step}`, 치수는 `{Group}/{값}`. 숫자 이름은 값 자체다 (FND-05).
- **[NAM-08] MUST NOT** 아래 허용 어휘에 없는 단어를 대상·속성·파트·상태 자리에 쓰지 않는다. 필요하면 어휘 목록을 먼저 고친다 (ADR 권장).
- **[NAM-09] MUST NOT** 약어를 쓰지 않는다 (`Bg`, `Btn`, `Txt`). 크기 등급 `Sm`·`Md`·`Lg`만 예외다.

## 레이어별 예시

| 레이어 | ✅ | ❌ | 틀린 이유 |
|---|---|---|---|
| Foundation | `Color/Blue/9`, `Space/16` | `Color/Primary`, `Space/4` (=16px) | Foundation에 의미를 넣음 / 이름이 값이 아님 |
| Semantic Color | `Fill/Accent/Hover` | `Fill/Blue/Hover`, `Button/Hover` | 색 이름 / 컴포넌트 이름 |
| Semantic Responsive | `Gap/Section`, `Corner/Control` | `Space/Section`, `Corner/8` | Foundation 그룹과 겹침 / 값이 이름에 |
| Component | `Button/Primary/Container/Background/Hover` | `Button/Primary Hover BG` | 문법을 따르지 않음 / 약어 |

## 동의어 금지

| 쓰는 말 | 쓰지 않는 말 |
|---|---|
| `Surface`(면), `Fill`(채움) — Semantic 대상 자리 | Background, Bg, Base |
| `Pressed` | Active, Clicked, Down |
| `Disabled` | Inactive, Off |
| `Selected` | Checked, Current, On |
| `Border` | Outline, Line, Stroke (Stroke는 Foundation 두께 스케일 이름으로만) |
| `Corner` | Rounded, Round, Radius (Radius는 Foundation 스케일 이름으로만) |
| `Inset` | Padding (Component 속성 `Padding X`는 예외) |

`Background`는 Component 속성 자리(`Container/Background`)에서만 쓴다.

## 코드 이름

Figma 이름을 코드 이름으로 바꾸는 규칙은 [code-mapping.md](code-mapping.md)의 MAP-01 하나뿐이다.

## 허용 어휘

`npm run tokens:check`가 아래 목록을 읽어 이름을 검사한다 (CHK-06). 어휘를 바꾸려면 이 목록을 고친다. 스크립트를 고치지 않는다.

<!-- CUSTOMIZE: 톤·컴포넌트 파트를 추가하면 여기에 먼저 등록한다 -->

<!-- VOCAB:START -->
- Color Target: Surface, Fill, Text, Icon, Border, Overlay, Shadow
- Responsive Property: Margin, Gap, Inset, Control Height, Control Min Width, Icon Size, Hit Area, Corner, Border Width, Font Family, Font Size, Line Height, Font Weight
- State: Default, Hover, Pressed, Focus, Disabled, Selected
- Component Part: Container, Label, Icon, Hit Area, Focus Ring
- Component Property: Background, Color, Height, Min Height, Min Width, Size, Padding X, Gap, Radius, Width, Font Family, Font Size, Line Height, Font Weight
- Forbidden In Semantic: Gray, Blue, Red, Green, Amber, Black, White, Dark, Light, Alpha
<!-- VOCAB:END -->
