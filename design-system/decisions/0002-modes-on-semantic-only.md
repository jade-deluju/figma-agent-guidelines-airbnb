---
id: ADR-0002
title: 모드는 Semantic에만, 테마와 폭은 컬렉션을 나눈다
status: accepted
date: 2026-10-01
related: [PRN-04, RSP-01, CMP-07]
---

# ADR-0002: 모드는 Semantic에만, 테마와 폭은 컬렉션을 나눈다

## 맥락
테마(Light/Dark)와 화면 폭(Mobile/Tablet/Desktop) 두 축의 전환이 필요하다. Figma 컬렉션 하나는 모드 축을 하나만 가진다.

## 결정
- 모드는 Semantic 레이어에만 둔다. Foundation과 Component에는 모드가 없다.
- 테마는 Semantic Color, 폭은 Semantic Responsive로 컬렉션을 나눈다.

## 이유
- 전환 지점이 하나여야 "어디서 바뀌는가"에 답이 하나다 (PRN-04).
- Foundation에 모드를 두면 `Color/Gray/12`가 모드마다 다른 색이 되어 이름이 값을 설명하지 못한다.
- 두 축을 한 컬렉션에 두면 Light-Mobile 같은 조합 모드 6개가 필요하고, 축이 늘면 곱으로 불어난다.

## 검토한 대안
- Foundation에 Light/Dark 모드 — 팔레트 교체는 쉽지만 Foundation이 결정을 갖게 된다.
- Component에 모드 — 컴포넌트마다 테마 처리가 중복된다.
- 단일 Semantic 컬렉션 + 조합 모드 — 모드 수가 축의 곱으로 늘어난다.

## 결과
- 화면 프레임에 모드를 두 번 적용한다 (테마 하나, 폭 하나).
- Component 토큰은 모드가 없어도 참조한 Semantic을 통해 두 축을 모두 따라간다.
- 다크 팔레트는 `Gray Dark`처럼 별도 스케일로 Foundation에 둔다.
