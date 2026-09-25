export const PROJECT_MEDIA_BUCKET = "project-media";

export function publicMediaUrl(filename: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) {
    return filename;
  }
  const trimmed = filename.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/${PROJECT_MEDIA_BUCKET}/${trimmed}`;
}
