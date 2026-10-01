---
name: derive-component-tokens
type: playbook
status: stable
---

# 플레이북: 컴포넌트 토큰 도출

컴포넌트 문서(해부도, 프로퍼티, 상태 규칙)에서 Component 토큰 설계표를 만들고 Figma에 배리어블로 옮기는 절차입니다.

## 입력

- `design-system/tokens/components/{컴포넌트}.md`의 해부도, 프로퍼티 매핑, 상태 규칙
- [components/README.md](../tokens/components/README.md)의 CMP 규칙

## 단계

1. **행렬을 만든다.** 행 = 파트 × 속성, 열 = 그 속성이 의존하는 배리언트 값(Type 또는 Size) × 상태.
   - 색 속성은 보통 Type과 State에 의존한다.
   - 크기 속성은 보통 Size에만 의존한다.
   - 어디에도 의존하지 않는 속성은 Variant 자리에 `Base`.
2. **칸마다 Semantic 토큰을 고른다.** 상태별 채움은 [상태 파생 규칙](../tokens/semantic-color.md#상태-파생-규칙)으로 이미 Semantic에 있다.
3. **고를 수 없는 칸이 있으면 멈춘다.** Component에서 새 값을 정하지 않는다 (CMP-03). [add-token](add-token.md)으로 Semantic을 먼저 제안한다.
4. **이름을 짓는다.** `{Component}/{Variant}/{Part}/{Property}[/{State}]` (NAM-06). Part는 해부도의 레이어 이름과 같은 단어 (CMP-05).
5. **설계표를 컴포넌트 문서의 "토큰 맵 (제안)"에 쓰고 승인을 받는다.**
6. **Figma Component 컬렉션에 만든다.** 모드 없음 (CMP-07). 스코프는 속성에 맞는 하나 (예: Background → Frame fill).
7. **컴포넌트의 모든 배리언트 레이어에 바인딩한다.** 바인딩 후 배리언트를 하나씩 눌러 원시값이 남았는지 확인한다 (CHK-21).
8. **내보내고 동기화한다.** `npm run tokens:sync`가 문서의 GENERATED 토큰 맵을 채운다. "토큰 맵 (제안)" 표는 지운다.
9. **`npm run tokens:check` 통과, CHANGELOG 기록.**

## 설계표 형식

| 토큰 | 파트 | 속성 | 상태 | → Semantic |
|---|---|---|---|---|
| `Button/Primary/Container/Background/Default` | Container | Background | Default | `Fill/Primary/Default` |
| `Button/Primary/Container/Background/Hover` | Container | Background | Hover | `Fill/Primary/Hover` |
| `Button/Md/Container/Height` | Container | Height | — | `Control Height/Md` |
| `Button/Base/Focus Ring/Color` | Focus Ring | Color | — | `Border/Focus` |

## 점검

- 값이 같은 칸도 모두 토큰을 만들었는가 (CMP-02)
- Disabled 칸이 모든 Type에서 같은 Semantic을 가리키는가
- Focus 상태를 채움 토큰으로 만들지 않았는가 (SEM-06)
