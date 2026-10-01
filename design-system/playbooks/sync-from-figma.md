---
name: sync-from-figma
type: playbook
status: stable
---

# 플레이북: Figma → 레포 동기화

Figma에서 배리어블을 바꾼 뒤 레포의 JSON과 문서를 맞추는 절차입니다. 값의 원본은 Figma이므로 JSON을 직접 고치지 않습니다 (PRN-01).

## 단계

1. **Figma에서 내보낸다.** 컬렉션별, 모드별로 DTCG JSON을 내보낸다.
   - Figma의 배리어블 내보내기 기능, 또는 같은 형식을 내보내는 플러그인·REST API를 쓴다. 메뉴 위치는 Figma 버전에 따라 다를 수 있으니 Figma 도움말을 확인한다.
2. **이름 규칙대로 저장한다.** `tokens/{컬렉션}.{모드}.tokens.json` ([파일 이름 규칙](../tokens/README.md#파일-이름-규칙)). 기존 파일을 덮어쓴다.
3. **`npm run tokens:sync`** — 문서의 GENERATED 블록이 새 값으로 바뀐다.
4. **`git diff`로 바뀐 내용을 본다.** 의도한 변경만 있는지 확인한다. 특히 모드별 참조표와 짝 대비 표.
5. **`npm run tokens:check`** — 실패하면 Figma에서 고치고 1단계부터 다시 한다.
   - CHK-08 "항목 없음": Figma에 새 배리어블이 생겼다. 문서 항목을 추가한다.
   - CHK-08 "유령 항목": Figma에서 배리어블이 사라졌다. 의도한 삭제인지 확인한다 ([rename-deprecate](rename-deprecate.md)).
   - CHK-11: Figma의 스코프나 설명이 문서와 다르다. 어느 쪽이 맞는지 정해 한쪽을 고친다.
6. **`npm run tokens:build`** — `dist/tokens.css`를 다시 만든다.
7. **CHANGELOG에 기록하고 커밋한다.** PR 템플릿의 체크 항목을 채운다.

## 키트의 샘플 JSON에 대해

- `tokens/`의 샘플은 DTCG 형식으로 미리 만든 값이다. 처음에는 이 값을 보고 Figma에 배리어블을 만들거나, Figma 가져오기 기능이 이 형식을 지원하면 가져와서 시작할 수 있다.
- 실제 Figma 내보내기는 표기 방식이 조금 다를 수 있다 (예: 치수가 `{value, unit}` 대신 단위 없는 숫자, 글꼴이 문자열). 스크립트는 두 형식을 모두 읽는다. 단위 없는 숫자는 이름에 `Weight`가 있으면 굵기, `Opacity`가 있으면 비율, 그 밖에는 px로 읽는다.
- 파일 하나에 여러 모드가 함께 들어 있는 형식으로 내보내졌다면, 모드별 파일로 나누거나 스크립트의 `loadTokens`를 그 형식에 맞게 고친다.

<!-- CUSTOMIZE: 팀이 실제로 쓰는 내보내기 방법(메뉴 경로, 플러그인 이름)이 정해지면 1단계를 구체적으로 바꾼다 -->
