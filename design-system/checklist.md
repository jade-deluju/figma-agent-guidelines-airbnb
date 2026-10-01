---
name: checklist
layer: all
status: stable
---

# 검증 체크리스트

작업을 끝냈다고 보고하기 전에 이 문서로 검증합니다. 자동 항목은 `npm run tokens:check`가 같은 ID로 결과를 출력합니다. 수동 항목은 Figma 화면이나 MCP로 확인합니다.

## A. 자동 — 토큰과 문서 (`npm run tokens:check`)

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-01 | Foundation은 원시값만 가진다 | FND-04 |
| CHK-02 | Semantic은 Foundation만 참조한다 | SEM-02, RSP-02 |
| CHK-03 | Component는 Semantic만 참조한다 | CMP-01 |
| CHK-04 | 끊어진 참조, 순환 참조, 이름 규칙 밖의 토큰 파일이 없다 | PRN-03 |
| CHK-05 | Semantic 토큰이 컬렉션의 모든 모드에 값을 가진다 | SEM-04 |
| CHK-06 | 이름이 문법과 허용 어휘를 따르고, Semantic 이름에 외형 표현이 없다 | NAM-02~09, SEM-03 |
| CHK-07 | 컬렉션끼리 최상위 그룹 이름이 겹치지 않는다 | NAM-03 |
| CHK-08 | 문서 항목과 JSON 토큰이 1:1이고 필수 필드가 있다. 컴포넌트 문서와 목록이 맞다 | PRN-01 |
| CHK-09 | 전경 토큰이 모든 모드에서 짝 대비 기준을 넘는다 | SEM-05 |
| CHK-10 | 문서의 코드 이름이 변환 규칙과 같다 | MAP-01 |
| CHK-11 | 문서의 스코프·역할이 Figma 스코프·설명과 같다 | PRN-09 |
| CHK-12 | Foundation이 발행 숨김이고 스코프가 비어 있다 (경고) | FND-02 |
| CHK-13 | 폐기 예정 토큰을 참조하지 않는다 (경고) | PRN-10 |
| CHK-14 | GENERATED 블록이 최신이다 | PRN-01 |
| CHK-17 | 치수 값의 단위가 px 또는 rem이다 (em·% 등은 오류). 줄 높이가 4 미만이면 배수를 px로 잘못 넣었을 가능성으로 경고한다 | FIG-91·95 |

## B. 자동 — 코드 (`npm run tokens:check -- --src <코드 폴더>`)

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-15 | 원시 색값(hex, rgb)이 없다 | PRN-06 |
| CHK-16 | `--fnd-*` 변수를 직접 쓰지 않는다 | FND-01 |

## C. 수동 — Figma 화면

| ID | 확인 내용 | 확인 방법 | 근거 |
|---|---|---|---|
| CHK-20 | 화면에 변수가 아닌 색이 없다 | 프레임 선택 → 오른쪽 패널 Selection colors에 hex가 남아 있는지 | PRN-06 |
| CHK-21 | 오토 레이아웃 간격·여백, 모서리, 크기가 변수에 바인딩되어 있다 | 레이어 선택 → 숫자 칸이 변수 표시인지. MCP `get_variable_defs` 결과에 원시값이 없는지 | RSP-04 |
| CHK-22 | 화면 프레임에 폭에 맞는 Semantic Responsive 모드가 적용되어 있다 | 프레임 선택 → Layer 패널의 모드 표시 | RSP-03 |
| CHK-23 | 전경-배경 조합이 문서의 `짝` 목록 안에 있다 | 텍스트·아이콘이 놓인 면의 토큰 확인 | SEM-05 |
| CHK-24 | 컴포넌트 인스턴스에서 바인딩된 속성을 덮어쓰지 않았다 | 인스턴스 선택 → 덮어쓴 속성 표시 확인, "Reset all changes"로 차이 확인 | CMP-06 |
| CHK-25 | 포커스 상태가 채움이 아니라 링으로 표현되어 있다 | Focus 배리언트 확인 | SEM-06 |
| CHK-26 | 모든 텍스트가 Text Style을 쓰고, Text Style이 바인딩 표의 변수로 구성되어 있다 | 텍스트 선택 → 스타일 이름 표시 | RSP-05 |
| CHK-27 | 컴포넌트의 레이어 이름이 문서 해부도의 파트 이름과 같다 | 레이어 패널 | CMP-05 |
| CHK-28 | Light/Dark 모드를 바꿔도 깨지는 화면이 없다 | 프레임 모드를 Dark로 바꿔 확인 | SEM-04 |

## D. 수동 — 코드

| ID | 확인 내용 | 근거 |
|---|---|---|
| CHK-30 | Figma State 배리언트를 prop으로 만들지 않았다 | MAP-05 |
| CHK-31 | 다크 모드가 `data-theme` 전환만으로 동작한다 | MAP-03 |
| CHK-32 | 컴포넌트 토큰이 있는 속성은 컴포넌트 토큰 변수를 쓴다 | 코드 매핑의 쓰는 순서 |

## E. 수동 — Figma 디자인 속성 (CHK-40~69)

구조, 오토 레이아웃, Constraints, 겉보기, 텍스트, 단위, 컴포넌트 사용을 검사하는 항목은 [figma-properties.md의 점검표](figma-properties.md#점검표)에 있다. 화면이나 컴포넌트를 만든 작업이면 C와 함께 반드시 검사한다.

## F. 수동 — 컴포넌트 형태 (CHK-70~75)

컴포넌트를 만들거나 고친 작업이면 [component-patterns.md의 점검표](component-patterns.md#점검표)도 검사한다.

## 보고 형식

에이전트는 작업을 마치면 아래 형식으로 보고한다. 실패 항목은 고치기 전에 목록으로 보여주고 승인을 받는다.

```
검증 결과
- 자동: CHK-01~14·17 Pass (오류 0, 경고 0)
- 수동: CHK-20 Pass · CHK-21 Fail (Card/Container의 padding 16이 원시값) · CHK-22 해당 없음
- Figma 속성: CHK-40~69 중 Fail 2 — CHK-47 (Home/Item List 폭이 Fixed 343) · CHK-61 (Item Card/Title이 Fixed size 텍스트)
- 수정 제안: Card/Container padding → Inset/Container · Item List 폭 → Fill · Title → Fill + Auto height, Max lines 2
```

<!-- CUSTOMIZE: 팀에서 반복되는 실수가 생기면 C·D에 항목을 추가한다. 번호는 다시 매기지 않고 뒤에 붙인다 -->
