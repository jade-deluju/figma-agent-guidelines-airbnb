---
name: button
layer: component
token_prefix: Button/
figma_component: Button
status: stable
---

# Button

## 목적

- 사용자가 지금 화면에서 실행할 행동 하나를 시작하게 한다.
- 쓰지 말 때:
  - 다른 화면으로 이동만 할 때 → 링크 (`Text/Link`)
  - 켜고 끄는 설정 → 토글
  - 여러 값 중 하나를 고를 때 → 세그먼트 컨트롤 또는 칩

## 해부도

파트 이름 = Figma 레이어 이름 = 토큰의 Part 자리 (CMP-05).

```
Button                    컴포넌트 세트
└─ Hit Area               투명. 높이가 44보다 작은 Sm에서 터치 영역을 확보한다
   └─ Container           오토 레이아웃 가로, 가운데 정렬. 채움·모서리·안쪽 여백·간격
      ├─ Icon             앞 아이콘 (Has Leading Icon이 켜졌을 때)
      ├─ Label            텍스트
      └─ Icon             뒤 아이콘 (Has Trailing Icon이 켜졌을 때)
```

- 포커스 링은 별도 레이어가 아니라 Focus 배리언트의 Container 테두리로 그린다 (`Button/Base/Focus Ring/*`).
- 두 Icon 레이어는 같은 토큰을 쓴다. 앞뒤 구분은 프로퍼티 이름으로만 한다.

<!-- CUSTOMIZE: 섹션 2에서 정한 레이어 네이밍(예: HitArea)과 다르면 레이어 이름, 이 해부도, naming.md의 Component Part 어휘를 한꺼번에 맞춘다 -->

## 프로퍼티 매핑

Figma 프로퍼티 순서: 배리언트 → 텍스트 → 불리언 → 인스턴스 스왑.

| Figma 프로퍼티 | 종류 | 값 | 코드 prop | 비고 |
|---|---|---|---|---|
| Type | Variant | Primary, Accent, Danger | `variant` | 톤 정의는 semantic-color.md |
| Size | Variant | Sm, Md, Lg | `size` | |
| State | Variant | Default, Hover, Pressed, Focus, Disabled | — | prop 아님. 코드에서는 `:hover`, `:active`, `:focus-visible`, `disabled` 속성 (MAP-05) |
| Label | Text | | `children` | |
| Has Leading Icon | Boolean | | — | 아래 Leading Icon과 합쳐 prop 하나 |
| Has Trailing Icon | Boolean | | — | 아래 Trailing Icon과 합쳐 prop 하나 |
| Leading Icon | Instance swap | 아이콘 컴포넌트 | `leadingIcon` | 값이 있으면 표시 |
| Trailing Icon | Instance swap | 아이콘 컴포넌트 | `trailingIcon` | 값이 있으면 표시 |

Figma에서는 "보일지(Boolean)"와 "무엇을(Instance swap)"이 나뉘지만, 코드에서는 아이콘을 넘겼는지로 둘 다 표현한다.

## 형태 기준

참고 레시피: [component-patterns.md의 Button](../../component-patterns.md#button). `density: mobile` 범위로 판정한다.

| 지표 (Md) | 범위 (모바일) | 이 컴포넌트 | 토큰 | 판정 |
|---|---|---|---|---|
| 높이 | 32–48 | 40 | `Control Height/Md` | ✅ |
| 좌우 패딩 | 15–22.5 | 16 | `Inset/Md` | ✅ |
| 좌우 패딩 ÷ 높이 | 0.34–0.52 | 0.40 | — | ✅ |
| 최소 너비 | 68–102 | 80 | `Control Min Width/Md` | ✅ |
| 최소 너비 ÷ 높이 | 1.54–2.31 | 2.00 | — | ✅ |
| 아이콘-라벨 간격 | 7–10.5 | 8 | `Gap/Inline` | ✅ |
| 글자 크기 | 14–21 | 14 | `Font Size/Label Md` | ✅ |
| 아이콘 크기 | 참고 18 | 20 | `Icon Size/Md` | 참고 |

- Sm(32)·Lg(48)는 Md에서 높이를 한 단계씩 바꾸고, 최소 너비는 높이의 2배(64·96)를 유지한다 (PAT-04).
- Container는 너비 Hug + Min width, 높이 Fixed다. 라벨이 "확인"처럼 짧아도 가로로 긴 형태가 유지된다.
- 아이콘만 있는 버튼은 이 컴포넌트가 아니다. 정사각형 Icon Button 컴포넌트로 따로 만든다.

<!-- CUSTOMIZE: 토큰 값을 바꾸면 이 표의 값과 판정도 다시 채운다 -->

## 상태 규칙

| 상태 | 무엇이 바뀌나 | 토큰 |
|---|---|---|
| Default | — | `Button/{Type}/*/Default` |
| Hover | 채움만 바뀐다. 라벨·아이콘 색은 유지 | `Button/{Type}/Container/Background/Hover` |
| Pressed | 채움만 바뀐다 | `Button/{Type}/Container/Background/Pressed` |
| Focus | 채움은 Default 유지, Container에 포커스 링 | `Button/Base/Focus Ring/Color`, `Width` |
| Disabled | 채움·라벨·아이콘이 모든 Type 공통 비활성 값 | `Button/{Type}/*/Disabled` |

- 라벨과 아이콘 색은 Hover·Pressed에서 바뀌지 않지만 토큰은 상태별로 모두 만든다 (CMP-02). 나중에 상태별로 달라져도 구조가 바뀌지 않는다.
- Sm 버튼은 보이는 높이가 32이므로 Hit Area 레이어를 `Button/Sm/Hit Area/Min Height`(44)로 둔다.
- 한 화면에 `Type=Primary`는 하나만 둔다 (ADR-0001).

## 토큰화하지 않는 것

- 그림자: 버튼은 평면이다. 그림자가 필요하면 Effect Style을 먼저 정하고 `Shadow/*`를 바인딩한다.
- 최대 너비: 레이아웃이 정한다 (부모의 오토 레이아웃). 최소 너비는 토큰화한다 (`Button/{Size}/Container/Min Width`).
- 애니메이션: 확장 슬롯 (foundation.md의 Motion).

## 잘못 쓰는 패턴

- ❌ Danger 버튼 라벨에 `Text/Danger` → ✅ `Button/Danger/Label/Color/Default` (= `Text/On Danger`). `Text/Danger`는 빨간 글자이고 빨간 채움 위에서는 보이지 않는다.
- ❌ 인스턴스에서 Container 채움을 직접 바꿈 → ✅ Type 배리언트를 바꾼다 (CMP-06)
- ❌ 포커스 상태에 Hover 채움을 재사용 → ✅ 채움은 Default, 포커스 링만 더한다 (SEM-06)
- ❌ 코드에 `state="hover"` prop → ✅ CSS `:hover` (MAP-05)
- ❌ 비활성 버튼을 Type마다 다른 회색으로 → ✅ 세 Type 모두 `Fill/Disabled`

## 코드 연결

<!-- CUSTOMIZE: Figma 기업(Organization/Enterprise) 플랜에서 Code Connect를 쓰면 매핑 파일 경로를 여기에 적는다. 다른 플랜에서는 위 프로퍼티 매핑 표가 그 역할을 한다 -->

## 토큰 맵

<!-- GENERATED:START id=token-map — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
| 토큰 | 배리언트 | 파트 | 속성 | 상태 | → Semantic |
|---|---|---|---|---|---|
| `Button/Primary/Container/Background/Default` | Primary | Container | Background | Default | `Fill/Primary/Default` |
| `Button/Primary/Container/Background/Hover` | Primary | Container | Background | Hover | `Fill/Primary/Hover` |
| `Button/Primary/Container/Background/Pressed` | Primary | Container | Background | Pressed | `Fill/Primary/Pressed` |
| `Button/Primary/Container/Background/Disabled` | Primary | Container | Background | Disabled | `Fill/Disabled` |
| `Button/Primary/Label/Color/Default` | Primary | Label | Color | Default | `Text/On Primary` |
| `Button/Primary/Label/Color/Hover` | Primary | Label | Color | Hover | `Text/On Primary` |
| `Button/Primary/Label/Color/Pressed` | Primary | Label | Color | Pressed | `Text/On Primary` |
| `Button/Primary/Label/Color/Disabled` | Primary | Label | Color | Disabled | `Text/Disabled` |
| `Button/Primary/Icon/Color/Default` | Primary | Icon | Color | Default | `Icon/On Primary` |
| `Button/Primary/Icon/Color/Hover` | Primary | Icon | Color | Hover | `Icon/On Primary` |
| `Button/Primary/Icon/Color/Pressed` | Primary | Icon | Color | Pressed | `Icon/On Primary` |
| `Button/Primary/Icon/Color/Disabled` | Primary | Icon | Color | Disabled | `Icon/Disabled` |
| `Button/Accent/Container/Background/Default` | Accent | Container | Background | Default | `Fill/Accent/Default` |
| `Button/Accent/Container/Background/Hover` | Accent | Container | Background | Hover | `Fill/Accent/Hover` |
| `Button/Accent/Container/Background/Pressed` | Accent | Container | Background | Pressed | `Fill/Accent/Pressed` |
| `Button/Accent/Container/Background/Disabled` | Accent | Container | Background | Disabled | `Fill/Disabled` |
| `Button/Accent/Label/Color/Default` | Accent | Label | Color | Default | `Text/On Accent` |
| `Button/Accent/Label/Color/Hover` | Accent | Label | Color | Hover | `Text/On Accent` |
| `Button/Accent/Label/Color/Pressed` | Accent | Label | Color | Pressed | `Text/On Accent` |
| `Button/Accent/Label/Color/Disabled` | Accent | Label | Color | Disabled | `Text/Disabled` |
| `Button/Accent/Icon/Color/Default` | Accent | Icon | Color | Default | `Icon/On Accent` |
| `Button/Accent/Icon/Color/Hover` | Accent | Icon | Color | Hover | `Icon/On Accent` |
| `Button/Accent/Icon/Color/Pressed` | Accent | Icon | Color | Pressed | `Icon/On Accent` |
| `Button/Accent/Icon/Color/Disabled` | Accent | Icon | Color | Disabled | `Icon/Disabled` |
| `Button/Danger/Container/Background/Default` | Danger | Container | Background | Default | `Fill/Danger/Default` |
| `Button/Danger/Container/Background/Hover` | Danger | Container | Background | Hover | `Fill/Danger/Hover` |
| `Button/Danger/Container/Background/Pressed` | Danger | Container | Background | Pressed | `Fill/Danger/Pressed` |
| `Button/Danger/Container/Background/Disabled` | Danger | Container | Background | Disabled | `Fill/Disabled` |
| `Button/Danger/Label/Color/Default` | Danger | Label | Color | Default | `Text/On Danger` |
| `Button/Danger/Label/Color/Hover` | Danger | Label | Color | Hover | `Text/On Danger` |
| `Button/Danger/Label/Color/Pressed` | Danger | Label | Color | Pressed | `Text/On Danger` |
| `Button/Danger/Label/Color/Disabled` | Danger | Label | Color | Disabled | `Text/Disabled` |
| `Button/Danger/Icon/Color/Default` | Danger | Icon | Color | Default | `Icon/On Danger` |
| `Button/Danger/Icon/Color/Hover` | Danger | Icon | Color | Hover | `Icon/On Danger` |
| `Button/Danger/Icon/Color/Pressed` | Danger | Icon | Color | Pressed | `Icon/On Danger` |
| `Button/Danger/Icon/Color/Disabled` | Danger | Icon | Color | Disabled | `Icon/Disabled` |
| `Button/Sm/Container/Height` | Sm | Container | Height | — | `Control Height/Sm` |
| `Button/Sm/Container/Min Width` | Sm | Container | Min Width | — | `Control Min Width/Sm` |
| `Button/Sm/Container/Padding X` | Sm | Container | Padding X | — | `Inset/Sm` |
| `Button/Sm/Container/Gap` | Sm | Container | Gap | — | `Gap/Inline Tight` |
| `Button/Sm/Label/Font Size` | Sm | Label | Font Size | — | `Font Size/Label Sm` |
| `Button/Sm/Label/Line Height` | Sm | Label | Line Height | — | `Line Height/Label Sm` |
| `Button/Sm/Icon/Size` | Sm | Icon | Size | — | `Icon Size/Sm` |
| `Button/Sm/Hit Area/Min Height` | Sm | Hit Area | Min Height | — | `Hit Area/Min` |
| `Button/Md/Container/Height` | Md | Container | Height | — | `Control Height/Md` |
| `Button/Md/Container/Min Width` | Md | Container | Min Width | — | `Control Min Width/Md` |
| `Button/Md/Container/Padding X` | Md | Container | Padding X | — | `Inset/Md` |
| `Button/Md/Container/Gap` | Md | Container | Gap | — | `Gap/Inline` |
| `Button/Md/Label/Font Size` | Md | Label | Font Size | — | `Font Size/Label Md` |
| `Button/Md/Label/Line Height` | Md | Label | Line Height | — | `Line Height/Label Md` |
| `Button/Md/Icon/Size` | Md | Icon | Size | — | `Icon Size/Md` |
| `Button/Md/Hit Area/Min Height` | Md | Hit Area | Min Height | — | `Hit Area/Min` |
| `Button/Lg/Container/Height` | Lg | Container | Height | — | `Control Height/Lg` |
| `Button/Lg/Container/Min Width` | Lg | Container | Min Width | — | `Control Min Width/Lg` |
| `Button/Lg/Container/Padding X` | Lg | Container | Padding X | — | `Inset/Lg` |
| `Button/Lg/Container/Gap` | Lg | Container | Gap | — | `Gap/Inline` |
| `Button/Lg/Label/Font Size` | Lg | Label | Font Size | — | `Font Size/Label Lg` |
| `Button/Lg/Label/Line Height` | Lg | Label | Line Height | — | `Line Height/Label Lg` |
| `Button/Lg/Icon/Size` | Lg | Icon | Size | — | `Icon Size/Lg` |
| `Button/Lg/Hit Area/Min Height` | Lg | Hit Area | Min Height | — | `Hit Area/Min` |
| `Button/Base/Container/Radius` | Base | Container | Radius | — | `Corner/Control` |
| `Button/Base/Label/Font Family` | Base | Label | Font Family | — | `Font Family/Base` |
| `Button/Base/Label/Font Weight` | Base | Label | Font Weight | — | `Font Weight/Label` |
| `Button/Base/Focus Ring/Color` | Base | Focus Ring | Color | — | `Border/Focus` |
| `Button/Base/Focus Ring/Width` | Base | Focus Ring | Width | — | `Border Width/Focus Ring` |
<!-- GENERATED:END -->
