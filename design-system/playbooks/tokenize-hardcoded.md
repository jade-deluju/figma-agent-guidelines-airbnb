---
name: tokenize-hardcoded
type: playbook
status: stable
---

# 플레이북: 하드코딩 값 토큰화

Figma 화면이나 코드에 남은 원시값(hex, px)을 Semantic 토큰으로 바꾸는 절차입니다.

## 단계

1. **원시값을 모은다.**
   - Figma: 프레임 선택 → Selection colors. 또는 MCP로 `get_variable_defs`와 노드 정보를 읽어 바인딩되지 않은 속성을 찾는다.
   - 코드: `npm run tokens:check -- --src <코드 폴더>` (CHK-15·16)
2. **후보를 찾는다.** [역조회 표](../tokens/values/foundation.values.md#역조회-하드코딩-정리용)에서 값 → Foundation → 그 값을 쓰는 Semantic 목록.
3. **역할로 고른다.** 값이 같다고 같은 토큰이 아니다. [토큰 선택 순서](../tokens/semantic-color.md#토큰-선택-순서)로 "무엇에 칠하는가, 무슨 의미인가"를 판단한다.
   - 예: 흰색은 카드 배경이면 `Surface/Raised`, 강조 버튼 라벨이면 `Text/On Accent`.
4. **매핑표를 쓰고 승인을 받는다.** 아래 형식.
5. **교체한다.** 승인된 행만.
6. **남은 값을 처리한다.** 스케일에 없는 값(예: 15px)은 가장 가까운 토큰으로 맞추자고 제안한다. 맞출 수 없으면 [add-token](add-token.md).
7. **다시 검사한다.** CHK-20(화면) 또는 CHK-15(코드)가 0건인지.

## 매핑표 형식

| 위치 | 원시값 | 판단한 역할 | 바꿀 토큰 | 확신도 |
|---|---|---|---|---|
| Home/Card/Container fill | #ffffff | 바탕 위 카드 | `Surface/Raised` | 높음 |
| Home/Badge/Label | #0b53b0 | 브랜드 강조 텍스트 | `Text/Accent` | 높음 |
| Home/Card padding | 15 | 카드 안쪽 여백 | `Inset/Container` (16) | 중간 — 값이 1 달라짐 |

확신도가 낮거나 값이 달라지는 행은 사람이 결정한다.
