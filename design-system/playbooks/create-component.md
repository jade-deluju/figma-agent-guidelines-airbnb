---
name: create-component
type: playbook
status: stable
---

# 플레이북: 컴포넌트 만들기

컴포넌트 제작 요청을 받았을 때의 절차입니다. 형태를 추측하지 않고, 모범 사례 레시피에서 규격을 계산한 뒤 승인을 받고 만듭니다.

## 단계

1. **레시피를 찾는다.** [component-patterns.md](../component-patterns.md)의 목록에서 같은 컴포넌트를 찾는다. 없으면 구조가 가장 가까운 컴포넌트를 고른다 (PAT-01).
2. **문서 초안을 만든다.** `tokens/components/_template.md`를 복사해 목적, 해부도, 프로퍼티 매핑을 쓴다. 해부도의 흐름과 Resizing은 레시피의 "구조"를 따른다.
3. **규격표를 계산한다.** 크기 등급마다 높이, 패딩, 간격, 최소 너비, 글자·아이콘 크기를 정한다.
   - Md 값은 `density`에 맞는 범위 안의 스케일 값에서 고른다 (PAT-02·03).
   - Sm·Lg는 Md에서 한 단계씩 바꾼다 (PAT-04).
   - 같은 등급 입력 컨트롤과 높이를 맞춘다 (PAT-05).
4. **형태 기준 표를 채우고 승인을 받는다.** 아래 형식. 범위를 벗어난 값은 이유를 적고 ADR 초안을 함께 낸다 (PAT-07).
5. **토큰을 도출한다.** [derive-component-tokens](derive-component-tokens.md) 절차. 규격표의 값은 모두 Semantic 토큰을 거친다. 맞는 토큰이 없으면 [add-token](add-token.md).
6. **Figma에 만든다.** [figma-properties.md](../figma-properties.md)의 규칙을 따른다. 특히 너비 Hug + Min width, 높이 Fixed(토큰), 라벨 Auto width.
7. **측정해서 검사한다.**
   - MCP로 각 배리언트의 실제 너비·높이를 읽어 형태 기준 표와 비교한다.
   - 가장 짧은 라벨과 가장 긴 라벨을 넣어 본다.
   - 스크린샷으로 한 번 더 확인한다.
   - [component-patterns 점검표](../component-patterns.md#점검표)(CHK-70~75)와 [figma-properties 점검표](../figma-properties.md#점검표)를 실행한다.
8. **고치고 보고한다.** 실패 항목을 고친 뒤 checklist.md 보고 형식으로 보고한다.

## 형태 기준 표 형식

컴포넌트 문서의 "형태 기준" 섹션에 둔다. 범위는 `density`에 맞는 열을 옮겨 적는다.

| 지표 (Md) | 범위 | 이 컴포넌트 | 토큰 | 판정 |
|---|---|---|---|---|
| 높이 | 32–48 | 40 | `Control Height/Md` | ✅ |
| 좌우 패딩 ÷ 높이 | 0.34–0.52 | 0.40 | `Inset/Md` | ✅ |
| 최소 너비 ÷ 높이 | 1.54–2.31 | 2.00 | `Control Min Width/Md` | ✅ |

## 하지 않는 것

- 레시피를 확인하기 전에 크기를 정하지 않는다.
- 버튼류를 Fixed 너비로 만들지 않는다. 라벨 길이에 따라 Hug로 늘고, 짧을 때는 Min width가 형태를 지킨다.
- 범위를 맞추려고 스케일 밖 값을 만들지 않는다 (FND-03).
