---
name: figma-properties
layer: all
source: Figma Learn 도움말 (2026-10 확인)
status: stable
---

# Figma 디자인 속성 가이드

Figma 디자인 파일에서 설정하는 속성이 무엇을 뜻하고 언제 써야 하는지 정리한 문서입니다. 에이전트는 화면과 컴포넌트를 만들 때 이 문서를 따르고, 작업을 마친 뒤 맨 아래 [점검표](#점검표)로 결과물을 검사합니다.

- 색·간격·크기 같은 **값**을 어떤 토큰으로 채우는지는 토큰 문서가 정합니다 (semantic-color.md, semantic-responsive.md). 이 문서는 **속성 자체를 어떻게 설정하는지**를 정합니다.
- 속성 이름은 Figma 영문 UI 기준입니다. 한국어 UI에서는 표기가 다를 수 있습니다.
- 기능 이름과 동작은 Figma 업데이트로 바뀔 수 있습니다. 출처는 문서 끝에 있습니다.

## 읽는 법

속성마다 **뜻 → 사용 기준(규칙) → 코드 대응** 순서로 씁니다. 규칙은 `[FIG-번호]`로 표시하며, 점검표 항목이 이 번호를 근거로 가리킵니다.

---

## 1. 구조 — 어떤 레이어로 감쌀 것인가

### Frame, Group, Section

- **뜻**
  - **Frame**: 크기, 레이아웃, 채움, 잘라내기를 가진 컨테이너입니다.
  - **Group**: 선택을 묶기만 하고 자체 크기가 없습니다. 담긴 레이어의 경계가 곧 그룹의 경계입니다.
  - **Section**: 캔버스에서 화면과 작업물을 정리하는 영역입니다.
- **[FIG-01] MUST** 화면과 컴포넌트 안의 모든 컨테이너는 Frame으로 만든다. Group은 쓰지 않는다.
  - 이유: Group에는 오토 레이아웃과 Constraints를 적용할 수 없고, 코드에 대응하는 구조도 없다. AI가 Group을 읽으면 위치값을 절대 좌표로 옮긴다.
- **[FIG-02] MUST** Section은 캔버스 정리용으로만 쓴다. 화면 프레임 안에 넣지 않는다.
- **[FIG-03] MUST NOT** 모양을 잘라내려고 Mask를 쓰지 않는다. 부모 Frame의 Clip content를 쓴다.
  - 이유: Mask는 코드에 직접 대응하는 구조가 없다. Clip content는 `overflow: hidden` 하나로 옮겨진다.
- **[FIG-04] MUST** 모든 레이어에 역할을 나타내는 이름을 붙인다. `Frame 12`, `Rectangle 4` 같은 기본 이름을 남기지 않는다.
  - 이유: AI는 레이어 이름으로 역할을 추측한다. 기본 이름은 아무 정보도 주지 않는다.
  - <!-- CUSTOMIZE: 섹션 2에서 정한 레이어 네이밍 규칙(예: Row/Align, Box/Inset, Spacer/Push)으로 연결한다 -->
- **코드**: Frame → `div` 같은 블록 요소. Group은 대응 없음.

### 위치와 크기 값 (X, Y, W, H, Rotation)

- **뜻**: 부모 기준의 좌표, 너비·높이, 회전 각도입니다.
- **[FIG-05] MUST** 좌표와 크기는 정수로 둔다. `12.5` 같은 소수 값을 남기지 않는다.
  - 이유: 소수 픽셀은 렌더링이 흐려지고, 코드에 옮길 때 반올림 차이가 생긴다.
- **[FIG-06] MUST NOT** UI 요소를 회전해서 방향을 바꾸지 않는다. 방향이 다른 아이콘은 별도 아이콘 컴포넌트로 만든다.
  - 이유: 회전된 레이어는 경계 상자가 달라져 레이아웃 계산이 어긋난다.

---

## 2. 오토 레이아웃 (Auto layout)

### 흐름 — Vertical · Horizontal · Wrap · Grid

- **뜻**
  - **Vertical / Horizontal**: 자식을 세로 또는 가로 한 방향으로 나열합니다.
  - **Wrap**: Vertical·Horizontal 흐름에서 자리가 모자라면 다음 줄(또는 열)로 넘깁니다.
  - **Grid**: 자식을 행과 열에 배치하고, 여러 칸을 차지(span)하게 할 수 있습니다.
- **[FIG-10] MUST** 화면과 컴포넌트 안의 모든 컨테이너에 오토 레이아웃을 쓴다. 예외는 일러스트나 차트처럼 자유 배치 자체가 내용인 경우뿐이다.
  - 이유: 오토 레이아웃이 없으면 텍스트 길이나 폭이 바뀔 때 레이아웃이 따라오지 않는다. AI도 위치값을 절대 좌표로 옮기게 된다.
- **[FIG-11] MUST** 흐름은 내용의 구조로 고른다.

  | 내용 | 흐름 |
  |---|---|
  | 한 방향 나열 (목록, 버튼 행, 폼) | Vertical 또는 Horizontal |
  | 개수가 바뀌며 줄이 넘어가는 나열 (태그, 필터 칩) | Horizontal + Wrap |
  | 행과 열을 함께 맞춰야 하는 배치 (갤러리, 대시보드, 캘린더) | Grid |

  - Grid를 흉내 내려고 Horizontal 프레임을 여러 겹 중첩하지 않는다.
- **[FIG-12] MUST** 큰 구조부터 작은 구조로 중첩한다. 프레임 하나에는 한 가지 흐름만 둔다.
  - 예: 화면(Vertical) → 섹션(Vertical) → 카드(Vertical) → 카드 헤더(Horizontal)
- **코드**: Vertical/Horizontal → `display: flex; flex-direction: column / row`. Wrap → `flex-wrap: wrap`. Grid → `display: grid`.

### 간격 — Gap · Padding

- **뜻**
  - **Gap**: 자식 사이의 거리입니다. 숫자로 정하거나 Auto로 남는 공간을 분배합니다.
    - Auto 분배 방식: Between(양끝 붙이고 사이 균등), Evenly(사이와 양끝 균등), Around(사이가 양끝의 두 배)
  - **Padding**: 프레임 경계와 자식 사이의 안쪽 여백입니다.
- **[FIG-13] MUST** 간격은 Gap과 Padding으로만 만든다. 고정 간격을 위해 빈 사각형이나 투명 레이어를 넣지 않는다.
  - 남는 공간만큼 요소를 밀어내야 할 때는 Gap Auto(Between)를 우선 쓴다.
  - 그래도 안 될 때만 Fill로 설정한 Spacer 레이어를 쓴다.
  - 이유: 빈 레이어는 코드에서 의미 없는 요소가 되고, 토큰 바인딩도 할 수 없다.
- **[FIG-14] MUST** 숫자 Gap과 Padding은 Semantic Responsive 토큰에 바인딩한다 (RSP-04).
- **[FIG-15] MUST** Gap Auto는 양끝 정렬이 의도일 때만 쓴다. 예: 헤더의 제목과 버튼, 탭바 아이콘. 요소 사이 거리가 일정해야 하면 숫자(토큰)를 쓴다.
- **코드**: Gap → `gap`. Auto Between/Evenly/Around → `justify-content: space-between / space-evenly / space-around`. Padding → `padding`.

### 정렬 — Alignment · Text baseline alignment

- **뜻**
  - **Alignment**: 자식 전체를 프레임 안에서 어디에 놓을지 정합니다. 자식마다 따로 정렬할 수 없고 부모에서 정합니다.
  - **Text baseline alignment**: 가로 흐름에서 글자 크기가 다른 텍스트나 아이콘을 글자 기준선에 맞춥니다.
- **[FIG-16] MUST** 자식 하나만 다르게 정렬해야 하면 그 자식을 프레임으로 감싸 따로 정렬한다. 위치를 손으로 옮기지 않는다.
- **[FIG-17] SHOULD** 글자 크기가 다른 텍스트를 한 줄에 놓을 때(예: 숫자 + 단위)는 Text baseline alignment를 켠다.
- **코드**: `justify-content`, `align-items`. Baseline → `align-items: baseline`.

### 크기 조절 — Resizing (Hug · Fill · Fixed · Min/Max)

- **뜻**
  - **Hug contents**: 자식 크기에 맞춰 프레임이 줄고 늘어납니다. 오토 레이아웃 프레임에만 쓸 수 있습니다.
  - **Fill container**: 부모의 남은 공간을 모두 차지합니다. 오토 레이아웃의 자식에만 쓸 수 있고, 최상위 프레임에는 쓸 수 없습니다.
  - **Fixed**: 주변이 바뀌어도 크기를 유지합니다. 크기를 손으로 조절하거나 숫자를 입력하면 자동으로 Fixed가 됩니다.
  - **Min / Max**: 위 세 가지와 함께 쓰는 하한·상한입니다. 숫자 변수를 바인딩할 수 있습니다.
- 축(가로·세로)마다 따로 정합니다. 기준은 아래와 같습니다.

  | 이 요소는… | 설정 | 예 |
  |---|---|---|
  | 내용에 따라 크기가 바뀌어야 한다 | **Hug** | 버튼, 칩, 배지, 라벨, 텍스트를 감싼 컨테이너의 높이 |
  | 부모 폭(또는 높이)에 맞춰 늘어나야 한다 | **Fill** | 입력 필드, 카드·리스트 항목의 폭, 전체 폭 버튼, 본문 텍스트 |
  | 크기 자체가 디자인 결정이다 | **Fixed** | 아이콘, 아바타, 썸네일, 화면 프레임 폭, 토큰으로 정한 컨트롤 높이 |
  | 너무 작거나 커지면 안 된다 | **+ Min / Max** | 버튼 최소 너비, 본문 최대 폭(가독성), 모달 최대 폭 |

- **[FIG-20] MUST** 모든 요소의 가로·세로 Resizing을 위 기준표로 정한다. 손으로 크기를 조절해서 생긴 Fixed를 그대로 두지 않는다.
  - 이유: 의도 없이 생긴 Fixed가 반응형이 깨지는 가장 흔한 원인이다. AI는 Fixed를 그대로 `width: 320px`로 옮긴다.
- **[FIG-21] MUST NOT** 반응형 화면의 콘텐츠 영역 폭을 Fixed로 두지 않는다. Fill로 두고, 필요하면 Max width를 더한다.
- **[FIG-22] MUST** Fixed 크기와 Min/Max 값은 토큰에 바인딩한다 (`Control Height/*`, `Icon Size/*`, `Hit Area/Min` 등).
- **[FIG-23] MUST** 자식을 Fill로 두면 부모의 Hug가 Fixed로 바뀐다는 점을 확인하고, 부모의 크기 설정을 다시 정한다.
- **코드**: Hug → `width: fit-content`(내용 크기). Fill → 진행 방향이면 `flex: 1`, 교차 방향이면 `align-self: stretch`. Fixed → `width / height` 값. Min/Max → `min-width`, `max-width` 등.

### 흐름 밖 배치 — Ignore auto layout

- **뜻**: 오토 레이아웃 프레임 안에 두되 흐름에서 빼는 설정입니다. 예전 이름은 Absolute position입니다. 형제 요소와 서로 영향을 주지 않고, Constraints로 위치를 정합니다.
- **[FIG-25] MUST** 다른 요소 위에 겹쳐야 하는 요소에만 쓴다.
  - 예: 아이콘 위 알림 숫자 배지, 카드 우상단 닫기 버튼, 플로팅 버튼, 화면 하단 고정 바
  - 정렬이나 간격을 맞추려는 목적으로는 쓰지 않는다.
  - 이유: 흐름 밖 요소는 내용이 바뀌어도 자리를 비켜주지 않는다. 남용하면 오토 레이아웃이 없는 것과 같아진다.
- **코드**: `position: absolute` (부모는 `position: relative`).

### 오토 레이아웃 고급 설정

- **뜻**
  - **Strokes in layout (Inside stroke)**: 안쪽 테두리를 크기 계산에 포함할지(included) 뺄지(excluded) 정합니다. 바깥·가운데 테두리는 항상 계산에서 빠지며, 설정은 프레임마다 따로 적용됩니다.
  - **Canvas stacking**: 자식이 겹칠 때 첫 번째와 마지막 중 어느 쪽이 위에 오는지 정합니다. 레이어 순서는 그대로입니다.
- **[FIG-26] MUST** Strokes in layout은 기본값(included)으로 둔다. 바꿔야 하면 컴포넌트 단위로 통일하고 컴포넌트 문서에 적는다.
  - 이유: 프레임마다 다르면 같은 테두리 컴포넌트의 크기가 화면마다 달라진다. included는 CSS `box-sizing: border-box`에서 테두리가 크기 안에 포함되는 방식과 같다.
- **[FIG-27] SHOULD** 음수 Gap으로 겹치는 배치(겹친 아바타 등)에서만 Canvas stacking을 바꾼다.

### Grid 흐름 설정

- **뜻**
  - **Track**: 행이나 열 하나입니다. 크기는 Fixed, Fill(fr 단위 비율), Hug로 정합니다.
  - **Span**: 자식이 여러 칸을 차지하게 합니다. Fill인 자식만 쓸 수 있습니다.
  - **Automatic positioning**: 기본으로 켜져 있으며, 자식을 왼쪽 위부터 차례로 채웁니다.
- **[FIG-28] MUST** 열 트랙은 Fill(fr)을 기본으로 둔다. 고정 폭이 디자인 결정인 열만 Fixed로 둔다.
- **[FIG-29] SHOULD** Automatic positioning은 켜 둔다. 빈 칸을 의도적으로 남겨야 할 때만 끈다.
- **코드**: `grid-template-columns: 1fr 2fr`, `grid-column: span 2`, `grid-auto-flow`.

### 잘라내기 — Clip content

- **뜻**: 프레임 경계 밖으로 나간 자식을 보이지 않게 잘라냅니다.
- **[FIG-30] MUST** 아래 경우에만 켠다.
  - 내용이 경계 밖으로 나가면 안 되는 곳: 스크롤 영역, 이미지 크롭, 둥근 모서리 카드 안의 이미지
  - 그 밖에는 끈다.
  - 이유: 켜면 자식의 그림자와 포커스 링까지 잘린다.
- **코드**: `overflow: hidden` (스크롤이면 `overflow: auto`).

---

## 3. Constraints

- **뜻**: 부모 프레임 크기가 바뀔 때 레이어가 어떻게 따라갈지 정합니다.
  - 가로: Left, Right, Left and right, Center, Scale
  - 세로: Top, Bottom, Top and bottom, Center, Scale
  - 일반 프레임의 자식과 Ignore auto layout 요소에만 적용되며, 오토 레이아웃 흐름 안의 자식과 Group에는 적용되지 않습니다.
- **[FIG-35] MUST** Constraints는 Ignore auto layout 요소에 설정한다. 흐름 안의 요소는 Resizing으로 반응을 정한다.
- **[FIG-36] MUST** 의도에 맞는 조합을 명시한다. 기본값(Top, Left)을 그대로 두지 않는다.

  | 요소 | 가로 | 세로 |
  |---|---|---|
  | 화면 하단 고정 바, 하단 CTA | Left and right | Bottom |
  | 카드 우상단 닫기 버튼·배지 | Right | Top |
  | 화면 중앙 고정 요소 | Center | Center |
  | 배경 전체를 덮는 이미지·딤 | Left and right | Top and bottom |

- **[FIG-37] MUST NOT** UI 요소에 Scale을 쓰지 않는다.
  - 이유: 비율로 늘어나는 크기는 코드에서 의도대로 재현하기 어렵고, 글자와 아이콘까지 늘어난다.
- **코드**: `position: absolute`와 `top/right/bottom/left`. Left and right → `left`와 `right`를 함께 지정.

---

## 4. 모양과 겉보기 (Appearance)

### Layer opacity · Blend mode · Visibility

- **뜻**
  - **Layer opacity**: 레이어와 그 안의 자식 전체의 투명도입니다.
  - **Blend mode**: 아래 레이어와 색을 섞는 방식입니다.
  - **Visibility**: 레이어를 보이거나 숨깁니다. 숨긴 레이어는 오토 레이아웃 공간도 차지하지 않습니다.
- **[FIG-40] MUST NOT** 상태(비활성, 눌림)를 Layer opacity로 표현하지 않는다. 비활성은 Disabled 토큰, 반투명 색은 알파 색 토큰(`Overlay/Scrim` 등)을 쓴다.
  - 이유: opacity는 자식 전체에 곱해져 대비를 계산할 수 없고, 토큰 체계 밖의 색을 만든다.
- **[FIG-41] MUST** Blend mode는 기본값(Normal, 프레임은 Pass through)으로 둔다. 일러스트 외에는 바꾸지 않는다.
- **[FIG-42] MUST NOT** 화면에 숨긴 레이어를 남기지 않는다. 컴포넌트 안에서는 Boolean 프로퍼티에 연결된 레이어만 숨김을 허용한다.
  - 이유: 숨긴 레이어도 MCP로 읽혀 AI가 실제 UI의 일부로 오해한다.
- **코드**: `opacity`, `mix-blend-mode`, 숨김은 렌더링하지 않음.

### Corner radius · Corner smoothing

- **뜻**
  - **Corner radius**: 모서리 반경입니다. 네 모서리를 각각 정할 수 있습니다.
  - **Corner smoothing**: 모서리 곡률을 부드럽게 이어주는 iOS 스타일 설정입니다.
- **[FIG-43] MUST** 반경은 `Corner/*` 토큰에 바인딩한다. 개별 모서리는 바텀시트 상단처럼 의도가 분명할 때만 쓴다.
- **[FIG-44] SHOULD** Corner smoothing은 0으로 둔다.
  - 이유: 웹 CSS에는 그대로 대응하는 속성이 없어, 디자인과 구현이 달라진다.
  - <!-- CUSTOMIZE: iOS 네이티브 앱만 만든다면 팀 값으로 정하고 이 규칙을 바꾼다 -->
- **코드**: `border-radius`.

### Fill (채움)

- **뜻**: 레이어를 칠하는 방식입니다. 단색, 그라디언트, 이미지 등이 있고, 한 레이어에 여러 겹 쌓을 수 있습니다.
- **[FIG-45] MUST** 단색 채움은 색 토큰에 바인딩하고, 레이어당 채움은 하나만 둔다. 겹쳐야 하면 레이어를 나눈다.
  - 이유: 여러 겹 채움은 실제로 보이는 색이 토큰과 달라지고, AI가 어느 채움이 의미 있는지 판단하지 못한다.
- **[FIG-46] MUST NOT** UI 면에 그라디언트를 쓰지 않는다. 필요하면 ADR로 결정하고 토큰을 먼저 정한다.
- **[FIG-47] MUST** 이미지 채움은 Fill 모드(비율 유지 크롭)를 기본으로 쓰고, 이미지가 담긴 프레임의 비율을 고정한다.
- **코드**: `background-color`, `background-image`, 이미지는 `object-fit: cover`.

### Stroke (테두리)

- **뜻**
  - 위치(Inside, Center, Outside), 두께, 면별 적용(위·아래·좌·우 개별), 점선 여부를 정합니다.
  - 오토 레이아웃 크기 계산에는 Inside 테두리만 들어갑니다.
- **[FIG-50] MUST** 일반 테두리는 Inside로 둔다. 포커스 링처럼 레이아웃에 영향을 주면 안 되는 선만 Outside로 둔다. Center는 쓰지 않는다.
  - 이유: Inside는 CSS `border`(border-box)에, Outside는 CSS `outline`에 가깝게 옮겨진다. Center는 대응이 없다.
- **[FIG-51] MUST** 색은 `Border/*`, 두께는 `Border Width/*` 토큰에 바인딩한다.
- **[FIG-52] SHOULD** 컨테이너 한쪽에만 선이 필요하면(리스트 구분선) 면별 테두리를 쓴다. 독립된 구분선은 Divider 컴포넌트로 만든다.
- **코드**: Inside → `border` / `border-bottom`, Outside → `outline`.

### Effects (효과)

- **뜻**
  - Drop shadow, Inner shadow, Layer blur, Background blur, Noise, Texture가 있습니다.
  - 그림자는 CSS `box-shadow`로 옮겨지며, 텍스트에 걸린 그림자는 `text-shadow`로 옮겨집니다.
- **[FIG-55] MUST** 그림자는 Effect Style로만 적용하고, 그림자 색은 `Shadow/*` 토큰에 바인딩한다. 레이어마다 숫자를 직접 넣지 않는다.
- **[FIG-56] SHOULD** Background blur는 반투명 면(시트, 내비게이션 바)에만 쓴다. Layer blur, Noise, Texture는 UI 요소에 쓰지 않는다.
  - 이유: blur가 많으면 파일과 실제 화면 모두 무거워진다. Noise와 Texture는 코드 대응이 어렵다.
- **코드**: `box-shadow`, Background blur → `backdrop-filter: blur()`, Layer blur → `filter: blur()`.

---

## 5. 텍스트

### Text Style과 글자 속성

- **뜻**
  - 글꼴, 굵기, 크기, 줄 높이, 자간, 문단 간격, 대소문자 변환, 밑줄·취소선, 줄바꿈 방식(Wrap style), 목록이 있습니다.
  - Wrap style 값: Auto, Balance(줄 길이 균등), Pretty(마지막 줄 외톨이 단어 방지)
- **[FIG-60] MUST** 모든 텍스트는 Text Style로 지정한다. 개별 글자 속성을 덮어쓰지 않는다 (RSP-05).
- **[FIG-61] SHOULD** Wrap style은 Text Style에 넣는다. 제목·라벨은 Balance, 본문은 Pretty로 둔다.
- **[FIG-62] MUST** 화면에 보이는 대소문자는 Letter case 설정으로 만든다. 내용을 대문자로 직접 타이핑하지 않는다.
- **코드**: `font-*`, `line-height`, `letter-spacing`, `text-transform`, `text-wrap: balance / pretty`.

### 텍스트 크기 조절 — Auto width · Auto height · Fixed size

- **뜻**
  - **Auto width**: 한 줄로 내용만큼 늘어납니다.
  - **Auto height**: 폭은 정해지고 줄이 늘어납니다.
  - **Fixed size**: 상자 크기가 고정되어 내용이 넘칠 수 있습니다.
  - 오토 레이아웃 안에서는 Hug와 Fill로도 표시됩니다.
- **[FIG-63] MUST** 텍스트 크기는 아래 기준으로 정한다. Fixed size는 쓰지 않는다.
  - 한 줄 라벨(버튼, 칩, 탭): Auto width (Hug)
  - 여러 줄이 될 수 있는 텍스트(제목, 본문, 설명): 폭 Fill + Auto height
  - 이유: Fixed size 텍스트는 내용이 길어지면 넘치거나 다른 레이어와 겹친다.
- **[FIG-64] MUST** 길이가 바뀌는 텍스트(항목 이름, 사용자 입력, 알림 제목)는 Truncate text와 Max lines로 넘칠 때의 동작을 명시한다.
  - Max lines는 Auto height·Auto width(또는 Hug)일 때만 쓸 수 있고, Max height와 함께 쓸 수 없다.
- **[FIG-65] SHOULD** 텍스트 세로 정렬(Top/Middle/Bottom)은 쓰지 않는다. Fixed size에서만 동작하므로, 세로 위치는 부모 오토 레이아웃 정렬로 맞춘다.
- **코드**: Auto width → `white-space: nowrap`, 말줄임 → `text-overflow: ellipsis` 또는 `-webkit-line-clamp`.

### Vertical trim

- **뜻**: 글자 위아래의 여분 공간을 잘라, 텍스트 상자를 글자 높이에 맞춥니다.
- **[FIG-66] SHOULD** 기본값(끔)으로 둔다. 켜면 팀 전체가 같은 기준을 쓰고 code-mapping.md에 적는다.
  - 이유: 대응하는 CSS 속성은 브라우저 지원이 제한적이라, 켠 디자인과 구현의 간격이 달라질 수 있다.
  - <!-- CUSTOMIZE: 섹션 2에서 정한 Vertical trim 기준이 있으면 그 기준으로 바꾼다 -->

---

## 6. Layout guides (레이아웃 가이드)

- **뜻**: 열·행·균일 격자를 화면 위에 표시하는 시각 보조선입니다. 오토 레이아웃의 Grid 흐름과는 다른 기능이며, 내용의 크기나 배치를 바꾸지 않습니다.
- **[FIG-70] MUST** 반응형 동작은 오토 레이아웃으로 만든다. Layout guide에 맞춰 손으로 배치한 것을 레이아웃으로 삼지 않는다.
- **[FIG-71] SHOULD** 화면 프레임에 열 가이드를 둘 때는 바깥 여백을 `Margin/Page`와 같은 값으로 맞춘다.

---

## 7. 컴포넌트와 인스턴스

### 컴포넌트 프로퍼티 — Variant · Text · Boolean · Instance swap · Slot

- **뜻**

  | 프로퍼티 | 언제 쓰나 | 예 |
  |---|---|---|
  | Variant | 종류나 상태가 바뀔 때 | Type, Size, State |
  | Text | 인스턴스마다 바뀌는 문구 | 버튼 라벨 |
  | Boolean | 요소를 보이거나 숨길 때 | 아이콘 있음/없음 |
  | Instance swap | 정해진 후보 중 하나로 교체할 때. 한 번에 하나, 배치 고정 | 아이콘 교체 |
  | Slot | 인스턴스 안에 내용을 자유롭게 넣고 배치할 때 | 모달 본문, 카드 내용 영역 |

  - Slot은 2026-10 기준 오픈 베타이며, 컴포넌트 최상위 레이어에는 걸 수 없습니다.
- **[FIG-75] MUST** 프로퍼티 종류를 위 기준으로 고른다.
  - Slot이 필요한 곳을 Variant로 흉내 내지 않는다.
  - 고정된 자리의 교체를 Slot으로 풀어 두지도 않는다.
- **[FIG-76] MUST** 프로퍼티 순서는 Variant → Text → Boolean → Instance swap → Nested → Slot으로 둔다.
- **[FIG-77] SHOULD** Instance swap에는 Preferred values(권장 후보)를 지정한다.
  - 이유: AI와 사람 모두 어떤 컴포넌트를 넣어야 하는지 추측하지 않게 된다.

### 인스턴스 사용

- **[FIG-78] MUST** 화면에서 반복되는 UI는 컴포넌트 인스턴스로 만든다. 프레임을 복사해 붙여 쓰지 않는다.
- **[FIG-79] MUST NOT** 인스턴스를 Detach하지 않는다. 필요한 변형은 프로퍼티나 Slot으로 해결하고, 없으면 컴포넌트 수정을 제안한다.
  - 이유: Detach한 순간 라이브러리 업데이트를 받지 못하고, AI는 그 부분을 컴포넌트가 아닌 원시 레이어로 읽는다.
- **[FIG-80]** 인스턴스에서 바인딩된 속성을 덮어쓰지 않는다 (CMP-06).

---

## 8. 배리어블 모드 적용

- **뜻**: 프레임에 컬렉션별 모드를 지정하면 안의 모든 바인딩이 그 모드 값으로 바뀝니다. 지정하지 않으면 부모의 모드를 물려받습니다.
- **[FIG-85] MUST** 화면 프레임에 테마(Semantic Color)와 폭(Semantic Responsive) 모드를 명시한다 (RSP-03).
- **[FIG-86] MUST NOT** 컴포넌트 메인이나 화면 안쪽 프레임에 모드를 고정하지 않는다. 화면 프레임에서 물려받게 둔다.
  - 이유: 안쪽에 모드가 고정되면 화면의 테마를 바꿔도 그 부분만 바뀌지 않는다.

---

## 9. 단위

Figma의 숫자 칸은 대부분 px이지만, 줄 높이·자간처럼 단위를 고를 수 있는 칸이 있습니다. 코드와 다른 문서에는 %, em, rem, 비율 값이 섞여 들어옵니다. 단위를 바꿔 읽으면 값이 몇 배씩 틀어지므로, 아래 규칙으로 단위를 하나로 맞춥니다.

- **[FIG-90] MUST** Figma의 크기·간격·여백·모서리·선 두께 칸에는 px 값만 넣는다. 토큰과 문서의 px 값을 그대로 쓴다.
  - 문서의 비율 지표(예: component-patterns.md의 "좌우 패딩 ÷ 높이 0.43")는 단위가 없는 값이다. 기준 값(높이 등)을 곱해 px로 바꾼 뒤 가장 가까운 스케일 값을 고른다. 비율 값을 px로 넣지 않는다.
- **[FIG-91] MUST** 줄 높이는 px로 지정하고 `Line Height/*` 토큰에 바인딩한다. % 와 Auto는 쓰지 않는다.
  - 이유: Auto는 글꼴마다 계산이 달라 디자인과 구현이 어긋난다. %는 토큰(px)과 단위가 달라 코드로 옮길 때 배수(1.5)와 px(1.5px)를 혼동하게 만든다.
- **[FIG-92] MUST** 자간은 Text Style 안에서만 %로 지정한다. 기본값은 0%이고, 개별 레이어에서 덮어쓰지 않는다.
  - 코드 변환: `em = % ÷ 100` (예: -2% → `letter-spacing: -0.02em`). px로 환산하지 않는다.
  - 이유: % 자간은 글자 크기에 비례하고 px 자간은 고정이다. px로 옮기면 글자 크기가 바뀔 때 자간이 따라오지 않는다.
- **[FIG-93] MUST** 플러그인 API로 값을 쓸 때는 단위 객체를 항상 명시한다.
  - 줄 높이: `lineHeight = { value: 24, unit: 'PIXELS' }`
  - 자간: `letterSpacing = { value: -2, unit: 'PERCENT' }`
  - 숫자만 넘기거나, 퍼센트 값을 `PIXELS`로 넣지 않는다. 쓴 뒤에는 값을 다시 읽어 단위를 확인한다.
- **[FIG-94] MUST** % 너비·높이 요구는 px로 환산하지 않고 레이아웃 속성으로 옮긴다.

  | 요구 | Figma |
  |---|---|
  | 부모 폭 전체 (100%) | Fill |
  | 균등 분할 (50% + 50%) | 가로 흐름에서 두 자식 모두 Fill, 또는 Grid 2열 각 1fr |
  | 비율 분할 (1:2) | Grid 트랙 1fr · 2fr |
  | 최대·최소 비율 | Fill + Max/Min width (px 토큰) |

  - 이유: Figma 레이어에는 % 크기가 없다. 현재 프레임 폭으로 계산한 px는 폭이 바뀌는 순간 틀린 값이 된다.
- **[FIG-95] MUST** rem과 em은 출처를 확인하고 환산한다.
  - rem: 1rem = 16px로 환산한다.
  - em: 그 요소의 글자 크기를 곱해 환산한다 (예: 14px 글자의 0.5em = 7px).
  - 환산한 값은 가장 가까운 토큰으로 맞춘다. 기준 글자 크기를 알 수 없으면 추측하지 않고 묻는다.
- **[FIG-96] MUST** 작업을 마치면 이번에 바꾼 노드만 MCP로 한 번 읽어 숫자 속성(크기, 간격, 여백, 모서리, 선 두께, 글자 크기, 줄 높이) 중 변수에 바인딩되지 않은 값이 남았는지 확인한다. 의도된 예외는 컴포넌트 문서에 이유를 적는다.
- **코드**: 크기·간격은 `px`(토큰 변수), 줄 높이는 `px`(토큰 변수), 자간은 `em`.

---

## 점검표

전체 항목입니다. 화면 작업은 [agent-brief.md의 마무리 점검](agent-brief.md)(이 표의 요약)으로 충분하고, 이 전체 표는 컴포넌트를 만들거나 실패 원인을 자세히 볼 때 씁니다. 어느 쪽이든 작업이 끝날 때 한 번, **이번에 바꾼 노드만** 검사합니다. Figma MCP로 노드 정보를 읽어 확인하고, 화면에서만 확인할 수 있는 항목은 "화면"이라고 표시했습니다. 결과는 [checklist.md](checklist.md)의 보고 형식으로 보고합니다.

### 구조

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-40 | Group이 없다. Section이 화면 안에 없다. Mask가 없다 | FIG-01~03 |
| CHK-41 | 기본 이름(`Frame 12`, `Rectangle 4` 등)인 레이어가 없다 | FIG-04 |
| CHK-42 | 좌표·크기에 소수 값이 없고, 회전된 UI 요소가 없다 | FIG-05·06 |

### 오토 레이아웃

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-43 | 일러스트·차트를 빼고 모든 컨테이너에 오토 레이아웃이 있다 | FIG-10 |
| CHK-44 | 흐름이 내용 구조와 맞다 (줄바꿈 나열 = Wrap, 행·열 배치 = Grid) | FIG-11·12 |
| CHK-45 | 고정 간격용 빈 레이어가 없다 | FIG-13 |
| CHK-46 | 숫자 Gap·Padding이 모두 토큰에 바인딩되어 있다 | FIG-14 |
| CHK-47 | 모든 요소의 Resizing이 기준표와 맞고, 의도 없는 Fixed가 없다 | FIG-20·21 |
| CHK-48 | Fixed 크기와 Min/Max가 토큰에 바인딩되어 있다 | FIG-22 |
| CHK-49 | Ignore auto layout은 겹침 요소에만 있다 | FIG-25 |
| CHK-50 | Clip content는 스크롤·크롭 영역에만 켜져 있고, 그림자나 포커스 링이 잘리지 않는다 (화면) | FIG-30 |

### Constraints

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-51 | Ignore auto layout 요소의 Constraints가 기본값이 아니라 의도에 맞게 설정되어 있다 | FIG-35·36 |
| CHK-52 | Scale constraint가 없다 | FIG-37 |
| CHK-53 | 화면 프레임 폭을 늘이고 줄여도 겹치거나 넘치는 곳이 없다 (화면) | FIG-20~37 |

### 겉보기

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-54 | 상태 표현용 Layer opacity가 없고, Blend mode가 기본값이다 | FIG-40·41 |
| CHK-55 | 화면에 숨긴 레이어가 없다 (컴포넌트는 Boolean 연결만 허용) | FIG-42 |
| CHK-56 | 모서리 반경이 `Corner/*`에 바인딩되어 있고, Corner smoothing이 0이다 | FIG-43·44 |
| CHK-57 | 레이어당 채움이 하나이고, UI 면에 그라디언트가 없다 | FIG-45·46 |
| CHK-58 | 테두리가 Inside(포커스 링만 Outside)이고, 색과 두께가 토큰에 바인딩되어 있다 | FIG-50·51 |
| CHK-59 | 그림자가 Effect Style로 적용되어 있고, UI 요소에 Layer blur·Noise·Texture가 없다 | FIG-55·56 |

### 텍스트

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-60 | 모든 텍스트가 Text Style을 쓰고, 덮어쓴 글자 속성이 없다 | FIG-60 |
| CHK-61 | Fixed size 텍스트가 없다 | FIG-63 |
| CHK-62 | 길이가 바뀌는 텍스트에 Truncate와 Max lines가 설정되어 있다 | FIG-64 |
| CHK-63 | 긴 문구를 넣어 봐도 넘치거나 겹치지 않는다 (화면) | FIG-63·64 |

### 단위

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-67 | 모든 줄 높이가 px이고 `Line Height/*` 토큰에 바인딩되어 있다 (Auto·% 없음) | FIG-91 |
| CHK-68 | 자간이 Text Style 안에서 %로만 지정되어 있고, 레이어에서 덮어쓴 자간이 없다 | FIG-92 |
| CHK-69 | 이번에 바꾼 노드의 숫자 속성에 변수 미바인딩 값이 없다. 남은 값은 문서에 예외로 적혀 있다 | FIG-90·96, FIG-22 |

### 컴포넌트와 모드

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-64 | 반복 UI가 인스턴스이고, Detach된 인스턴스가 없다 | FIG-78·79 |
| CHK-65 | 컴포넌트 프로퍼티의 종류와 순서가 기준과 맞다 | FIG-75·76 |
| CHK-66 | 화면 프레임에 테마·폭 모드가 명시되어 있고, 안쪽에 고정된 모드가 없다 | FIG-85·86 |

<!-- CUSTOMIZE: 팀에서 반복되는 실수가 생기면 항목을 추가한다. 번호는 다시 매기지 않고 비어 있는 번호(CHK-76~)를 쓴다 -->

## 출처

Figma Learn 도움말 (2026-10-01 확인).

- [Guide to auto layout](https://help.figma.com/hc/articles/360040451373)
- [Use the horizontal and vertical flows in auto layout](https://help.figma.com/hc/articles/31289464393751)
- [Use the grid auto layout flow](https://help.figma.com/hc/articles/31289469907863)
- [Apply constraints to define how layers resize](https://help.figma.com/hc/articles/360039957734)
- [Explore text properties](https://help.figma.com/hc/articles/360039956634)
- [Apply shadow or blur effects](https://help.figma.com/hc/articles/360041488473)
- [Use slots to build flexible components](https://help.figma.com/hc/articles/38231200344599)
- [The difference between slots, instance swaps, and variants](https://help.figma.com/hc/articles/38741465279895)
