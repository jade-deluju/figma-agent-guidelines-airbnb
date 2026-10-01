---
name: agent-brief
layer: all
purpose: 화면 만들기·수정·리디자인을 이 파일 하나로 시작하기 위한 요약
status: stable
---

# 에이전트 브리프 (화면 작업용)

화면을 만들거나 고치거나 리디자인할 때는 이 파일만 읽고 시작한다. 이 파일로 판단이 안 될 때만 원본 문서에서 **필요한 항목 하나**를 찾아 읽는다 (예: semantic-color.md의 `#### Text/Tertiary` 항목). 원본 문서를 통째로 읽지 않는다.

## 작업 방식 (크레딧 절약)

1. 문서는 세션 시작 때 한 번만 읽는다. 같은 문서를 다시 읽지 않는다.
2. 여러 프레임은 한 세션에서 이어서 처리한다.
   - 첫 프레임: 만들기 → 검증 → 고치기
   - 나머지 프레임: 첫 프레임에서 정한 구조와 토큰 선택을 그대로 적용한다. 같은 판단을 프레임마다 다시 하지 않는다.
3. 노드 정보는 프레임마다 한 번 읽고 재사용한다. 같은 노드를 반복해서 조회하지 않는다.
4. 검증은 프레임 작업이 끝날 때 한 번, **이번에 바꾼 노드만** 한다. 스크린샷은 프레임마다 마지막에 한 번만 찍는다.
5. hex·px 값이 꼭 필요할 때만 `tokens/values/`를 연다. Figma 안에서는 배리어블 이름으로 고르면 된다.

## 핵심 규칙

- 원시값(hex, px)을 쓰지 않는다. 색·간격·크기·모서리·글자는 모두 배리어블이나 스타일로 지정한다. [PRN-06]
- Foundation 배리어블(`Color/*`, `Space/*` 등)은 직접 쓰지 않는다. 아래 Semantic 목록에서 고른다. [FND-01]
- 목록에 없는 토큰을 만들지 않는다. 맞는 게 없으면 멈추고 제안한다. [PRN-07]
- 텍스트·아이콘·테두리는 `짝`에 적힌 면 위에서만 쓴다. [SEM-05]
- 포커스는 채움을 바꾸지 않고 `Border/Focus` 링으로 표현한다. [SEM-06]
- `Primary`는 라이트 검정·다크 흰색인 주요 행동이다. 브랜드 색은 `Accent`. 화면당 Primary 버튼은 하나. [ADR-0001]
- 화면 프레임에 테마(Light/Dark)와 폭(Mobile 0–767 / Tablet 768–1279 / Desktop 1280–) 모드를 적용한다. 테마·폭에 따라 다른 토큰을 고르지 않는다. [RSP-01·03]
- 텍스트는 아래 Text Style로만 지정한다. [RSP-05]
- 컨테이너는 Frame + 오토 레이아웃. Group·Mask를 쓰지 않는다. 레이어에 역할 이름을 붙인다. [FIG-01·03·04·10]
- Resizing: 내용 따라 → Hug, 부모 폭 따라 → Fill, 크기가 디자인 결정 → Fixed(토큰 바인딩). 반응형 콘텐츠 폭은 Fixed 금지. [FIG-20·21·22]
- 간격은 Gap·Padding 토큰으로만. 빈 레이어로 간격을 만들지 않는다. [FIG-13·14]
- 겹쳐야 하는 요소(배지, 플로팅 버튼, 하단 고정 바)만 Ignore auto layout + 의도에 맞는 Constraints. [FIG-25·36]
- 텍스트는 한 줄 라벨 Hug, 여러 줄 Fill + Auto height. Fixed size 텍스트 금지. 길이가 바뀌는 텍스트는 Truncate + Max lines. [FIG-63·64]
- 단위: 크기·간격은 px, 줄 높이는 px(토큰), 자간은 %. 비율 값(÷)을 px로 넣지 않는다. % 너비는 Fill이나 fr로 옮긴다. [FIG-90~94]
- 반복 UI는 컴포넌트 인스턴스. Detach하지 않고, 바인딩된 속성을 덮어쓰지 않는다. [FIG-78·79, CMP-06]

## 토큰 고르는 순서

무엇에 칠하나(Surface / Fill / Text / Icon / Border) → 누르거나 상태가 있나(있으면 Fill) → 의미(Primary·Accent·Danger·Success·Warning) → 위계(Primary·Secondary·Tertiary·Disabled) → 전경이면 짝 확인.

- 놓이는 면은 Surface, 누르거나 상태를 가진 요소는 Fill이다.
- 선택된 항목 배경은 `Fill/* Subtle/Selected`, 카드 배경은 `Surface/Raised`이다.
- 입력 필드 테두리는 `Border/Strong`이다.

## Semantic Color

<!-- GENERATED:START id=brief-color — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
**Surface**
- `Surface/Default` 화면의 기본 바탕
- `Surface/Subtle` 기본 바탕과 은은하게 구분되는 구역
- `Surface/Raised` 바탕 위로 올라온 면
- `Surface/Overlay` 다른 내용 위에 떠서 가리는 면
- `Surface/Inverse` 주변과 명도가 반전된 면

**Fill**
- `Fill/Primary/Default` 화면에서 대비가 가장 높은 주요 행동의 채움
- `Fill/Primary/Hover` Fill/Primary/Default의 호버 상태
- `Fill/Primary/Pressed` Fill/Primary/Default의 눌린 상태
- `Fill/Accent/Default` 브랜드 색으로 시선을 끄는 행동의 채움
- `Fill/Accent/Hover` Fill/Accent/Default의 호버 상태
- `Fill/Accent/Pressed` Fill/Accent/Default의 눌린 상태
- `Fill/Danger/Default` 되돌리기 어려운 파괴적 행동의 채움
- `Fill/Danger/Hover` Fill/Danger/Default의 호버 상태
- `Fill/Danger/Pressed` Fill/Danger/Default의 눌린 상태
- `Fill/Primary Subtle/Default` 중립적인 보조 요소의 채움
- `Fill/Primary Subtle/Hover` Fill/Primary Subtle/Default의 호버 상태
- `Fill/Primary Subtle/Selected` 선택이 유지되는 중립 요소의 채움
- `Fill/Accent Subtle/Default` 브랜드 색이 은은하게 들어간 채움
- `Fill/Accent Subtle/Hover` Fill/Accent Subtle/Default의 호버 상태
- `Fill/Accent Subtle/Selected` 브랜드 색으로 강조된 선택 상태의 채움
- `Fill/Danger Subtle/Default` 오류·위험을 알리는 은은한 채움
- `Fill/Success Subtle/Default` 완료·성공을 알리는 은은한 채움
- `Fill/Warning Subtle/Default` 주의를 알리는 은은한 채움
- `Fill/Disabled` 비활성 요소의 채움 (모든 톤 공통)

**Text**
- `Text/Primary` 사용자가 읽어야 하는 기본 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Primary Subtle/*
- `Text/Secondary` 주 텍스트를 보조하는 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Primary Subtle/Default
- `Text/Tertiary` 가장 낮은 위계의 읽어야 하는 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay)
- `Text/Disabled` 비활성 요소의 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Disabled
- `Text/Inverse` 반전된 면 위의 텍스트 — 짝: Surface/Inverse
- `Text/On Primary` Fill/Primary/* 위의 텍스트 — 짝: Fill/Primary/*
- `Text/On Accent` Fill/Accent/* 위의 텍스트 — 짝: Fill/Accent/*
- `Text/On Danger` Fill/Danger/* 위의 텍스트 — 짝: Fill/Danger/*
- `Text/Accent` 브랜드 색으로 강조한 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Accent Subtle/*
- `Text/Link` 누르면 이동하는 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay)
- `Text/Danger` 오류와 위험을 알리는 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Danger Subtle/Default
- `Text/Success` 완료와 성공을 알리는 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Success Subtle/Default
- `Text/Warning` 주의를 알리는 텍스트 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Warning Subtle/Default

**Icon**
- `Icon/Primary` 기본 아이콘 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Primary Subtle/*
- `Icon/Secondary` 보조 아이콘 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Primary Subtle/Default
- `Icon/Disabled` 비활성 요소의 아이콘 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Disabled
- `Icon/Inverse` 반전된 면 위의 아이콘 — 짝: Surface/Inverse
- `Icon/On Primary` Fill/Primary/* 위의 아이콘 — 짝: Fill/Primary/*
- `Icon/On Accent` Fill/Accent/* 위의 아이콘 — 짝: Fill/Accent/*
- `Icon/On Danger` Fill/Danger/* 위의 아이콘 — 짝: Fill/Danger/*
- `Icon/Accent` 브랜드 색으로 강조한 아이콘 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Accent Subtle/(Default·Selected)
- `Icon/Danger` 오류와 위험을 알리는 아이콘 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Danger Subtle/Default
- `Icon/Success` 완료와 성공을 알리는 아이콘 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Success Subtle/Default
- `Icon/Warning` 주의를 알리는 아이콘 — 짝: Surface/(Default·Subtle·Raised·Overlay), Fill/Warning Subtle/Default

**Border**
- `Border/Subtle` 같은 면 안을 나누는 가장 약한 선 — 짝: Surface/(Default·Subtle·Raised·Overlay)
- `Border/Default` 면과 면의 경계를 보여주는 외곽선 — 짝: Surface/(Default·Subtle·Raised·Overlay)
- `Border/Strong` 경계를 식별해야 하는 요소의 외곽선 — 짝: Surface/(Default·Subtle·Raised·Overlay)
- `Border/Focus` 키보드 포커스 링 — 짝: Surface/(Default·Subtle·Raised·Overlay)
- `Border/Accent` 선택된 요소의 외곽선 — 짝: Surface/(Default·Subtle·Raised·Overlay)
- `Border/Danger` 오류 상태의 외곽선 — 짝: Surface/(Default·Subtle·Raised·Overlay)

**Overlay**
- `Overlay/Scrim` 떠 있는 면 뒤의 화면을 어둡게 가리는 막

**Shadow**
- `Shadow/Raised` 올라온 면의 그림자 색
- `Shadow/Overlay` 떠 있는 면의 그림자 색
<!-- GENERATED:END -->

## Semantic Responsive

같은 이름의 `Font Size/X`와 `Line Height/X`는 항상 함께 쓴다.

<!-- GENERATED:START id=brief-responsive — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
- **Margin**: Page
- **Gap**: Section · Stack · Inline · Inline Tight
- **Inset**: Sm · Md · Lg · Container
- **Control Height**: Sm · Md · Lg
- **Control Min Width**: Sm · Md · Lg
- **Icon Size**: Sm · Md · Lg
- **Hit Area**: Min
- **Corner**: Control · Container · Sheet · Pill
- **Border Width**: Default · Focus Ring
- **Font Family**: Base
- **Font Size**: Display · Heading Lg · Heading Md · Heading Sm · Body · Body Sm · Caption · Label Lg · Label Md · Label Sm
- **Line Height**: Display · Heading Lg · Heading Md · Heading Sm · Body · Body Sm · Caption · Label Lg · Label Md · Label Sm
- **Font Weight**: Display · Heading · Body · Strong · Label
<!-- GENERATED:END -->

Text Style: Display · Heading/Lg · Heading/Md · Heading/Sm · Body/Md · Body/Md Strong · Body/Sm · Caption · Label/Lg · Label/Md · Label/Sm

<!-- CUSTOMIZE: 섹션 2에서 정한 Text Style 이름과 맞춘다 (semantic-responsive.md의 바인딩 표와 같이) -->

## 컴포넌트

화면에서는 아래 컴포넌트의 인스턴스를 쓰고, 배리언트로 모습을 바꾼다. 새 컴포넌트를 만들어야 하면 이 브리프가 아니라 [create-component](playbooks/create-component.md) 절차를 따른다.

<!-- GENERATED:START id=brief-components — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
- **Button** ([문서](tokens/components/button.md)) — 배리언트 자리: Primary · Accent · Danger · Sm · Md · Lg. 토큰 65개는 인스턴스에 이미 바인딩되어 있다
<!-- GENERATED:END -->

## 마무리 점검 (프레임마다 한 번, 바꾼 노드만)

| 확인 | 원본 ID |
|---|---|
| 변수·스타일이 아닌 색과 숫자가 없다 | CHK-20·69 |
| Group·Mask·기본 이름 레이어가 없다 | CHK-40·41 |
| 컨테이너에 오토 레이아웃이 있고, 간격이 토큰이다 | CHK-43·46 |
| Resizing에 의도 없는 Fixed가 없다 | CHK-47 |
| 프레임에 테마·폭 모드가 적용되어 있다 | CHK-22·66 |
| 전경-배경 조합이 짝 안에 있다 | CHK-23 |
| 텍스트가 Text Style이고, Fixed size 텍스트가 없다 | CHK-26·60·61 |
| 줄 높이 px, 자간 % | CHK-67·68 |
| Detach된 인스턴스나 덮어쓴 바인딩이 없다 | CHK-24·64 |
| 폭을 바꾸고 긴 문구를 넣어도 깨지지 않는다 | CHK-53·63 |

결과는 [checklist.md](checklist.md)의 보고 형식으로 보고한다. 실패 항목의 자세한 기준이 필요하면 그 ID의 원본 항목만 찾아 읽는다.
