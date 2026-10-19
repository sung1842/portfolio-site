import { isVideoAsset } from "@/constants/Projects";

export const PROJECT_MEDIA_BUCKET = "project-media";

const MEDIA_WAIT_MS = 5000;

export function publicMediaUrl(filename: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) {
    return filename;
  }
  const trimmed = filename.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/${PROJECT_MEDIA_BUCKET}/${trimmed}`;
}

/** Wait until background image/video is ready so modal body doesn't flash without media. */
export function preloadProjectMedia(src: string | undefined | null): Promise<void> {
  if (!src) return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => resolve();
    const timer = window.setTimeout(done, MEDIA_WAIT_MS);

    if (isVideoAsset(src)) {
      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      const finish = () => {
        window.clearTimeout(timer);
        video.removeAttribute("src");
        video.load();
        done();
      };
      video.addEventListener("canplaythrough", finish, { once: true });
      video.addEventListener("error", finish, { once: true });
      video.src = src;
      video.load();
      return;
    }

    const image = new Image();
    const finish = () => {
      window.clearTimeout(timer);
      done();
    };
    image.onload = finish;
    image.onerror = finish;
    image.src = src;
  });
}
