---
name: 서비스 이름
description: 모바일 우선 앱의 디자인 요약
---

<!-- CUSTOMIZE: 서비스 이름, 설명, 분위기를 내 서비스로 바꾼다 -->

# 디자인 요약

이 문서는 화면 생성 도구와 에이전트가 한 번에 읽는 요약본입니다. 세부 규칙은 `design-system/`에 있고, 둘이 다르면 `design-system/`이 맞습니다.

## 분위기

- 차분하고 단정하다. 기록이 주인공이고 장식은 최소로 한다.
- 고대비 무채색이 기본이고, 브랜드 파랑은 강조에만 쓴다.
- 완료 같은 성취는 색보다 숫자와 체크 표시로 먼저 보여준다.

## 색

역할로 고른다. 값은 아래 표처럼 모드에 따라 바뀐다. 전체 목록과 짝 규칙은 [semantic-color.md](design-system/tokens/semantic-color.md).

<!-- GENERATED:START id=design-summary — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
| 역할 | 토큰 | Light | Dark |
|---|---|---|---|
| 화면의 기본 바탕 | `Surface/Default` | #fdfdfd | #111212 |
| 바탕 위로 올라온 면 | `Surface/Raised` | #ffffff | #171717 |
| 사용자가 읽어야 하는 기본 텍스트 | `Text/Primary` | #1a1b1c | #eeeeef |
| 주 텍스트를 보조하는 텍스트 | `Text/Secondary` | #515355 | #b9bbbd |
| 화면에서 대비가 가장 높은 주요 행동의 채움 | `Fill/Primary/Default` | #1a1b1c | #eeeeef |
| 브랜드 색으로 시선을 끄는 행동의 채움 | `Fill/Accent/Default` | #156cdd | #005dca |
| 되돌리기 어려운 파괴적 행동의 채움 | `Fill/Danger/Default` | #d02c2a | #be1219 |
| 면과 면의 경계를 보여주는 외곽선 | `Border/Default` | #d0d1d2 | #48494a |
| 키보드 포커스 링 | `Border/Focus` | #156cdd | #95c0ff |

| 글자 크기 | Mobile | Tablet | Desktop |
|---|---|---|---|
| `Font Size/Display` | 28px | 32px | 40px |
| `Font Size/Heading Lg` | 24px | 24px | 28px |
| `Font Size/Heading Md` | 20px | 20px | 24px |
| `Font Size/Heading Sm` | 18px | 18px | 18px |
| `Font Size/Body` | 16px | 16px | 16px |
| `Font Size/Body Sm` | 14px | 14px | 14px |
| `Font Size/Caption` | 12px | 12px | 12px |
| `Font Size/Label Lg` | 16px | 16px | 16px |
| `Font Size/Label Md` | 14px | 14px | 14px |
| `Font Size/Label Sm` | 13px | 13px | 13px |
<!-- GENERATED:END -->

## 타이포그래피

- 글꼴은 Pretendard 하나. 위계는 크기와 굵기로만 만든다.
- 텍스트는 Text Style로만 지정한다. 조합 표는 [semantic-responsive.md](design-system/tokens/semantic-responsive.md#text-style-바인딩).

## 레이아웃

- 4px 단위. 화면 좌우 여백은 `Margin/Page`, 섹션 사이는 `Gap/Section`.
- 모바일 우선. 폭 768에서 Tablet, 1280에서 Desktop 모드로 바뀐다.
- 터치 가능한 요소는 최소 44×44 (`Hit Area/Min`).

## 컴포넌트

- 버튼: Primary(화면당 하나), Accent(눈에 띄어야 하는 보조 행동), Danger(파괴적 행동). 자세한 규칙은 [button.md](design-system/tokens/components/button.md).

## 하지 말 것

- 원시 색값과 원시 px
- 주요 버튼을 브랜드 파랑으로 칠하기 (주요 버튼은 Primary — 라이트 검정, 다크 흰색)
- 한 화면에 Primary 버튼 두 개
- 포커스를 채움 색 변화로 표현하기 (포커스 링을 쓴다)
