/**
 * Utility to optimize Google Drive thumbnail URLs based on width
 * Mobile: w250
 * Tablet: w500
 * Desktop: w750
 */

export function getOptimizedDriveUrl(url: string, width: 250 | 500 | 750 | 1000 = 500): string {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("drive.google.com/thumbnail")) return url;

  if (url.includes("sz=")) {
    return url.replace(/sz=w\d+/, `sz=w${width}`);
  }
  return `${url}&sz=w${width}`;
}

export function getDriveResponsiveProps(url: string, customSizes?: string) {
  if (!url || !url.includes("drive.google.com/thumbnail")) {
    return { src: url };
  }

  const w250 = getOptimizedDriveUrl(url, 250);
  const w500 = getOptimizedDriveUrl(url, 500);
  const w750 = getOptimizedDriveUrl(url, 750);

  return {
    src: w500,
    srcSet: `${w250} 250w, ${w500} 500w, ${w750} 750w`,
    sizes: customSizes || "(max-width: 640px) 250px, (max-width: 1024px) 500px, 750px",
  };
}
