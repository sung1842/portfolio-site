# Icons & Colors Reference

## 등록된 Tech 아이콘 (TECH_META_MAP)

| Tech 키 (정확히 일치) | react-icons | 브랜드 색상 |
|---|---|---|
| `Spring Boot` | `SiSpring` | `#6DB33F` |
| `Spring` | `SiSpring` | `#6DB33F` |
| `MySQL` | `SiMysql` | `#4479A1` |
| `AJAX` | `SiJavascript` | `#F7DF1E` |
| `Next.js` | `SiNextdotjs` | `#FFFFFF` |
| `React` | `SiReact` | `#61DAFB` |
| `Vue.js` | `SiVuedotjs` | `#4FC08D` |
| `Gemini` | `SiGooglegemini` | `#4285F4` |
| `Flask` | `SiFlask` | `#FFFFFF` |
| `Python` | `SiPython` | `#3776AB` |
| `Deepface` | `SiPython` | `#3776AB` |
| `Keras` | `SiKeras` | `#D00000` |
| `TypeScript` | `SiTypescript` | `#3178C6` |
| `Docker` | `SiDocker` | `#2496ED` |
| `AWS` | `SiAmazonwebservices` | `#FF9900` |

## 네온 색상 팔레트 예시

| 스타일 | color1 | color2 |
|---|---|---|
| AI/ML | `rgba(66,133,244,0.65)` Gemini Blue | `rgba(138,43,226,0.55)` Purple |
| E-Commerce | `rgba(255,51,102,0.6)` Orange | `rgba(255,255,0,0.6)` Yellow |
| Cyan/Purple | `rgba(0,255,255,0.6)` | `rgba(138,43,226,0.6)` |
| Magenta/Cyan | `rgba(255,0,128,0.6)` | `rgba(0,255,255,0.6)` |
| Profile | Lime `rgba(204,255,0,0.6)` | Cyan `rgba(0,240,255,0.6)` |

## 새 아이콘 추가 방법

```bash
# react-icons/si에서 검색
# https://react-icons.github.io/react-icons/icons/si/
# Si + PascalCase 이름으로 import
```

```ts
import { SiNewIcon } from "react-icons/si";
// TECH_META_MAP에 추가:
"NewTech": { icon: SiNewIcon, color: "#HEX" },
```
