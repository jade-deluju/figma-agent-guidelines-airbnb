---
name: components-index
layer: component
collection: Component
modes: [Default]
references: [semantic-color, semantic-responsive]
status: stable
---

# Component 토큰

컴포넌트의 각 파트, 각 상태에 어떤 Semantic 토큰을 꽂는지 정하는 배선 레이어입니다. 새 결정은 하지 않습니다.

## 규칙

- **[CMP-01] MUST** Component 토큰은 Semantic만 참조한다.
  - 이유: Foundation을 바로 참조하면 그 부분만 다크 모드와 반응형에서 빠진다.
- **[CMP-02] MUST** 컴포넌트의 모든 파트·속성·상태를 토큰화한다. 값이 Semantic과 같아 보여도 만든다.
  - 이유: 컴포넌트만 따로 조정해야 할 때 화면 전체가 아니라 그 컴포넌트만 바뀌어야 한다. AI는 토큰이 없는 속성을 원시값으로 채운다.
  - 키보드 포커스는 별도 상태 토큰 대신 `Focus Ring` 파트 토큰으로 표현한다 (SEM-06).
- **[CMP-03] MUST NOT** 새 결정을 만들지 않는다. 맞는 Semantic이 없으면 Semantic부터 제안한다.
  - 이유: Component에서 결정하면 같은 결정이 다른 컴포넌트에서 다른 값으로 반복된다.
- **[CMP-04] MUST** 이름은 `{Component}/`로 시작하고 NAM-06 문법을 따른다.
- **[CMP-05] MUST** 해부도의 파트 이름 = Figma 레이어 이름 = 토큰의 Part 자리. 세 곳이 같은 단어다.
  - 이유: AI가 레이어를 읽고 토큰을 찾을 때, 코드를 쓸 때 같은 단어로 연결된다.
- **[CMP-06] MUST NOT** 인스턴스에서 토큰이 바인딩된 속성을 덮어쓰지 않는다. 다른 모습이 필요하면 배리언트를 추가한다.
- **[CMP-07] MUST NOT** Component 컬렉션에 모드를 두지 않는다. 테마와 폭은 참조한 Semantic이 따라간다.

## 컴포넌트 목록

`npm run tokens:check`는 이 폴더의 문서(README와 `_`로 시작하는 파일 제외)가 아래 표에 있는지 확인한다.

| 컴포넌트 | 문서 | 토큰 접두어 | 상태 |
|---|---|---|---|
| Button | [button.md](button.md) | `Button/` | stable |

<!-- CUSTOMIZE: 컴포넌트를 추가할 때마다 _template.md를 복사해 문서를 만들고 이 표에 행을 추가한다 -->

## 새 컴포넌트 추가

0. [component-patterns.md](../../component-patterns.md)에서 레시피를 찾는다. 전체 절차는 [create-component](../../playbooks/create-component.md).
1. `_template.md`를 `{컴포넌트 kebab-case}.md`로 복사하고 프런트매터의 `token_prefix`를 채운다.
2. 목적, 해부도, 프로퍼티 매핑, 형태 기준, 상태 규칙을 쓴다.
3. [derive-component-tokens](../../playbooks/derive-component-tokens.md) 절차로 토큰 설계표를 만들고 Figma에 배리어블을 만든다.
4. 내보내기 → `npm run tokens:sync`로 토큰 맵이 채워지는지 확인 → `npm run tokens:check`
5. 이 표에 행을 추가하고 CHANGELOG에 기록한다.
