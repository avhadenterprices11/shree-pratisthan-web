/**
 * CDN Media Utility — Shri Pratisthan
 * Helper to dynamically prefix static video and image assets with CDN origins
 * when configured (e.g. Cloudinary, AWS CloudFront, or Vercel Blob CDN).
 */
export function getCDNUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL;
  if (cdnBase) {
    const cleanBase = cdnBase.endsWith("/") ? cdnBase.slice(0, -1) : cdnBase;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  }
  return path;
}
