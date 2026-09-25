---
name: higgsfield-portfolio-video
description: Generates short Higgsfield intro/demo videos for Oh Sungwoo's portfolio cards (muted, looping, 16:9 mp4). Use when the user asks for a 소개 영상, demo clip, Higgsfield/힉스필드 video, OMR intro, or any portfolio project video.
---

# Higgsfield Portfolio Video

포트폴리오 카드·모달용 **짧은 소개 영상**만 만든다. 프로젝트 데이터 등록은 `add-portfolio-project` 스킬이 담당한다.

## Defaults

| 항목 | 값 | 이유 |
|------|-----|------|
| 길이 | 5초 | 카드 autoplay 루프에 충분 |
| 비율 | 16:9 | 카드 `aspectRatio: 1.58`, `object-cover` |
| 오디오 | 없음 (무음 친화) | 카드 `<video muted loop autoPlay>` |
| 산출물 | Higgsfield 영상 URL + `{slug}-demo.mp4` | 등록 시 `project-media` 버킷으로 올림 |

## Workflow

1. 프로젝트 이름/한 줄 기능 확인. 모호하면 한 가지만 묻는다.
2. Higgsfield MCP가 `needsAuth`면 `mcp_auth`로 연결한 뒤 진행한다.
3. 모델이 불명확하면 `models_explore(action: "recommend")` 후 `generate_video`를 호출한다.
4. 웹 미디어 URL은 `media_import_url`로 올린 뒤 `media_id`만 생성 입력에 쓴다.
5. **전달**  
   생성된 영상을 채팅에 보여 주고, 파일명은 `{slug}-demo.mp4`로 둔다.  
   최종 위치는 Supabase `project-media` 버킷(public URL). `frontend/public`에 넣지 않는다.  
   **프로젝트 카드 등록은 하지 않는다** — 사용자가 영상을 고른 뒤 `add-portfolio-project`가 업로드·DB 반영을 한다.

## Prompt rules

- 제품 UI 모션 1컷. 스토리·내레이션·로고 애니메이션을 만들지 않는다.
- 텍스트는 화면 안 UI에 자연스럽게 들어가는 짧은 라벨만.
- 카메라: slow push-in 또는 짧은 UI 전환. 컷 수는 2개 이하.

프로젝트별 초안은 [prompts.md](prompts.md)를 참고한다.
