---
name: add-token
type: playbook
status: stable
---

# 플레이북: 토큰 추가

맞는 Semantic 토큰이 없을 때의 절차입니다. 에이전트는 승인을 받기 전까지 Figma에 배리어블을 만들지 않습니다.

## 단계

1. **기존 토큰으로 되는지 확인한다.** [토큰 선택 순서](../tokens/semantic-color.md#토큰-선택-순서)를 처음부터 다시 따라간다. 값으로 찾을 때는 [역조회 표](../tokens/values/foundation.values.md#역조회-하드코딩-정리용)를 본다.
2. **두 곳 이상에서 필요한지 확인한다** (PRN-08). 한 곳뿐이면 기존 토큰으로 수렴시키는 안을 먼저 낸다.
3. **이름을 짓는다.** [naming.md](../naming.md)의 문법과 허용 어휘 안에서. 어휘에 없는 단어가 필요하면 어휘 추가도 함께 제안한다.
4. **제안서를 쓴다.** 아래 형식. 사람에게 승인을 받는다.
5. **Figma에 만든다.** 모든 모드의 alias, 스코프, 설명(=역할 문장), Code syntax를 함께 설정한다.
6. **문서 항목을 추가한다.** 해당 Semantic 문서의 같은 대상(Target) 묶음 안에, 항목 형식 그대로.
7. **내보내고 검사한다.** [sync-from-figma](sync-from-figma.md) 절차 → `npm run tokens:check` 통과.
8. **CHANGELOG의 [Unreleased]에 추가를 기록한다.**

## 제안서 형식

```
토큰 추가 제안
- 이름: Fill/Accent Subtle/Pressed
- 컬렉션: Semantic Color
- 필요한 곳: 필터 칩 눌림 상태, 카테고리 타일 눌림 상태 (2곳)
- 기존 토큰으로 안 되는 이유: Fill/Accent Subtle/Hover와 구분되는 눌림 피드백이 필요
- 역할: `Fill/Accent Subtle/Default`의 눌린 상태
- 쓰지 말 때: 선택이 유지되는 상태 → `Fill/Accent Subtle/Selected`
- 모드별 참조: Light → Color/Blue/5 · Dark → Color/Blue Dark/5
- 짝·대비: (전경 토큰일 때만)
- 스코프: FRAME_FILL, SHAPE_FILL
- 코드: --color-fill-accent-subtle-pressed
```

## 하지 않는 것

- 승인 전에 Figma나 JSON에 만들지 않는다.
- JSON을 직접 고쳐서 추가하지 않는다. 값의 원본은 Figma다 (PRN-01).
- Foundation에 스케일 사이 값을 추가하지 않는다 (FND-03). 꼭 필요하면 ADR을 먼저 쓴다.
