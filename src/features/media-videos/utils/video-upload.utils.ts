/**
 * Format bytes to readable string (KB, MB, GB)
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
export function formatDuration(seconds?: number): string {
  if (seconds === undefined || isNaN(seconds)) return "--:--";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const mStr = m.toString().padStart(2, "0");
  const sStr = s.toString().padStart(2, "0");

  if (h > 0) {
    const hStr = h.toString().padStart(2, "0");
    return `${hStr}:${mStr}:${sStr}`;
  }

  return `${mStr}:${sStr}`;
}

/**
 * Validate if file is a valid video format
 */
export function isValidVideoType(mimeType: string, allowedTypes?: string[]): boolean {
  if (!allowedTypes || allowedTypes.length === 0) {
    // Default fallback to common web video formats
    return mimeType.startsWith("video/");
  }
  return allowedTypes.includes(mimeType);
}
