---
name: semantic-responsive
layer: semantic
collection: Semantic Responsive
modes: [Mobile, Tablet, Desktop]
references: [foundation]
values_source: tokens/semantic-responsive.*.tokens.json
status: stable
---

# Semantic Responsive 토큰

색 이외의 모든 Semantic 토큰(공간, 크기, 모양, 타이포그래피)이 모이는 곳입니다. 화면 폭에 따른 분기는 이 컬렉션의 모드로만 합니다.

색과 컬렉션을 나눈 이유: Figma 컬렉션 하나는 모드 축을 하나만 갖습니다. 테마(Light/Dark)와 폭(Mobile/Tablet/Desktop)을 한 컬렉션에 두면 Light-Mobile, Dark-Tablet 같은 조합 모드 6개가 필요하고, 축이 늘 때마다 곱으로 불어납니다.

## 규칙

- **[RSP-01] MUST** 화면 폭에 따라 달라지는 값은 이 컬렉션의 모드로만 분기한다. Component 토큰이나 컴포넌트 배리언트로 분기하지 않는다.
  - 이유: 분기 지점이 하나여야 "태블릿에서 왜 이 값인가"에 답이 하나다. AI는 태블릿 화면을 만들 때 다른 토큰을 고르는 게 아니라 같은 토큰에 모드만 바꾼다.
- **[RSP-02] MUST** 모든 토큰은 Foundation만 참조한다.
- **[RSP-03] MUST** 화면 프레임에 폭 기준으로 모드를 적용한다. ~767 Mobile / 768–1279 Tablet / 1280~ Desktop.
  - 모드 이름은 Foundation `Breakpoint/*` 이름과 같다. 첫 모드(Mobile)는 기준값이 없는 기본 모드다.
- **[RSP-04] MUST** 오토 레이아웃의 간격·여백, 모서리 반경, 컨트롤·아이콘 크기는 이 문서의 토큰에 바인딩한다.
  - 이유: 숫자를 직접 넣으면 모드를 바꿔도 아무 일도 일어나지 않아 반응형 설계 전체가 무력해진다.
- **[RSP-05] MUST** 텍스트는 Text Style로 지정하고, Text Style은 아래 [Text Style 바인딩](#text-style-바인딩) 표의 변수로만 구성한다.
  - 이유: Text Style 안의 값을 원시값으로 두면 AI가 코드에 `font-size: 28px`를 그대로 옮긴다.
- **[RSP-06] MUST** 폭과 무관한 값(예: `Corner/Control`)도 이 컬렉션에 두고 세 모드에 같은 값을 넣는다.
  - 이유: 색 이외의 Semantic이 한 곳에 있어야 찾는 위치가 하나다. 나중에 폭별로 달라져도 구조를 바꿀 필요가 없다.

<!-- CUSTOMIZE: 서비스가 모바일 앱 전용이면 Tablet·Desktop 모드를 지우고 Mobile 하나만 남겨도 된다. 이때 tokens/ 파일과 Breakpoint 토큰도 함께 정리한다 -->

## 토큰

### 공간 — Margin, Gap, Inset

#### Margin/Page
- 역할: 화면 좌우 바깥 여백
- 쓸 때: 페이지 콘텐츠와 화면 가장자리 사이
- 쓰지 말 때: 카드·시트 안쪽 → `Inset/Container` · 요소 사이 → `Gap/*`
- 스코프: GAP
- 코드: `--margin-page`
- 상태: stable

#### Gap/Section
- 역할: 의미 단위 섹션 사이의 세로 간격
- 쓸 때: 화면 안 섹션과 섹션 사이
- 쓰지 말 때: 같은 섹션 안 요소 사이 → `Gap/Stack`
- 스코프: GAP
- 코드: `--gap-section`
- 상태: stable

#### Gap/Stack
- 역할: 같은 그룹 안에서 세로로 쌓인 요소 사이 간격
- 쓸 때: 카드 목록, 폼 필드 목록, 제목과 본문 사이
- 쓰지 말 때: 가로 나열 → `Gap/Inline` · 섹션 사이 → `Gap/Section`
- 스코프: GAP
- 코드: `--gap-stack`
- 상태: stable

#### Gap/Inline
- 역할: 가로로 나열된 요소 사이 간격
- 쓸 때: 아이콘과 텍스트, 칩과 칩, 버튼과 버튼 사이
- 쓰지 말 때: 작은 컨트롤 안 아이콘-라벨 → `Gap/Inline Tight`
- 스코프: GAP
- 코드: `--gap-inline`
- 상태: stable

#### Gap/Inline Tight
- 역할: 작은 컨트롤 안의 좁은 가로 간격
- 쓸 때: Sm 버튼·칩 안 아이콘과 라벨 사이
- 쓰지 말 때: 일반 가로 나열 → `Gap/Inline`
- 스코프: GAP
- 코드: `--gap-inline-tight`
- 상태: stable

#### Inset/Sm
- 역할: 작은 컨트롤의 안쪽 여백
- 쓸 때: Sm 버튼, 칩의 좌우 여백
- 쓰지 말 때: 카드·시트 → `Inset/Container`
- 스코프: GAP
- 코드: `--inset-sm`
- 상태: stable

#### Inset/Md
- 역할: 기본 컨트롤의 안쪽 여백
- 쓸 때: Md 버튼, 입력 필드의 좌우 여백
- 쓰지 말 때: 카드·시트 → `Inset/Container`
- 스코프: GAP
- 코드: `--inset-md`
- 상태: stable

#### Inset/Lg
- 역할: 큰 컨트롤의 안쪽 여백
- 쓸 때: Lg 버튼의 좌우 여백
- 쓰지 말 때: 카드·시트 → `Inset/Container`
- 스코프: GAP
- 코드: `--inset-lg`
- 상태: stable

#### Inset/Container
- 역할: 카드·시트·모달의 안쪽 여백
- 쓸 때: 컨테이너 안쪽 상하좌우 여백
- 쓰지 말 때: 버튼·입력 필드 같은 컨트롤 → `Inset/Sm`·`Md`·`Lg` · 화면 가장자리 → `Margin/Page`
- 스코프: GAP
- 코드: `--inset-container`
- 상태: stable

### 크기 — Control Height, Icon Size, Hit Area

#### Control Height/Sm
- 역할: Sm 크기 컨트롤의 높이
- 쓸 때: Sm 버튼, 입력 필드, 세그먼트 컨트롤
- 쓰지 말 때: 터치 가능한 최소 영역 → `Hit Area/Min`
- 스코프: WIDTH_HEIGHT
- 코드: `--control-height-sm`
- 상태: stable

#### Control Height/Md
- 역할: Md 크기 컨트롤의 높이
- 쓸 때: Md 버튼, 입력 필드, 세그먼트 컨트롤
- 쓰지 말 때: 터치 가능한 최소 영역 → `Hit Area/Min`
- 스코프: WIDTH_HEIGHT
- 코드: `--control-height-md`
- 상태: stable

#### Control Height/Lg
- 역할: Lg 크기 컨트롤의 높이
- 쓸 때: Lg 버튼, 입력 필드, 세그먼트 컨트롤
- 쓰지 말 때: 터치 가능한 최소 영역 → `Hit Area/Min`
- 스코프: WIDTH_HEIGHT
- 코드: `--control-height-lg`
- 상태: stable

#### Control Min Width/Sm
- 역할: Sm 크기 컨트롤의 최소 너비
- 쓸 때: 라벨이 있는 Sm 버튼의 Min width. 라벨이 짧아도 가로로 긴 형태를 유지한다
- 쓰지 말 때: 아이콘만 있는 버튼 → 정사각형 (`Control Height/Sm` × `Control Height/Sm`) · 고정 너비 → 레이아웃이 정한다
- 스코프: WIDTH_HEIGHT
- 코드: `--control-min-width-sm`
- 상태: stable
- 비고: 높이의 2배. 공개 디자인 시스템 기준 범위(높이의 1.54–2.31배) 안의 값이다 ([component-patterns.md](../component-patterns.md#button))

#### Control Min Width/Md
- 역할: Md 크기 컨트롤의 최소 너비
- 쓸 때: 라벨이 있는 Md 버튼의 Min width. 라벨이 짧아도 가로로 긴 형태를 유지한다
- 쓰지 말 때: 아이콘만 있는 버튼 → 정사각형 (`Control Height/Md` × `Control Height/Md`) · 고정 너비 → 레이아웃이 정한다
- 스코프: WIDTH_HEIGHT
- 코드: `--control-min-width-md`
- 상태: stable
- 비고: 높이의 2배. 공개 디자인 시스템 기준 범위(높이의 1.54–2.31배) 안의 값이다 ([component-patterns.md](../component-patterns.md#button))

#### Control Min Width/Lg
- 역할: Lg 크기 컨트롤의 최소 너비
- 쓸 때: 라벨이 있는 Lg 버튼의 Min width. 라벨이 짧아도 가로로 긴 형태를 유지한다
- 쓰지 말 때: 아이콘만 있는 버튼 → 정사각형 (`Control Height/Lg` × `Control Height/Lg`) · 고정 너비 → 레이아웃이 정한다
- 스코프: WIDTH_HEIGHT
- 코드: `--control-min-width-lg`
- 상태: stable
- 비고: 높이의 2배. 공개 디자인 시스템 기준 범위(높이의 1.54–2.31배) 안의 값이다 ([component-patterns.md](../component-patterns.md#button))

#### Icon Size/Sm
- 역할: Sm 크기 아이콘의 가로세로
- 쓸 때: Sm 컨트롤 안 아이콘, 같은 위계 텍스트 옆 아이콘
- 쓰지 말 때: 아이콘을 감싸는 터치 영역 → `Hit Area/Min`
- 스코프: WIDTH_HEIGHT
- 코드: `--icon-size-sm`
- 상태: stable

#### Icon Size/Md
- 역할: Md 크기 아이콘의 가로세로
- 쓸 때: Md 컨트롤 안 아이콘, 같은 위계 텍스트 옆 아이콘
- 쓰지 말 때: 아이콘을 감싸는 터치 영역 → `Hit Area/Min`
- 스코프: WIDTH_HEIGHT
- 코드: `--icon-size-md`
- 상태: stable

#### Icon Size/Lg
- 역할: Lg 크기 아이콘의 가로세로
- 쓸 때: Lg 컨트롤 안 아이콘, 같은 위계 텍스트 옆 아이콘
- 쓰지 말 때: 아이콘을 감싸는 터치 영역 → `Hit Area/Min`
- 스코프: WIDTH_HEIGHT
- 코드: `--icon-size-lg`
- 상태: stable

#### Hit Area/Min
- 역할: 터치 가능한 요소의 최소 히트 영역
- 쓸 때: 보이는 크기가 44보다 작은 컨트롤을 감싸는 Hit Area 레이어
- 쓰지 말 때: 보이는 컨트롤 높이 → `Control Height/*`
- 스코프: WIDTH_HEIGHT
- 코드: `--hit-area-min`
- 상태: stable

### 모양 — Corner, Border Width

#### Corner/Control
- 역할: 컨트롤의 모서리
- 쓸 때: 버튼, 입력 필드, 칩
- 쓰지 말 때: 카드 → `Corner/Container` · 양끝이 완전히 둥근 형태 → `Corner/Pill`
- 스코프: CORNER_RADIUS
- 코드: `--corner-control`
- 상태: stable

#### Corner/Container
- 역할: 컨테이너의 모서리
- 쓸 때: 카드, 리스트 그룹, 이미지 썸네일
- 쓰지 말 때: 모달·바텀시트 → `Corner/Sheet`
- 스코프: CORNER_RADIUS
- 코드: `--corner-container`
- 상태: stable

#### Corner/Sheet
- 역할: 떠 있는 면의 모서리
- 쓸 때: 모달, 바텀시트, 팝오버
- 쓰지 말 때: 화면 흐름 안의 카드 → `Corner/Container`
- 스코프: CORNER_RADIUS
- 코드: `--corner-sheet`
- 상태: stable
- 비고: 모바일의 바텀시트는 화면 가장자리에서 올라오므로 더 둥글게 한다.

#### Corner/Pill
- 역할: 양끝이 완전히 둥근 모서리
- 쓸 때: 배지, 토글, 아바타, 알약형 칩
- 쓰지 말 때: 일반 버튼 → `Corner/Control`
- 스코프: CORNER_RADIUS
- 코드: `--corner-pill`
- 상태: stable

#### Border Width/Default
- 역할: 테두리와 구분선의 기본 두께
- 쓸 때: 모든 `Border/*` 색과 함께 쓰는 선
- 쓰지 말 때: 포커스 링 → `Border Width/Focus Ring`
- 스코프: STROKE_FLOAT
- 코드: `--border-width-default`
- 상태: stable

#### Border Width/Focus Ring
- 역할: 포커스 링의 두께
- 쓸 때: `Border/Focus` 색과 함께 쓰는 포커스 링
- 쓰지 말 때: 일반 테두리 → `Border Width/Default`
- 스코프: STROKE_FLOAT
- 코드: `--border-width-focus-ring`
- 상태: stable

### 타이포그래피 — Font Family, Font Size, Line Height, Font Weight

#### Font Family/Base
- 역할: 모든 텍스트의 기본 글꼴
- 쓸 때: 모든 Text Style
- 쓰지 말 때: 코드 블록·숫자 정렬이 필요한 표 → 별도 토큰을 ADR로 추가
- 스코프: FONT_FAMILY
- 코드: `--font-family-base`
- 상태: stable

#### Font Size/Display
- 역할: 화면에서 가장 큰 표현용 텍스트의 글자 크기
- 쓸 때: 온보딩 헤드라인, 달성 축하 문구
- 쓰지 말 때: 화면 제목 → `Heading Lg`
- 스코프: FONT_SIZE
- 코드: `--font-size-display`
- 상태: stable

#### Font Size/Heading Lg
- 역할: 화면 제목의 글자 크기
- 쓸 때: 각 화면의 최상위 제목
- 쓰지 말 때: 섹션 제목 → `Heading Md`
- 스코프: FONT_SIZE
- 코드: `--font-size-heading-lg`
- 상태: stable

#### Font Size/Heading Md
- 역할: 섹션 제목의 글자 크기
- 쓸 때: 화면 안 섹션의 제목
- 쓰지 말 때: 카드·모달 제목 → `Heading Sm`
- 스코프: FONT_SIZE
- 코드: `--font-size-heading-md`
- 상태: stable

#### Font Size/Heading Sm
- 역할: 카드와 모달의 제목의 글자 크기
- 쓸 때: 카드, 모달, 바텀시트의 제목
- 쓰지 말 때: 본문 강조 → `Body` + `Font Weight/Strong`
- 스코프: FONT_SIZE
- 코드: `--font-size-heading-sm`
- 상태: stable

#### Font Size/Body
- 역할: 본문의 글자 크기
- 쓸 때: 설명문, 입력값, 리스트 항목
- 쓰지 말 때: 컨트롤 라벨 → `Label *`
- 스코프: FONT_SIZE
- 코드: `--font-size-body`
- 상태: stable

#### Font Size/Body Sm
- 역할: 보조 본문의 글자 크기
- 쓸 때: 부가 설명, 리스트 보조 줄
- 쓰지 말 때: 타임스탬프·법적 고지 → `Caption`
- 스코프: FONT_SIZE
- 코드: `--font-size-body-sm`
- 상태: stable

#### Font Size/Caption
- 역할: 가장 작은 정보 텍스트의 글자 크기
- 쓸 때: 타임스탬프, 글자 수, 법적 고지
- 쓰지 말 때: 버튼 라벨 → `Label Sm`
- 스코프: FONT_SIZE
- 코드: `--font-size-caption`
- 상태: stable

#### Font Size/Label Lg
- 역할: Lg 컨트롤의 라벨의 글자 크기
- 쓸 때: Lg 버튼, 큰 탭 라벨
- 쓰지 말 때: 본문 → `Body`
- 스코프: FONT_SIZE
- 코드: `--font-size-label-lg`
- 상태: stable

#### Font Size/Label Md
- 역할: Md 컨트롤의 라벨의 글자 크기
- 쓸 때: Md 버튼, 입력 필드 라벨, 탭
- 쓰지 말 때: 본문 → `Body Sm`
- 스코프: FONT_SIZE
- 코드: `--font-size-label-md`
- 상태: stable

#### Font Size/Label Sm
- 역할: Sm 컨트롤의 라벨의 글자 크기
- 쓸 때: Sm 버튼, 칩, 배지
- 쓰지 말 때: 정보 텍스트 → `Caption`
- 스코프: FONT_SIZE
- 코드: `--font-size-label-sm`
- 상태: stable

#### Line Height/Display
- 역할: 화면에서 가장 큰 표현용 텍스트의 줄 높이
- 쓸 때: `Font Size/Display`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Display`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-display`
- 상태: stable

#### Line Height/Heading Lg
- 역할: 화면 제목의 줄 높이
- 쓸 때: `Font Size/Heading Lg`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Heading Lg`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-heading-lg`
- 상태: stable

#### Line Height/Heading Md
- 역할: 섹션 제목의 줄 높이
- 쓸 때: `Font Size/Heading Md`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Heading Md`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-heading-md`
- 상태: stable

#### Line Height/Heading Sm
- 역할: 카드와 모달의 제목의 줄 높이
- 쓸 때: `Font Size/Heading Sm`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Heading Sm`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-heading-sm`
- 상태: stable

#### Line Height/Body
- 역할: 본문의 줄 높이
- 쓸 때: `Font Size/Body`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Body`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-body`
- 상태: stable

#### Line Height/Body Sm
- 역할: 보조 본문의 줄 높이
- 쓸 때: `Font Size/Body Sm`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Body Sm`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-body-sm`
- 상태: stable

#### Line Height/Caption
- 역할: 가장 작은 정보 텍스트의 줄 높이
- 쓸 때: `Font Size/Caption`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Caption`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-caption`
- 상태: stable

#### Line Height/Label Lg
- 역할: Lg 컨트롤의 라벨의 줄 높이
- 쓸 때: `Font Size/Label Lg`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Label Lg`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-label-lg`
- 상태: stable

#### Line Height/Label Md
- 역할: Md 컨트롤의 라벨의 줄 높이
- 쓸 때: `Font Size/Label Md`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Label Md`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-label-md`
- 상태: stable

#### Line Height/Label Sm
- 역할: Sm 컨트롤의 라벨의 줄 높이
- 쓸 때: `Font Size/Label Sm`와 짝으로
- 쓰지 말 때: 다른 위계의 Font Size와 섞지 않는다 → 항상 같은 이름의 `Font Size/Label Sm`와 함께
- 스코프: LINE_HEIGHT
- 코드: `--line-height-label-sm`
- 상태: stable

#### Font Weight/Display
- 역할: 표현용 텍스트의 굵기
- 쓸 때: Display 텍스트
- 쓰지 말 때: 화면 제목 → `Font Weight/Heading`
- 스코프: FONT_WEIGHT
- 코드: `--font-weight-display`
- 상태: stable

#### Font Weight/Heading
- 역할: 제목의 굵기
- 쓸 때: 모든 Heading 텍스트
- 쓰지 말 때: 본문 안 강조 → `Font Weight/Strong`
- 스코프: FONT_WEIGHT
- 코드: `--font-weight-heading`
- 상태: stable

#### Font Weight/Body
- 역할: 본문의 굵기
- 쓸 때: Body, Caption 텍스트
- 쓰지 말 때: 본문 안 강조 → `Font Weight/Strong`
- 스코프: FONT_WEIGHT
- 코드: `--font-weight-body`
- 상태: stable

#### Font Weight/Strong
- 역할: 본문 안 강조의 굵기
- 쓸 때: 본문 안에서 일부를 강조할 때
- 쓰지 말 때: 제목 → `Font Weight/Heading`
- 스코프: FONT_WEIGHT
- 코드: `--font-weight-strong`
- 상태: stable

#### Font Weight/Label
- 역할: 컨트롤 라벨의 굵기
- 쓸 때: 버튼, 탭, 칩 라벨
- 쓰지 말 때: 본문 → `Font Weight/Body`
- 스코프: FONT_WEIGHT
- 코드: `--font-weight-label`
- 상태: stable

## 모드별 참조표

모드별 alias·px 값은 [values/semantic-responsive.values.md](values/semantic-responsive.values.md)에 있다.

## Text Style 바인딩

Text Style은 독립된 값이 아니라 아래 변수의 조합입니다. 스타일 이름은 섹션 2에서 정한 레이어·스타일 네이밍과 맞춥니다.

<!-- CUSTOMIZE: 섹션 2에서 정한 Text Style 이름(예: heading/lg)과 표기를 맞춘다 -->

| Text Style | Font Family | Font Size | Line Height | Font Weight |
|---|---|---|---|---|
| Display | `Font Family/Base` | `Font Size/Display` | `Line Height/Display` | `Font Weight/Display` |
| Heading/Lg | `Font Family/Base` | `Font Size/Heading Lg` | `Line Height/Heading Lg` | `Font Weight/Heading` |
| Heading/Md | `Font Family/Base` | `Font Size/Heading Md` | `Line Height/Heading Md` | `Font Weight/Heading` |
| Heading/Sm | `Font Family/Base` | `Font Size/Heading Sm` | `Line Height/Heading Sm` | `Font Weight/Heading` |
| Body/Md | `Font Family/Base` | `Font Size/Body` | `Line Height/Body` | `Font Weight/Body` |
| Body/Md Strong | `Font Family/Base` | `Font Size/Body` | `Line Height/Body` | `Font Weight/Strong` |
| Body/Sm | `Font Family/Base` | `Font Size/Body Sm` | `Line Height/Body Sm` | `Font Weight/Body` |
| Caption | `Font Family/Base` | `Font Size/Caption` | `Line Height/Caption` | `Font Weight/Body` |
| Label/Lg | `Font Family/Base` | `Font Size/Label Lg` | `Line Height/Label Lg` | `Font Weight/Label` |
| Label/Md | `Font Family/Base` | `Font Size/Label Md` | `Line Height/Label Md` | `Font Weight/Label` |
| Label/Sm | `Font Family/Base` | `Font Size/Label Sm` | `Line Height/Label Sm` | `Font Weight/Label` |

## 추가·변경 규칙

- Semantic Color와 같다. 새 역할이 두 곳 이상에서 필요할 때만 추가하고, 세 모드의 alias와 스코프, 코드를 함께 정의한다.
- Text Style을 추가하면 위 바인딩 표에 행을 추가한다. 표에 없는 Text Style은 쓰지 않는다.
