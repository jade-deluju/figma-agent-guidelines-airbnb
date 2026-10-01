---
name: principles
layer: all
status: stable
---

# 토큰 설계 원칙

모든 레이어 문서의 규칙은 이 원칙에서 나옵니다. 목록에 없는 상황을 만나면 여기서부터 판단합니다. 새 규칙을 추가할 때도 이 원칙과 충돌하지 않는지 먼저 확인합니다.

## 한눈에 보기

```
Component   Button/Primary/Container/Background/Hover     배선: 어느 부품에 꽂나
    │  (한 단계 아래로만 참조)
    ▼
Semantic    Fill/Primary/Hover      [Light | Dark]         결정: 어디에 쓰나  ← 모드는 여기에만
            Gap/Section             [Mobile | Tablet | Desktop]
    │
    ▼
Foundation  Color/Gray/11 · Color/Gray Dark/11 · Space/32  재료: 무엇이 있나
```

## 원칙

### PRN-01 값과 결정을 분리한다
- 값의 원본은 Figma 배리어블이다. 레포의 `tokens/*.tokens.json`은 Figma에서 내보낸 거울이다.
- 마크다운은 결정(역할, 쓸 때, 쓰지 말 때, 짝)과 절차만 책임진다. 값은 `GENERATED` 블록에만 있고 JSON에서 자동으로 만든다.
- 이유: 값을 문서에 손으로 쓰면 Figma가 바뀔 때 문서가 낡고, AI는 낡은 쪽을 믿는다.
- 위반 예: 문서의 hex를 고쳐서 색을 바꾸려 한다 → Figma에서 바꾸고 내보낸다.

### PRN-02 레이어마다 역할이 하나다
- Foundation은 재료다. 의미가 없다.
- Semantic은 결정이다. "어디에 쓰는가"는 여기서만 정한다.
- Component는 배선이다. 어느 부품의 어느 상태에 어떤 Semantic을 꽂을지만 정하고, 새 결정을 하지 않는다.
- 이유: 결정이 두 레이어에 흩어지면 "왜 이 색인가"에 답할 곳이 두 군데가 된다.

### PRN-03 참조는 한 단계 아래로만 한다
- Component → Semantic → Foundation. 건너뛰기, 거꾸로, 같은 층 참조는 모두 금지다.
- 이유: Component가 Foundation을 바로 참조하면 그 부분만 다크 모드에서 바뀌지 않는다. 같은 층 참조는 한 토큰을 고칠 때 다른 토큰이 따라 바뀌는 사슬을 만든다.

### PRN-04 모드는 Semantic에만 둔다
- 테마(Light/Dark)는 Semantic Color, 폭(Mobile/Tablet/Desktop)은 Semantic Responsive의 모드다.
- Foundation과 Component에는 모드가 없다.
- 이유: 전환 지점이 하나여야 "테마가 어디서 결정되는가"에 답이 하나다. Foundation에 모드가 있으면 `Gray/12`가 모드마다 다른 색이 되어 이름이 의미를 잃는다.

### PRN-05 Semantic 이상은 외형이 아니라 역할로 이름 짓는다
- 이유: 리브랜딩으로 파란 버튼이 초록이 되면 `Blue Button`은 거짓말이 된다. AI는 이름을 믿고 판단한다.

### PRN-06 화면과 코드에 원시값을 쓰지 않는다
- 색, 간격, 모서리, 크기, 글자 속성은 모두 토큰을 거친다.
- 이유: 원시값은 테마와 반응형 전환에서 빠지고, 어떤 결정에서 나왔는지 추적할 수 없다.

### PRN-07 없는 토큰은 만들지 않고 제안한다
- 어휘와 토큰 목록은 닫혀 있다. 맞는 토큰이 없으면 멈추고 [add-token 절차](playbooks/add-token.md)의 형식으로 제안한다.
- 이유: 그럴듯한 이름을 지어내는 것이 AI의 가장 위험한 습관이다. 지어낸 토큰은 다른 화면에서 다른 이름으로 또 생긴다.

### PRN-08 새 역할이 두 곳 이상에서 필요할 때만 추가한다
- 한 곳만을 위한 값이면 기존 토큰으로 수렴시키거나 디자인을 다시 본다.
- 이유: 토큰 수가 늘수록 선택이 어려워지고, 선택이 어려우면 AI의 결과가 흔들린다.

### PRN-09 규칙은 도구 설정으로도 강제한다
- 문서 규칙 + Figma 설정(스코프, 발행 숨김) + 자동 검사(`npm run tokens:check`) 세 겹으로 둔다.
- 문서의 스코프·역할 문장은 Figma 변수의 스코프·설명과 같아야 한다.
- 이유: 문서만으로는 지켜지지 않는다. 피커에 나타나지 않는 토큰은 고를 수 없다.

### PRN-10 결정에는 기록을 남긴다
- 관습과 다른 결정, 되돌리기 어려운 결정은 [decisions/](decisions/)에 ADR로 남긴다. 이름 변경과 폐기는 [CHANGELOG.md](CHANGELOG.md)에 남긴다.
- 이유: 이유가 기록되지 않은 비관습적 결정은 언젠가 AI나 새 팀원에게 "수정"당한다.
