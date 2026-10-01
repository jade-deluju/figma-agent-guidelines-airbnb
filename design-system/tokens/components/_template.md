---
name: component-name            # 파일 이름과 같게 (kebab-case)
layer: component
token_prefix: ComponentName/    # 토큰 이름의 첫 자리
figma_component: ComponentName  # Figma 컴포넌트 세트 이름
status: draft                   # draft → stable
---

<!-- 이 파일은 템플릿입니다. 복사해서 쓰고, 이 주석과 아래 안내 문장은 지웁니다. -->

# ComponentName

## 목적

- 한 문장: 이 컴포넌트는 무엇을 하게 하는가.
- 쓰지 말 때: 비슷하지만 다른 컴포넌트를 써야 하는 경우와 그 대안.

## 해부도

파트 이름 = Figma 레이어 이름 = 토큰의 Part 자리 (CMP-05). 허용 파트는 [naming.md](../../naming.md#허용-어휘)의 `Component Part`.

```
ComponentName
└─ Container
   ├─ Icon
   └─ Label
```

## 프로퍼티 매핑

Figma 프로퍼티 순서: 배리언트 → 텍스트 → 불리언 → 인스턴스 스왑.

| Figma 프로퍼티 | 종류 | 값 | 코드 prop | 비고 |
|---|---|---|---|---|
| Type | Variant | | `variant` | |
| Size | Variant | Sm, Md, Lg | `size` | |
| State | Variant | Default, Hover, Pressed, Focus, Disabled | — | prop 아님 (MAP-05) |

## 형태 기준

참고 레시피: [component-patterns.md](../../component-patterns.md)의 `컴포넌트 이름`. 절차는 [create-component](../../playbooks/create-component.md).

| 지표 (Md) | 범위 | 이 컴포넌트 | 토큰 | 판정 |
|---|---|---|---|---|
| 높이 | | | | |

## 상태 규칙

| 상태 | 무엇이 바뀌나 | 토큰 |
|---|---|---|
| Default | | |
| Hover | | |
| Pressed | | |
| Focus | 채움 유지 + 포커스 링 | `{Component}/Base/Focus Ring/*` |
| Disabled | | |

## 토큰화하지 않는 것

- 토큰이 없는 속성과 그 이유. 예: 그림자는 Effect Style로 관리한다.

## 잘못 쓰는 패턴

- ❌ … → ✅ …

## 토큰 맵

<!-- 배리어블을 만들기 전에는 아래에 "토큰 맵 (제안)" 표를 직접 쓰고 리뷰를 받는다.
     Figma에서 만들고 내보낸 뒤에는 제안 표를 지우고 아래 GENERATED 블록만 남긴다. -->

<!-- GENERATED:START id=token-map — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
<!-- GENERATED:END -->
