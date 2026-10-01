---
name: semantic-color
layer: semantic
collection: Semantic Color
modes: [Light, Dark]
references: [foundation]
values_source: tokens/semantic-color.*.tokens.json
status: stable
---

# Semantic Color 토큰

색에 관한 모든 결정이 내려지는 곳입니다. 화면과 Component 토큰이 참조할 수 있는 유일한 색 레이어입니다. 테마(Light/Dark)는 이 컬렉션의 모드로만 전환합니다.

## 규칙

- **[SEM-01] MUST** 화면의 모든 색은 이 문서의 토큰 또는 이를 참조하는 Component 토큰으로만 지정한다.
  - 이유: 테마 전환과 대비 보장이 이 레이어에서만 관리된다.
- **[SEM-02] MUST** 모든 토큰은 Foundation만 참조한다. Semantic끼리 참조하지 않는다.
  - 이유: 사슬이 생기면 Icon을 고치려다 Text가 바뀌고, AI가 참조 그래프를 여러 단계 추적해야 한다.
- **[SEM-03] MUST NOT** 이름에 색 이름(Blue, Gray), 단계 번호, 명도 표현(Dark, Light)을 넣지 않는다.
  - 이유: 리브랜딩으로 값이 바뀌면 이름이 거짓말을 하고, AI는 이름을 믿는다.
- **[SEM-04] MUST** 모든 토큰은 모든 모드에 값을 가진다.
- **[SEM-05] MUST** 전경 토큰(Text, Icon, Border)은 `짝`에 적힌 면 위에서만 쓰고, `대비 기준`을 모든 모드에서 충족한다.
  - 이유: AI는 배경과 전경을 따로 고른다. 조합을 닫힌 목록으로 만들어야 "각각은 맞는데 조합이 틀린" 실수가 사라진다.
- **[SEM-06] MUST** 키보드 포커스는 채움을 바꾸지 않고 `Border/Focus` 링(`Border Width/Focus Ring`)으로 표현한다.
- **[SEM-07] MUST NOT** 목록에 없는 토큰을 만들어 쓰지 않는다. 필요하면 [add-token 절차](../playbooks/add-token.md)로 제안한다.

## 대상(Target) 정의

토큰 이름의 첫 단어는 "무엇에 칠하는가"입니다.

- **Surface** — 요소가 놓이는 면. 페이지, 카드, 모달, 시트.
- **Fill** — 누르거나 상태를 표시하는 요소 자체의 채움. 버튼, 칩, 토글 트랙, 배지.
- **Text / Icon** — 전경. 값이 같더라도 별도 토큰으로 둔다 (아이콘만 바꾸고 싶을 때 텍스트가 따라 바뀌지 않도록).
- **Border** — 테두리, 구분선, 포커스 링.
- **Overlay / Shadow** — 겹침 전용. 반투명 값이다.

경계 사례:

- ❌ 선택된 리스트 항목 배경에 `Surface/Subtle` → ✅ `Fill/Primary Subtle/Selected` (상태를 표현하므로 Fill)
- ❌ 카드 배경에 `Fill/Primary Subtle/Default` → ✅ `Surface/Raised` (누르지 않는 면이므로 Surface)
- ❌ 입력 필드 외곽선에 `Border/Default` → ✅ `Border/Strong` (경계를 식별해야 하므로 3:1 필요)

## 톤

<!-- CUSTOMIZE: 서비스의 행동 위계에 맞게 톤의 의미를 다시 쓴다. 톤을 추가·삭제하면 naming.md의 허용 어휘와 ADR도 함께 고친다 -->

- **Primary** — 화면에서 대비가 가장 높은 주요 행동. 라이트에서 검정, 다크에서 흰색. 화면당 하나. ([ADR-0001](../decisions/0001-primary-not-neutral.md))
- **Accent** — 브랜드 색. 주요 행동은 아니지만 눈에 띄어야 하는 행동과, 브랜드 색으로 강조한 선택 상태.
- **Danger** — 되돌리기 어려운 파괴적 행동과 오류.
- **Success / Warning** — 상태 알림 전용. 채움은 Subtle만 두고 솔리드 버튼으로 쓰지 않는다.

## 상태 파생 규칙

| 채움 종류 | Default | Hover | Pressed | Selected |
|---|---|---|---|---|
| 고대비 솔리드 (Primary) | 12 | 11 | 10 | — |
| 유채색 솔리드 (Accent, Danger) | 9 | 10 | Light 11 / Dark 8 | — |
| Subtle (모든 톤) | 3 | 4 | — | 5 |
| 비활성 | `Fill/Disabled` 하나를 모든 톤이 공유 | | | |

- 상태가 깊어질수록 기본값에서 한 단계씩 멀어진다.
- 유채색 Pressed가 모드마다 다른 이유: 다크 스케일의 11단계는 밝은 텍스트용이라 흰 라벨과의 대비가 무너진다. 다크에서는 반대 방향(8단계)으로 눌림을 표현한다.
- 솔리드 채움에는 Selected가 없다. 선택이 유지되는 상태는 Subtle 채움으로 표현한다.
- Component 토큰은 상태를 새로 정하지 않는다 (CMP-03). 그래서 모든 인터랙션 상태가 이 레이어에 미리 있어야 한다.

## 토큰 선택 순서

1. 무엇에 칠하는가 → Surface / Fill / Text / Icon / Border
2. 누르거나 상태를 가진 요소인가 → 그렇다면 `Fill/{톤}/{상태}` 또는 `Fill/{톤} Subtle/{상태}`
3. 어떤 의미를 전달하는가 → 주요 행동(Primary), 강조(Accent), 파괴·오류(Danger), 성공(Success), 주의(Warning)
4. 위계는 어디인가 → Primary / Secondary / Tertiary / Disabled
5. 전경이라면 `짝`과 `대비 기준`을 확인한다
6. 맞는 토큰이 없으면 멈추고 제안한다 (SEM-07)

## 항목 형식

모든 항목은 같은 필드를 같은 순서로 가진다.

- **역할** — 한 문장. Figma 변수의 설명(Description)과 같은 문장을 쓴다.
- **쓸 때 / 쓰지 말 때** — 쓰지 말 때에는 금지만 적지 않고 `→ 대신 쓸 토큰`을 함께 적는다.
- **짝 / 대비 기준** — 전경 토큰에만 있다. `npm run tokens:check`가 모든 모드에서 대비를 계산한다.
- **스코프** — Figma 변수에 설정한 스코프와 같아야 한다.
- **코드** — [code-mapping.md](../code-mapping.md) 규칙으로 만든 CSS 변수 이름.
- **상태** — stable / deprecated. deprecated면 CHANGELOG의 대체 토큰을 쓴다.
- **비고** — 단계 용도 가이드와 다르게 고른 이유처럼, 결정의 근거.

모드별 alias 값은 항목에 적지 않는다. [values/semantic-color.values.md](values/semantic-color.values.md)에 JSON에서 자동으로 만들어진다.

## 토큰

### Surface — 면

#### Surface/Default
- 역할: 화면의 기본 바탕
- 쓸 때: 페이지와 전체 화면의 배경
- 쓰지 말 때: 바탕 위에 올라온 카드 → `Surface/Raised` · 구역 구분 → `Surface/Subtle` · 누르거나 선택되는 요소 → `Fill/*`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-surface-default`
- 상태: stable

#### Surface/Subtle
- 역할: 기본 바탕과 은은하게 구분되는 구역
- 쓸 때: 섹션 배경, 사이드 패널, 리스트 그룹 배경
- 쓰지 말 때: 호버·선택 표현 → `Fill/Primary Subtle/*` · 위로 올라온 카드 → `Surface/Raised`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-surface-subtle`
- 상태: stable

#### Surface/Raised
- 역할: 바탕 위로 올라온 면
- 쓸 때: 카드, 리스트 셀, 입력 필드 배경
- 쓰지 말 때: 다른 내용을 가리며 떠 있는 면 → `Surface/Overlay`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-surface-raised`
- 상태: stable
- 비고: 다크 모드에서는 `Surface/Subtle`과 값이 같다. 카드의 경계는 `Border/Default`로 표현한다.

#### Surface/Overlay
- 역할: 다른 내용 위에 떠서 가리는 면
- 쓸 때: 모달, 바텀시트, 팝오버, 드롭다운 메뉴
- 쓰지 말 때: 화면 흐름 안의 카드 → `Surface/Raised` · 잠깐 떴다 사라지는 알림 → `Surface/Inverse`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-surface-overlay`
- 상태: stable
- 비고: 다크 모드는 위로 올라온 면일수록 밝게 표현하므로 3단계를 쓴다. 그림자는 `Shadow/Overlay`.

#### Surface/Inverse
- 역할: 주변과 명도가 반전된 면
- 쓸 때: 토스트, 툴팁
- 쓰지 말 때: 누르는 요소의 채움 → `Fill/Primary/*`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-surface-inverse`
- 상태: stable

### Fill — 채움

#### Fill/Primary/Default
- 역할: 화면에서 대비가 가장 높은 주요 행동의 채움
- 쓸 때: 화면당 하나뿐인 주요 버튼, 플로팅 액션 버튼
- 쓰지 말 때: 브랜드 강조 → `Fill/Accent/*` · 삭제 같은 파괴적 행동 → `Fill/Danger/*` · 비활성 → `Fill/Disabled`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-primary-default`
- 상태: stable
- 비고: ADR-0001 참조

#### Fill/Primary/Hover
- 역할: `Fill/Primary/Default`의 호버 상태
- 쓸 때: 포인터가 올라간 상태
- 쓰지 말 때: 눌린 상태 → `Fill/Primary/Pressed` · 키보드 포커스 → 채움은 그대로 두고 `Border/Focus` 링을 더한다
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-primary-hover`
- 상태: stable

#### Fill/Primary/Pressed
- 역할: `Fill/Primary/Default`의 눌린 상태
- 쓸 때: 터치 또는 클릭이 유지되는 동안
- 쓰지 말 때: 선택이 유지되는 상태 → 솔리드 채움에는 선택 상태가 없다. 선택은 `Fill/Primary Subtle/Selected`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-primary-pressed`
- 상태: stable

#### Fill/Accent/Default
- 역할: 브랜드 색으로 시선을 끄는 행동의 채움
- 쓸 때: 주요 행동은 아니지만 눈에 띄어야 하는 행동 (예: 항목 추가하기)
- 쓰지 말 때: 화면의 가장 중요한 행동 → `Fill/Primary/*` · 은은한 강조 배경 → `Fill/Accent Subtle/*`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-accent-default`
- 상태: stable

#### Fill/Accent/Hover
- 역할: `Fill/Accent/Default`의 호버 상태
- 쓸 때: 포인터가 올라간 상태
- 쓰지 말 때: 눌린 상태 → `Fill/Accent/Pressed` · 키보드 포커스 → 채움은 그대로 두고 `Border/Focus` 링을 더한다
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-accent-hover`
- 상태: stable

#### Fill/Accent/Pressed
- 역할: `Fill/Accent/Default`의 눌린 상태
- 쓸 때: 터치 또는 클릭이 유지되는 동안
- 쓰지 말 때: 선택이 유지되는 상태 → 솔리드 채움에는 선택 상태가 없다. 선택은 `Fill/Accent Subtle/Selected`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-accent-pressed`
- 상태: stable
- 비고: 라이트는 11단계, 다크는 8단계. 다크 스케일의 11단계는 밝은 텍스트용이라 흰 라벨과 대비가 무너진다 ([상태 파생 규칙](#상태-파생-규칙)).

#### Fill/Danger/Default
- 역할: 되돌리기 어려운 파괴적 행동의 채움
- 쓸 때: 삭제, 탈퇴, 기록 초기화의 확인 버튼
- 쓰지 말 때: 오류 메시지 배경 → `Fill/Danger Subtle/Default` · 오류 텍스트 → `Text/Danger`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-danger-default`
- 상태: stable

#### Fill/Danger/Hover
- 역할: `Fill/Danger/Default`의 호버 상태
- 쓸 때: 포인터가 올라간 상태
- 쓰지 말 때: 눌린 상태 → `Fill/Danger/Pressed` · 키보드 포커스 → 채움은 그대로 두고 `Border/Focus` 링을 더한다
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-danger-hover`
- 상태: stable

#### Fill/Danger/Pressed
- 역할: `Fill/Danger/Default`의 눌린 상태
- 쓸 때: 터치 또는 클릭이 유지되는 동안
- 쓰지 말 때: 선택이 유지되는 상태 → 솔리드 채움에는 선택 상태가 없다. 선택은 `Fill/Primary Subtle/Selected`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-danger-pressed`
- 상태: stable
- 비고: 라이트는 11단계, 다크는 8단계. 다크 스케일의 11단계는 밝은 텍스트용이라 흰 라벨과 대비가 무너진다 ([상태 파생 규칙](#상태-파생-규칙)).

#### Fill/Primary Subtle/Default
- 역할: 중립적인 보조 요소의 채움
- 쓸 때: 보조 버튼, 칩, 세그먼트 컨트롤의 기본 배경
- 쓰지 말 때: 면 자체(카드·섹션) → `Surface/*` · 주요 행동 → `Fill/Primary/*`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-primary-subtle-default`
- 상태: stable

#### Fill/Primary Subtle/Hover
- 역할: `Fill/Primary Subtle/Default`의 호버 상태
- 쓸 때: 보조 요소와 리스트 항목에 포인터가 올라간 상태
- 쓰지 말 때: 선택이 유지되는 상태 → `Fill/Primary Subtle/Selected`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-primary-subtle-hover`
- 상태: stable

#### Fill/Primary Subtle/Selected
- 역할: 선택이 유지되는 중립 요소의 채움
- 쓸 때: 선택된 칩, 세그먼트, 리스트 항목
- 쓰지 말 때: 브랜드 색으로 선택을 강조할 때 → `Fill/Accent Subtle/Selected` · 일시적인 눌림 → 해당 톤의 `Pressed`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-primary-subtle-selected`
- 상태: stable

#### Fill/Accent Subtle/Default
- 역할: 브랜드 색이 은은하게 들어간 채움
- 쓸 때: 강조 배지, 진행 중 상태 표시, 브랜드 칩
- 쓰지 말 때: 중립 보조 요소 → `Fill/Primary Subtle/*` · 시선을 끄는 행동 → `Fill/Accent/*`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-accent-subtle-default`
- 상태: stable

#### Fill/Accent Subtle/Hover
- 역할: `Fill/Accent Subtle/Default`의 호버 상태
- 쓸 때: 브랜드 칩·배지에 포인터가 올라간 상태
- 쓰지 말 때: 선택이 유지되는 상태 → `Fill/Accent Subtle/Selected`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-accent-subtle-hover`
- 상태: stable

#### Fill/Accent Subtle/Selected
- 역할: 브랜드 색으로 강조된 선택 상태의 채움
- 쓸 때: 선택된 필터 칩, 선택된 목표 카테고리
- 쓰지 말 때: 중립적인 선택 → `Fill/Primary Subtle/Selected`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-accent-subtle-selected`
- 상태: stable

#### Fill/Danger Subtle/Default
- 역할: 오류·위험을 알리는 은은한 채움
- 쓸 때: 오류 배너, 실패 상태 배지
- 쓰지 말 때: 파괴적 행동 버튼 → `Fill/Danger/*`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-danger-subtle-default`
- 상태: stable

#### Fill/Success Subtle/Default
- 역할: 완료·성공을 알리는 은은한 채움
- 쓸 때: 완료 배지, 목표 달성 배너
- 쓰지 말 때: 브랜드 강조 → `Fill/Accent Subtle/*`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-success-subtle-default`
- 상태: stable

#### Fill/Warning Subtle/Default
- 역할: 주의를 알리는 은은한 채움
- 쓸 때: 주의 배너, 마감 임박 알림
- 쓰지 말 때: 이미 실패한 상태 → `Fill/Danger Subtle/Default`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-warning-subtle-default`
- 상태: stable

#### Fill/Disabled
- 역할: 비활성 요소의 채움 (모든 톤 공통)
- 쓸 때: 비활성 버튼, 비활성 토글 트랙
- 쓰지 말 때: 아직 선택되지 않았을 뿐 누를 수 있는 요소 → 해당 톤의 `Default`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-fill-disabled`
- 상태: stable

### Text — 텍스트

#### Text/Primary
- 역할: 사용자가 읽어야 하는 기본 텍스트
- 쓸 때: 본문, 제목, 입력값
- 쓰지 말 때: 보조 설명 → `Text/Secondary` · 비활성 → `Text/Disabled` · 솔리드 채움 위 → `Text/On Primary`·`On Accent`·`On Danger`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Primary Subtle/Default`, `Fill/Primary Subtle/Hover`, `Fill/Primary Subtle/Selected`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-primary`
- 상태: stable

#### Text/Secondary
- 역할: 주 텍스트를 보조하는 텍스트
- 쓸 때: 부제, 설명, 입력 필드 라벨
- 쓰지 말 때: 플레이스홀더·타임스탬프 → `Text/Tertiary` · 비활성 → `Text/Disabled`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Primary Subtle/Default`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-secondary`
- 상태: stable

#### Text/Tertiary
- 역할: 가장 낮은 위계의 읽어야 하는 텍스트
- 쓸 때: 플레이스홀더, 타임스탬프, 글자 수 표시
- 쓰지 말 때: 비활성 → `Text/Disabled` · 설명문 → `Text/Secondary`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-tertiary`
- 상태: stable

#### Text/Disabled
- 역할: 비활성 요소의 텍스트
- 쓸 때: 비활성 버튼 라벨, 비활성 입력값
- 쓰지 말 때: 읽어야 하는 낮은 위계 텍스트 → `Text/Tertiary`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Disabled`
- 대비 기준: 없음 — 비활성 요소는 WCAG 대비 요구에서 제외된다
- 스코프: TEXT_FILL
- 코드: `--color-text-disabled`
- 상태: stable

#### Text/Inverse
- 역할: 반전된 면 위의 텍스트
- 쓸 때: 토스트, 툴팁 안의 텍스트
- 쓰지 말 때: 솔리드 버튼 라벨 → `Text/On Primary` 등 해당 톤의 On 토큰
- 짝: `Surface/Inverse`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-inverse`
- 상태: stable

#### Text/On Primary
- 역할: `Fill/Primary/*` 위의 텍스트
- 쓸 때: 주요 버튼 라벨
- 쓰지 말 때: 다른 톤의 채움 위 → `Text/On Accent`·`Text/On Danger` · 반전된 면 위 → `Text/Inverse`
- 짝: `Fill/Primary/Default`, `Fill/Primary/Hover`, `Fill/Primary/Pressed`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-on-primary`
- 상태: stable

#### Text/On Accent
- 역할: `Fill/Accent/*` 위의 텍스트
- 쓸 때: 강조 버튼 라벨
- 쓰지 말 때: 은은한 강조 채움 위 → `Text/Accent`
- 짝: `Fill/Accent/Default`, `Fill/Accent/Hover`, `Fill/Accent/Pressed`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-on-accent`
- 상태: stable

#### Text/On Danger
- 역할: `Fill/Danger/*` 위의 텍스트
- 쓸 때: 파괴적 행동 버튼 라벨
- 쓰지 말 때: 오류 배너 안의 텍스트 → `Text/Danger`
- 짝: `Fill/Danger/Default`, `Fill/Danger/Hover`, `Fill/Danger/Pressed`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-on-danger`
- 상태: stable

#### Text/Accent
- 역할: 브랜드 색으로 강조한 텍스트
- 쓸 때: 선택된 칩·탭 라벨, 강조 숫자
- 쓰지 말 때: 누르면 이동하는 텍스트 → `Text/Link` · 솔리드 강조 채움 위 → `Text/On Accent`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Accent Subtle/Default`, `Fill/Accent Subtle/Hover`, `Fill/Accent Subtle/Selected`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-accent`
- 상태: stable

#### Text/Link
- 역할: 누르면 이동하는 텍스트
- 쓸 때: 본문 안 링크, 텍스트 버튼
- 쓰지 말 때: 이동 없이 강조만 할 때 → `Text/Accent`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-link`
- 상태: stable
- 비고: 현재 `Text/Accent`와 값이 같지만 역할이 다르므로 따로 둔다.

#### Text/Danger
- 역할: 오류와 위험을 알리는 텍스트
- 쓸 때: 입력 오류 메시지, 실패 안내
- 쓰지 말 때: 파괴적 버튼 라벨 → `Text/On Danger`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Danger Subtle/Default`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-danger`
- 상태: stable

#### Text/Success
- 역할: 완료와 성공을 알리는 텍스트
- 쓸 때: 완료 안내, 달성 수치
- 쓰지 말 때: 브랜드 강조 → `Text/Accent`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Success Subtle/Default`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-success`
- 상태: stable

#### Text/Warning
- 역할: 주의를 알리는 텍스트
- 쓸 때: 주의 배너 텍스트, 마감 임박 안내
- 쓰지 말 때: 이미 실패한 상태 → `Text/Danger`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Warning Subtle/Default`
- 대비 기준: 4.5:1
- 스코프: TEXT_FILL
- 코드: `--color-text-warning`
- 상태: stable

### Icon — 아이콘

#### Icon/Primary
- 역할: 기본 아이콘
- 쓸 때: 내비게이션, 리스트 아이콘
- 쓰지 말 때: 보조 아이콘 → `Icon/Secondary` · 솔리드 채움 위 → 해당 톤의 `Icon/On *`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Primary Subtle/Default`, `Fill/Primary Subtle/Hover`, `Fill/Primary Subtle/Selected`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-primary`
- 상태: stable

#### Icon/Secondary
- 역할: 보조 아이콘
- 쓸 때: 입력 필드 안 아이콘, 메타 정보 아이콘
- 쓰지 말 때: 비활성 → `Icon/Disabled`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Primary Subtle/Default`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-secondary`
- 상태: stable

#### Icon/Disabled
- 역할: 비활성 요소의 아이콘
- 쓸 때: 비활성 버튼·입력 필드 안 아이콘
- 쓰지 말 때: 낮은 위계지만 활성인 아이콘 → `Icon/Secondary`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Disabled`
- 대비 기준: 없음 — 비활성 요소는 WCAG 대비 요구에서 제외된다
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-disabled`
- 상태: stable

#### Icon/Inverse
- 역할: 반전된 면 위의 아이콘
- 쓸 때: 토스트, 툴팁 안 아이콘
- 쓰지 말 때: 솔리드 버튼 안 → 해당 톤의 `Icon/On *`
- 짝: `Surface/Inverse`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-inverse`
- 상태: stable

#### Icon/On Primary
- 역할: `Fill/Primary/*` 위의 아이콘
- 쓸 때: 주요 버튼 안 아이콘
- 쓰지 말 때: 다른 톤의 채움 위 → `Icon/On Accent`·`Icon/On Danger`
- 짝: `Fill/Primary/Default`, `Fill/Primary/Hover`, `Fill/Primary/Pressed`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-on-primary`
- 상태: stable

#### Icon/On Accent
- 역할: `Fill/Accent/*` 위의 아이콘
- 쓸 때: 강조 버튼 안 아이콘
- 쓰지 말 때: 은은한 강조 채움 위 → `Icon/Accent`
- 짝: `Fill/Accent/Default`, `Fill/Accent/Hover`, `Fill/Accent/Pressed`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-on-accent`
- 상태: stable

#### Icon/On Danger
- 역할: `Fill/Danger/*` 위의 아이콘
- 쓸 때: 파괴적 행동 버튼 안 아이콘
- 쓰지 말 때: 오류 배너 안 아이콘 → `Icon/Danger`
- 짝: `Fill/Danger/Default`, `Fill/Danger/Hover`, `Fill/Danger/Pressed`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-on-danger`
- 상태: stable

#### Icon/Accent
- 역할: 브랜드 색으로 강조한 아이콘
- 쓸 때: 선택된 탭 아이콘, 강조 표시
- 쓰지 말 때: 솔리드 강조 채움 위 → `Icon/On Accent`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Accent Subtle/Default`, `Fill/Accent Subtle/Selected`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-accent`
- 상태: stable

#### Icon/Danger
- 역할: 오류와 위험을 알리는 아이콘
- 쓸 때: 입력 오류 아이콘, 실패 배지 아이콘
- 쓰지 말 때: 파괴적 버튼 안 → `Icon/On Danger`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Danger Subtle/Default`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-danger`
- 상태: stable

#### Icon/Success
- 역할: 완료와 성공을 알리는 아이콘
- 쓸 때: 체크 표시, 달성 배지 아이콘
- 쓰지 말 때: 브랜드 강조 → `Icon/Accent`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Success Subtle/Default`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-success`
- 상태: stable

#### Icon/Warning
- 역할: 주의를 알리는 아이콘
- 쓸 때: 주의 배너 아이콘
- 쓰지 말 때: 이미 실패한 상태 → `Icon/Danger`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`, `Fill/Warning Subtle/Default`
- 대비 기준: 3:1
- 스코프: SHAPE_FILL, STROKE_COLOR
- 코드: `--color-icon-warning`
- 상태: stable
- 비고: 밝은 호박색(9단계)은 흰 바탕에서 3:1을 넘지 못하므로 11단계를 쓴다.

### Border — 테두리

#### Border/Subtle
- 역할: 같은 면 안을 나누는 가장 약한 선
- 쓸 때: 리스트 항목 사이 구분선, 섹션 안 구분선
- 쓰지 말 때: 카드 외곽선 → `Border/Default` · 식별이 필요한 경계 → `Border/Strong`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`
- 대비 기준: 없음 — 장식용 구분선
- 스코프: STROKE_COLOR
- 코드: `--color-border-subtle`
- 상태: stable

#### Border/Default
- 역할: 면과 면의 경계를 보여주는 외곽선
- 쓸 때: 카드, 컨테이너, 이미지 썸네일 외곽선
- 쓰지 말 때: 입력 필드처럼 경계를 식별해야 하는 요소 → `Border/Strong`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`
- 대비 기준: 없음 — 장식용 외곽선. 식별이 필요한 경계에는 `Border/Strong`
- 스코프: STROKE_COLOR
- 코드: `--color-border-default`
- 상태: stable

#### Border/Strong
- 역할: 경계를 식별해야 하는 요소의 외곽선
- 쓸 때: 입력 필드, 체크박스, 라디오 버튼 외곽선
- 쓰지 말 때: 카드 외곽선 → `Border/Default` · 오류 상태 → `Border/Danger` · 포커스 → `Border/Focus`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`
- 대비 기준: 3:1
- 스코프: STROKE_COLOR
- 코드: `--color-border-strong`
- 상태: stable

#### Border/Focus
- 역할: 키보드 포커스 링
- 쓸 때: 포커스를 받은 모든 인터랙티브 요소
- 쓰지 말 때: 선택 상태 표시 → `Border/Accent`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`
- 대비 기준: 3:1
- 스코프: STROKE_COLOR
- 코드: `--color-border-focus`
- 상태: stable
- 비고: 다크 모드에서 9단계는 올라온 면과의 대비가 부족해 11단계를 쓴다.

#### Border/Accent
- 역할: 선택된 요소의 외곽선
- 쓸 때: 선택된 카드, 선택된 옵션 타일
- 쓰지 말 때: 키보드 포커스 → `Border/Focus`
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`
- 대비 기준: 3:1
- 스코프: STROKE_COLOR
- 코드: `--color-border-accent`
- 상태: stable

#### Border/Danger
- 역할: 오류 상태의 외곽선
- 쓸 때: 유효성 검사에 실패한 입력 필드
- 쓰지 말 때: 오류가 아닌 주의 → 외곽선 대신 `Fill/Warning Subtle/Default` 배너
- 짝: `Surface/Default`, `Surface/Subtle`, `Surface/Raised`, `Surface/Overlay`
- 대비 기준: 3:1
- 스코프: STROKE_COLOR
- 코드: `--color-border-danger`
- 상태: stable

### Overlay — 오버레이

#### Overlay/Scrim
- 역할: 떠 있는 면 뒤의 화면을 어둡게 가리는 막
- 쓸 때: 모달, 바텀시트 뒤 딤 처리
- 쓰지 말 때: 면 자체의 색 → `Surface/*`
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: `--color-overlay-scrim`
- 상태: stable

### Shadow — 그림자

#### Shadow/Raised
- 역할: 올라온 면의 그림자 색
- 쓸 때: 카드 Effect Style의 그림자 색
- 쓰지 말 때: 모달·시트 → `Shadow/Overlay`
- 스코프: EFFECT_COLOR
- 코드: `--color-shadow-raised`
- 상태: stable

#### Shadow/Overlay
- 역할: 떠 있는 면의 그림자 색
- 쓸 때: 모달, 바텀시트, 팝오버 Effect Style의 그림자 색
- 쓰지 말 때: 카드 → `Shadow/Raised`
- 스코프: EFFECT_COLOR
- 코드: `--color-shadow-overlay`
- 상태: stable

## 모드별 참조표와 짝 대비 검증

모드별 alias·hex 값과 대비 계산 결과는 [values/semantic-color.values.md](values/semantic-color.values.md)에 있다.

## 추가·변경 규칙

- 새 역할이 두 곳 이상에서 필요할 때만 추가한다 (PRN-08). 한 곳만을 위한 색이면 기존 토큰으로 수렴시키거나 디자인을 다시 검토한다.
- 추가할 때는 모든 모드의 alias, 짝, 대비 기준, 스코프, 코드를 함께 정의하고 CHANGELOG에 기록한다.
- 이름을 바꾸거나 없앨 때는 [rename-deprecate 절차](../playbooks/rename-deprecate.md)를 따른다. 바로 지우지 않는다.
