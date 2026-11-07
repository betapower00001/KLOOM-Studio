/**
 * Both admin and public portfolio APIs must choose the SAME row for a fixed
 * review category. Historical imports can contain multiple rows for /review/1.
 * Never mutate records just because an admin opens the editor.
 */
export type PortfolioCategoryRow = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  review_url: string;
  is_published: boolean;
  sort_order: number;
  updated_at: string | Date;
};

export function portfolioCategoryId(row: Pick<PortfolioCategoryRow, "review_url" | "sort_order">): number | null {
  const match = String(row.review_url || "").match(/^\/review\/(1|2|3)\/?(?:\?.*)?$/i);
  if (match) return Number(match[1]);
  // Legacy rows may not yet have their review link set.
  if (!row.review_url && [1, 2, 3].includes(Number(row.sort_order))) return Number(row.sort_order);
  return null;
}

function quality(row: PortfolioCategoryRow): number {
  // Reject empty placeholder drafts ahead of a real, edited cover.
  const hasImage = Boolean(String(row.image_url || "").trim());
  const named = Boolean(String(row.title || "").trim()) && String(row.title).trim() !== "ผลงานใหม่";
  return Number(hasImage) * 4 + Number(named) * 2 + Number(Boolean(String(row.description || "").trim()));
}

export function selectPortfolioCategories<T extends PortfolioCategoryRow>(rows: T[]): T[] {
  return [1, 2, 3].flatMap((categoryId) => {
    const candidates = rows.filter((row) => portfolioCategoryId(row) === categoryId);
    candidates.sort((a, b) => {
      const published = Number(b.is_published) - Number(a.is_published);
      if (published) return published;
      // An admin's latest saved edit must win over older, more complete seeded rows.
      const recent = new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      if (Number.isFinite(recent) && recent !== 0) return recent;
      const content = quality(b) - quality(a);
      if (content) return content;
      return a.id.localeCompare(b.id);
    });
    return candidates.length ? [candidates[0]] : [];
  });
}
