/** Homepage feature cards; distinct from product_addons (priced product options). */
export type FeatureAddon = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  is_published: boolean;
  sort_order: number;
};

export function parseFeatureAddons(value: unknown): FeatureAddon[] {
  const parsed = typeof value === 'string' ? JSON.parse(value) as unknown : value;
  if (!Array.isArray(parsed)) return []; // Never replace stored CMS content with bundled examples
  return parsed.filter((item): item is Record<string, unknown> => !!item && typeof item === 'object' && !Array.isArray(item))
    .map((item, index) => ({
      id: String(item.id ?? `item-${index}`).slice(0, 100),
      title: String(item.title ?? '').slice(0, 200),
      description: String(item.description ?? '').slice(0, 500),
      image_url: String(item.image_url ?? '').slice(0, 2000),
      is_published: item.is_published !== false,
      sort_order: Number.isFinite(Number(item.sort_order)) ? Number(item.sort_order) : index + 1,
    })).sort((a, b) => a.sort_order - b.sort_order);
}
