---
name: glossary
layer: all
status: stable
---

# 용어 사전

강의, 문서, Figma, 코드, AI 대화에서 같은 단어를 같은 뜻으로 씁니다. 표기는 한글(영문)이며 토큰 이름에는 영문만 씁니다.

## 용어

| 용어 | 뜻 |
|---|---|
| 디자인 토큰 (Design Token) | 디자인 결정 하나에 이름을 붙인 것. 도구와 코드가 같은 이름으로 같은 결정을 가리키게 한다 |
| 배리어블 (Variable) | Figma에서 토큰을 담는 그릇. 이 레포에서 "토큰"과 "배리어블"은 같은 대상을 가리키며, Figma 안을 말할 때 배리어블이라 부른다 |
| 컬렉션 (Collection) | 배리어블 묶음. 모드 축을 하나 가진다 |
| 모드 (Mode) | 같은 토큰이 상황에 따라 다른 값을 갖게 하는 축의 한 값. 예: Light, Dark, Mobile |
| 별칭·참조 (Alias) | 토큰이 값 대신 다른 토큰을 가리키는 것. JSON에서는 `{Color.Gray.12}` |
| 레이어 (Layer) | Foundation, Semantic, Component 세 단계. Figma의 레이어 패널과 구분할 때는 "토큰 레이어"라고 부른다 |
| 스코프 (Scope) | Figma 배리어블이 어떤 속성 피커에 나타날지 정하는 설정 |
| 대상 (Target) | Semantic Color 이름의 첫 자리. 무엇에 칠하는가 (Surface, Fill, Text, Icon, Border) |
| 톤 (Tone) | 의미 계열. Primary, Accent, Danger, Success, Warning |
| 상태 (State) | 사용자 인터랙션으로 바뀌는 모습. Default, Hover, Pressed, Focus, Disabled, Selected |
| 배리언트 (Variant) | Figma 컴포넌트 속성의 한 종류. 상태(State)도 Figma에서는 배리언트로 만들지만 코드에서는 prop이 아니다 (MAP-05) |
| 파트 (Part) | 컴포넌트 해부도의 구성 요소. 레이어 이름과 같다 |
| 짝 (Pair) | 함께 써도 대비가 보장되는 전경-배경 조합 |
| 생성 블록 (GENERATED) | JSON에서 자동으로 만드는 문서 구역. 손으로 고치지 않는다 |
| ADR | Architecture Decision Record. 결정과 그 이유의 기록 |

## 혼동 금지 쌍

| A | B | 구분 |
|---|---|---|
| Surface | Fill | 놓이는 면인가, 누르거나 상태를 가진 요소인가 |
| Mode | Theme | 모드는 Figma 구조, 테마는 그중 Light/Dark 축 하나 |
| State | Variant | 상태는 인터랙션 결과, 배리언트는 Figma의 속성 종류 |
| Text Style | 배리어블 | Text Style은 여러 배리어블을 묶은 조합, 배리어블은 값 하나 |
| Border/Default | Border/Strong | 장식 외곽선인가, 경계를 식별해야 하는가 (3:1) |
| Text/Accent | Text/Link | 강조만 하는가, 누르면 이동하는가 |

<!-- CUSTOMIZE: 팀에서 자주 헷갈리는 용어를 추가한다 -->
