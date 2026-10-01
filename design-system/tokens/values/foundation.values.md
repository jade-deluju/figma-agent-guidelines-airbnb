---
name: foundation-values
layer: foundation
generated: true
---

# Foundation 값 표

전부 `npm run tokens:sync`가 만든다. 규칙과 설명은 [foundation.md](../foundation.md).

## 색 스케일

<!-- GENERATED:START id=foundation-colors — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
| 스케일 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gray | #fdfdfd | #f9f9f9 | #f2f2f3 | #ececec | #e5e5e6 | #dcdddd | #d0d1d2 | #bdbebf | #727578 | #67696c | #515355 | #1a1b1c |
| Gray Dark | #111212 | #171717 | #202021 | #272828 | #2e2f30 | #38393a | #48494a | #5f6062 | #7e8084 | #909296 | #b9bbbd | #eeeeef |
| Blue | #fcfdff | #f6f9fe | #ecf3fd | #e3edfc | #d8e6fb | #ccdef9 | #bbd3f7 | #9cc0f5 | #156cdd | #005dca | #0b53b0 | #0f2d58 |
| Blue Dark | #0c121a | #101722 | #142134 | #162841 | #1a2f4e | #20395e | #2a4977 | #3460a0 | #005dca | #1069da | #95c0ff | #e0ecff |
| Red | #fffcfc | #fef7f6 | #fdefed | #fce7e4 | #fbddd9 | #f9d2cd | #f6c3bc | #f2a89e | #d02c2a | #be1219 | #a51f1e | #551915 |
| Red Dark | #1a0e0d | #221211 | #331815 | #3f1c18 | #4b201c | #5a2823 | #72332e | #994139 | #be1219 | #cc2827 | #ff968a | #ffe0db |
| Green | #fcfdfc | #f7faf7 | #edf5ee | #e4f0e5 | #d9ebdc | #cde4d1 | #bcdbc1 | #9dcba6 | #20a04e | #009041 | #007131 | #0e3a1c |
| Green Dark | #0d140e | #101a12 | #142517 | #162e1c | #1a3621 | #204228 | #295434 | #326f42 | #009342 | #20a04e | #87d297 | #d9f3dd |
| Amber | #fefcfb | #fbf9f5 | #f8f1e9 | #f4ebde | #f1e3d1 | #ebdac3 | #e5cdae | #dab788 | #fbac16 | #eba000 | #865900 | #4a2f00 |
| Amber Dark | #161109 | #1d160c | #2b1e0b | #35240b | #3f2b0b | #4c340d | #604213 | #81570c | #f4a500 | #ffb334 | #fdc677 | #ffefdb |
| Black Alpha | #000000 1.2% | #000000 2.7% | #000000 4.7% | #000000 7.1% | #000000 9% | #000000 11.4% | #000000 14.1% | #000000 22% | #000000 44% | #000000 48% | #000000 56% | #000000 90% |

| 토큰 | 값 |
|---|---|
| `Color/White` | #ffffff |
| `Color/Black` | #000000 |
<!-- GENERATED:END -->

## 치수·타이포

<!-- GENERATED:START id=foundation-dimensions — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
| 그룹 | 토큰 (이름이 곧 px 값, 다른 경우만 = 표기) |
|---|---|
| `Space` | 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 |
| `Size` | 16, 20, 24, 32, 40, 44, 48, 64, 80, 96 |
| `Radius` | 0, 4, 8, 12, 16, 24, Full = 9999px |
| `Stroke` | 1, 2 |
| `Type/Size` | 12, 13, 14, 16, 18, 20, 24, 28, 32, 40 |
| `Type/Line Height` | 16, 18, 20, 24, 28, 32, 36, 40, 48 |
| `Type/Family` | Sans = Pretendard |
| `Type/Weight` | Regular = 400, Medium = 500, Semibold = 600, Bold = 700 |
| `Breakpoint` | Tablet = 768px, Desktop = 1280px |
<!-- GENERATED:END -->

## 역조회 (하드코딩 정리용)

화면이나 코드에서 원시값을 발견했을 때 쓴다. 세 번째 열의 Semantic 토큰으로 바꾼다. Foundation 토큰으로 바꾸지 않는다 (FND-01). 같은 값에 Semantic이 여러 개면 [토큰 선택 순서](../semantic-color.md#토큰-선택-순서)로 역할을 정한다.

<!-- GENERATED:START id=foundation-reverse — tokens/*.tokens.json에서 생성됨. 직접 수정하지 말고 npm run tokens:sync -->
| 원시값 | Foundation | 이 값을 쓰는 Semantic (모드) |
|---|---|---|
| #fdfdfd | `Color/Gray/1` | `Surface/Default` (Light), `Text/Inverse` (Light), `Icon/Inverse` (Light) |
| #f9f9f9 | `Color/Gray/2` | `Surface/Subtle` (Light) |
| #f2f2f3 | `Color/Gray/3` | `Fill/Primary Subtle/Default` (Light), `Fill/Disabled` (Light) |
| #ececec | `Color/Gray/4` | `Fill/Primary Subtle/Hover` (Light) |
| #e5e5e6 | `Color/Gray/5` | `Fill/Primary Subtle/Selected` (Light) |
| #dcdddd | `Color/Gray/6` | `Border/Subtle` (Light) |
| #d0d1d2 | `Color/Gray/7` | `Border/Default` (Light) |
| #bdbebf | `Color/Gray/8` | `Text/Disabled` (Light), `Icon/Disabled` (Light) |
| #727578 | `Color/Gray/9` | `Border/Strong` (Light) |
| #67696c | `Color/Gray/10` | `Fill/Primary/Pressed` (Light), `Text/Tertiary` (Light) |
| #515355 | `Color/Gray/11` | `Fill/Primary/Hover` (Light), `Text/Secondary` (Light), `Icon/Secondary` (Light) |
| #1a1b1c | `Color/Gray/12` | `Surface/Inverse` (Light), `Fill/Primary/Default` (Light), `Text/Primary` (Light), `Icon/Primary` (Light) |
| #111212 | `Color/Gray Dark/1` | `Surface/Default` (Dark), `Text/Inverse` (Dark), `Text/On Primary` (Dark), `Icon/Inverse` (Dark), `Icon/On Primary` (Dark) |
| #171717 | `Color/Gray Dark/2` | `Surface/Subtle` (Dark), `Surface/Raised` (Dark) |
| #202021 | `Color/Gray Dark/3` | `Surface/Overlay` (Dark), `Fill/Primary Subtle/Default` (Dark), `Fill/Disabled` (Dark) |
| #272828 | `Color/Gray Dark/4` | `Fill/Primary Subtle/Hover` (Dark) |
| #2e2f30 | `Color/Gray Dark/5` | `Fill/Primary Subtle/Selected` (Dark) |
| #38393a | `Color/Gray Dark/6` | `Border/Subtle` (Dark) |
| #48494a | `Color/Gray Dark/7` | `Border/Default` (Dark) |
| #5f6062 | `Color/Gray Dark/8` | `Text/Disabled` (Dark), `Icon/Disabled` (Dark) |
| #7e8084 | `Color/Gray Dark/9` | `Border/Strong` (Dark) |
| #909296 | `Color/Gray Dark/10` | `Fill/Primary/Pressed` (Dark), `Text/Tertiary` (Dark) |
| #b9bbbd | `Color/Gray Dark/11` | `Fill/Primary/Hover` (Dark), `Text/Secondary` (Dark), `Icon/Secondary` (Dark) |
| #eeeeef | `Color/Gray Dark/12` | `Surface/Inverse` (Dark), `Fill/Primary/Default` (Dark), `Text/Primary` (Dark), `Icon/Primary` (Dark) |
| #ecf3fd | `Color/Blue/3` | `Fill/Accent Subtle/Default` (Light) |
| #e3edfc | `Color/Blue/4` | `Fill/Accent Subtle/Hover` (Light) |
| #d8e6fb | `Color/Blue/5` | `Fill/Accent Subtle/Selected` (Light) |
| #156cdd | `Color/Blue/9` | `Fill/Accent/Default` (Light), `Border/Focus` (Light), `Border/Accent` (Light) |
| #005dca | `Color/Blue/10` | `Fill/Accent/Hover` (Light) |
| #0b53b0 | `Color/Blue/11` | `Fill/Accent/Pressed` (Light), `Text/Accent` (Light), `Text/Link` (Light), `Icon/Accent` (Light) |
| #142134 | `Color/Blue Dark/3` | `Fill/Accent Subtle/Default` (Dark) |
| #162841 | `Color/Blue Dark/4` | `Fill/Accent Subtle/Hover` (Dark) |
| #1a2f4e | `Color/Blue Dark/5` | `Fill/Accent Subtle/Selected` (Dark) |
| #3460a0 | `Color/Blue Dark/8` | `Fill/Accent/Pressed` (Dark) |
| #005dca | `Color/Blue Dark/9` | `Fill/Accent/Default` (Dark) |
| #1069da | `Color/Blue Dark/10` | `Fill/Accent/Hover` (Dark) |
| #95c0ff | `Color/Blue Dark/11` | `Text/Accent` (Dark), `Text/Link` (Dark), `Icon/Accent` (Dark), `Border/Focus` (Dark), `Border/Accent` (Dark) |
| #fdefed | `Color/Red/3` | `Fill/Danger Subtle/Default` (Light) |
| #d02c2a | `Color/Red/9` | `Fill/Danger/Default` (Light), `Border/Danger` (Light) |
| #be1219 | `Color/Red/10` | `Fill/Danger/Hover` (Light) |
| #a51f1e | `Color/Red/11` | `Fill/Danger/Pressed` (Light), `Text/Danger` (Light), `Icon/Danger` (Light) |
| #331815 | `Color/Red Dark/3` | `Fill/Danger Subtle/Default` (Dark) |
| #994139 | `Color/Red Dark/8` | `Fill/Danger/Pressed` (Dark) |
| #be1219 | `Color/Red Dark/9` | `Fill/Danger/Default` (Dark) |
| #cc2827 | `Color/Red Dark/10` | `Fill/Danger/Hover` (Dark) |
| #ff968a | `Color/Red Dark/11` | `Text/Danger` (Dark), `Icon/Danger` (Dark), `Border/Danger` (Dark) |
| #edf5ee | `Color/Green/3` | `Fill/Success Subtle/Default` (Light) |
| #007131 | `Color/Green/11` | `Text/Success` (Light), `Icon/Success` (Light) |
| #142517 | `Color/Green Dark/3` | `Fill/Success Subtle/Default` (Dark) |
| #87d297 | `Color/Green Dark/11` | `Text/Success` (Dark), `Icon/Success` (Dark) |
| #f8f1e9 | `Color/Amber/3` | `Fill/Warning Subtle/Default` (Light) |
| #865900 | `Color/Amber/11` | `Text/Warning` (Light), `Icon/Warning` (Light) |
| #2b1e0b | `Color/Amber Dark/3` | `Fill/Warning Subtle/Default` (Dark) |
| #fdc677 | `Color/Amber Dark/11` | `Text/Warning` (Dark), `Icon/Warning` (Dark) |
| #ffffff | `Color/White` | `Surface/Raised` (Light), `Surface/Overlay` (Light), `Text/On Primary` (Light), `Text/On Accent` (Dark), `Text/On Accent` (Light), `Text/On Danger` (Dark), `Text/On Danger` (Light), `Icon/On Primary` (Light), `Icon/On Accent` (Dark), `Icon/On Accent` (Light), `Icon/On Danger` (Dark), `Icon/On Danger` (Light) |
| #000000 4.7% | `Color/Black Alpha/3` | `Shadow/Raised` (Light) |
| #000000 11.4% | `Color/Black Alpha/6` | `Shadow/Overlay` (Light) |
| #000000 14.1% | `Color/Black Alpha/7` | `Shadow/Raised` (Dark) |
| #000000 44% | `Color/Black Alpha/9` | `Overlay/Scrim` (Light), `Shadow/Overlay` (Dark) |
| #000000 48% | `Color/Black Alpha/10` | `Overlay/Scrim` (Dark) |
| 4px | `Space/4` | `Gap/Inline Tight` (Desktop), `Gap/Inline Tight` (Mobile), `Gap/Inline Tight` (Tablet) |
| 8px | `Space/8` | `Gap/Inline` (Desktop), `Gap/Inline` (Mobile), `Gap/Inline` (Tablet) |
| 12px | `Space/12` | `Gap/Stack` (Mobile), `Gap/Stack` (Tablet), `Inset/Sm` (Desktop), `Inset/Sm` (Mobile), `Inset/Sm` (Tablet) |
| 16px | `Space/16` | `Margin/Page` (Mobile), `Gap/Stack` (Desktop), `Inset/Md` (Desktop), `Inset/Md` (Mobile), `Inset/Md` (Tablet), `Inset/Container` (Mobile) |
| 20px | `Space/20` | `Inset/Lg` (Desktop), `Inset/Lg` (Mobile), `Inset/Lg` (Tablet), `Inset/Container` (Tablet) |
| 24px | `Space/24` | `Margin/Page` (Tablet), `Inset/Container` (Desktop) |
| 32px | `Space/32` | `Margin/Page` (Desktop), `Gap/Section` (Mobile) |
| 40px | `Space/40` | `Gap/Section` (Tablet) |
| 48px | `Space/48` | `Gap/Section` (Desktop) |
| 16px | `Size/16` | `Icon Size/Sm` (Desktop), `Icon Size/Sm` (Mobile), `Icon Size/Sm` (Tablet) |
| 20px | `Size/20` | `Icon Size/Md` (Desktop), `Icon Size/Md` (Mobile), `Icon Size/Md` (Tablet) |
| 24px | `Size/24` | `Icon Size/Lg` (Desktop), `Icon Size/Lg` (Mobile), `Icon Size/Lg` (Tablet) |
| 32px | `Size/32` | `Control Height/Sm` (Desktop), `Control Height/Sm` (Mobile), `Control Height/Sm` (Tablet) |
| 40px | `Size/40` | `Control Height/Md` (Desktop), `Control Height/Md` (Mobile), `Control Height/Md` (Tablet) |
| 44px | `Size/44` | `Hit Area/Min` (Desktop), `Hit Area/Min` (Mobile), `Hit Area/Min` (Tablet) |
| 48px | `Size/48` | `Control Height/Lg` (Desktop), `Control Height/Lg` (Mobile), `Control Height/Lg` (Tablet) |
| 64px | `Size/64` | `Control Min Width/Sm` (Desktop), `Control Min Width/Sm` (Mobile), `Control Min Width/Sm` (Tablet) |
| 80px | `Size/80` | `Control Min Width/Md` (Desktop), `Control Min Width/Md` (Mobile), `Control Min Width/Md` (Tablet) |
| 96px | `Size/96` | `Control Min Width/Lg` (Desktop), `Control Min Width/Lg` (Mobile), `Control Min Width/Lg` (Tablet) |
| 8px | `Radius/8` | `Corner/Control` (Desktop), `Corner/Control` (Mobile), `Corner/Control` (Tablet) |
| 12px | `Radius/12` | `Corner/Container` (Desktop), `Corner/Container` (Mobile), `Corner/Container` (Tablet) |
| 16px | `Radius/16` | `Corner/Sheet` (Desktop), `Corner/Sheet` (Tablet) |
| 24px | `Radius/24` | `Corner/Sheet` (Mobile) |
| 9999px | `Radius/Full` | `Corner/Pill` (Desktop), `Corner/Pill` (Mobile), `Corner/Pill` (Tablet) |
| 1px | `Stroke/1` | `Border Width/Default` (Desktop), `Border Width/Default` (Mobile), `Border Width/Default` (Tablet) |
| 2px | `Stroke/2` | `Border Width/Focus Ring` (Desktop), `Border Width/Focus Ring` (Mobile), `Border Width/Focus Ring` (Tablet) |
| 12px | `Type/Size/12` | `Font Size/Caption` (Desktop), `Font Size/Caption` (Mobile), `Font Size/Caption` (Tablet) |
| 13px | `Type/Size/13` | `Font Size/Label Sm` (Desktop), `Font Size/Label Sm` (Mobile), `Font Size/Label Sm` (Tablet) |
| 14px | `Type/Size/14` | `Font Size/Body Sm` (Desktop), `Font Size/Body Sm` (Mobile), `Font Size/Body Sm` (Tablet), `Font Size/Label Md` (Desktop), `Font Size/Label Md` (Mobile), `Font Size/Label Md` (Tablet) |
| 16px | `Type/Size/16` | `Font Size/Body` (Desktop), `Font Size/Body` (Mobile), `Font Size/Body` (Tablet), `Font Size/Label Lg` (Desktop), `Font Size/Label Lg` (Mobile), `Font Size/Label Lg` (Tablet) |
| 18px | `Type/Size/18` | `Font Size/Heading Sm` (Desktop), `Font Size/Heading Sm` (Mobile), `Font Size/Heading Sm` (Tablet) |
| 20px | `Type/Size/20` | `Font Size/Heading Md` (Mobile), `Font Size/Heading Md` (Tablet) |
| 24px | `Type/Size/24` | `Font Size/Heading Lg` (Mobile), `Font Size/Heading Lg` (Tablet), `Font Size/Heading Md` (Desktop) |
| 28px | `Type/Size/28` | `Font Size/Display` (Mobile), `Font Size/Heading Lg` (Desktop) |
| 32px | `Type/Size/32` | `Font Size/Display` (Tablet) |
| 40px | `Type/Size/40` | `Font Size/Display` (Desktop) |
| 16px | `Type/Line Height/16` | `Line Height/Caption` (Desktop), `Line Height/Caption` (Mobile), `Line Height/Caption` (Tablet) |
| 18px | `Type/Line Height/18` | `Line Height/Label Sm` (Desktop), `Line Height/Label Sm` (Mobile), `Line Height/Label Sm` (Tablet) |
| 20px | `Type/Line Height/20` | `Line Height/Body Sm` (Desktop), `Line Height/Body Sm` (Mobile), `Line Height/Body Sm` (Tablet), `Line Height/Label Lg` (Desktop), `Line Height/Label Lg` (Mobile), `Line Height/Label Lg` (Tablet), `Line Height/Label Md` (Desktop), `Line Height/Label Md` (Mobile), `Line Height/Label Md` (Tablet) |
| 24px | `Type/Line Height/24` | `Line Height/Heading Sm` (Desktop), `Line Height/Heading Sm` (Mobile), `Line Height/Heading Sm` (Tablet), `Line Height/Body` (Desktop), `Line Height/Body` (Mobile), `Line Height/Body` (Tablet) |
| 28px | `Type/Line Height/28` | `Line Height/Heading Md` (Mobile), `Line Height/Heading Md` (Tablet) |
| 32px | `Type/Line Height/32` | `Line Height/Heading Lg` (Mobile), `Line Height/Heading Lg` (Tablet), `Line Height/Heading Md` (Desktop) |
| 36px | `Type/Line Height/36` | `Line Height/Display` (Mobile), `Line Height/Heading Lg` (Desktop) |
| 40px | `Type/Line Height/40` | `Line Height/Display` (Tablet) |
| 48px | `Type/Line Height/48` | `Line Height/Display` (Desktop) |
| Pretendard | `Type/Family/Sans` | `Font Family/Base` (Desktop), `Font Family/Base` (Mobile), `Font Family/Base` (Tablet) |
| 400 | `Type/Weight/Regular` | `Font Weight/Body` (Desktop), `Font Weight/Body` (Mobile), `Font Weight/Body` (Tablet) |
| 500 | `Type/Weight/Medium` | `Font Weight/Label` (Desktop), `Font Weight/Label` (Mobile), `Font Weight/Label` (Tablet) |
| 600 | `Type/Weight/Semibold` | `Font Weight/Heading` (Desktop), `Font Weight/Heading` (Mobile), `Font Weight/Heading` (Tablet), `Font Weight/Strong` (Desktop), `Font Weight/Strong` (Mobile), `Font Weight/Strong` (Tablet) |
| 700 | `Type/Weight/Bold` | `Font Weight/Display` (Desktop), `Font Weight/Display` (Mobile), `Font Weight/Display` (Tablet) |
<!-- GENERATED:END -->
