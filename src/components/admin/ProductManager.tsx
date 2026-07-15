"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/admin/api";
import MediaUpload from "./MediaUpload";

type Variant = {
  id: string;
  code: string;
  label: string;
  price_text: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};

type Product = {
  id: string;
  legacy_id: number | null;
  name: string;
  description: string;
  main_image_url: string;
  sort_order: number;
  is_active: boolean;
  product_variants: Variant[];
};

type Addon = {
  id: string;
  legacy_id: number | null;
  name: string;
  price_text: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};

type Category = {
  id: string;
  size_label: string;
  sort_order: number;
  is_active: boolean;
  products: Product[];
  product_addons: Addon[];
};

export default function ProductManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string>("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setCategories(await adminFetch<Category[]>("/api/admin/products"));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "โหลดข้อมูลไม่สำเร็จ");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function updateCategory(id: string, patch: Partial<Category>) {
    setCategories((current) =>
      current.map((category) =>
        category.id === id ? { ...category, ...patch } : category,
      ),
    );
  }

  function updateProduct(categoryId: string, productId: string, patch: Partial<Product>) {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              products: category.products.map((product) =>
                product.id === productId ? { ...product, ...patch } : product,
              ),
            }
          : category,
      ),
    );
  }

  function updateVariant(
    categoryId: string,
    productId: string,
    variantId: string,
    patch: Partial<Variant>,
  ) {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              products: category.products.map((product) =>
                product.id === productId
                  ? {
                      ...product,
                      product_variants: product.product_variants.map((variant) =>
                        variant.id === variantId ? { ...variant, ...patch } : variant,
                      ),
                    }
                  : product,
              ),
            }
          : category,
      ),
    );
  }

  function updateAddon(categoryId: string, addonId: string, patch: Partial<Addon>) {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              product_addons: category.product_addons.map((addon) =>
                addon.id === addonId ? { ...addon, ...patch } : addon,
              ),
            }
          : category,
      ),
    );
  }

  async function run(key: string, action: () => Promise<void>) {
    setBusy(key);
    setMessage("");
    try {
      await action();
      setMessage("บันทึกข้อมูลเรียบร้อยแล้ว");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "เกิดข้อผิดพลาด");
    } finally {
      setBusy("");
    }
  }

  async function saveCategory(category: Category) {
    await run(`category-${category.id}`, async () => {
      await adminFetch("/api/admin/products", {
        method: "PATCH",
        body: JSON.stringify({
          entity: "category",
          id: category.id,
          data: {
            size_label: category.size_label,
            sort_order: Number(category.sort_order),
            is_active: category.is_active,
          },
        }),
      });
    });
  }

  async function addCategory() {
    await run("add-category", async () => {
      await adminFetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify({
          entity: "category",
          data: {
            size_label: `ขนาดใหม่ ${Date.now()}`,
            sort_order: categories.length + 1,
            is_active: false,
          },
        }),
      });
      await load();
    });
  }

  async function deleteCategory(category: Category) {
    if (!window.confirm(`ลบหมวด ${category.size_label} และสินค้าทั้งหมดในหมวดนี้หรือไม่?`)) return;
    await run(`delete-category-${category.id}`, async () => {
      await adminFetch("/api/admin/products", {
        method: "DELETE",
        body: JSON.stringify({ entity: "category", id: category.id }),
      });
      await load();
    });
  }

  async function saveProduct(product: Product) {
    await run(`product-${product.id}`, async () => {
      await adminFetch("/api/admin/products", {
        method: "PATCH",
        body: JSON.stringify({
          entity: "product",
          id: product.id,
          data: {
            name: product.name,
            description: product.description,
            main_image_url: product.main_image_url,
            sort_order: Number(product.sort_order),
            is_active: product.is_active,
          },
        }),
      });
    });
  }

  async function addProduct(category: Category) {
    await run(`add-product-${category.id}`, async () => {
      const maxLegacy = Math.max(0, ...category.products.map((product) => product.legacy_id ?? 0));
      await adminFetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify({
          entity: "product",
          data: {
            category_id: category.id,
            legacy_id: maxLegacy + 1,
            name: "สินค้าใหม่",
            description: category.size_label,
            main_image_url: "",
            sort_order: category.products.length + 1,
            is_active: false,
          },
        }),
      });
      await load();
    });
  }

  async function deleteProduct(product: Product) {
    if (!window.confirm(`ลบสินค้า “${product.name}” หรือไม่?`)) return;
    await run(`delete-product-${product.id}`, async () => {
      await adminFetch("/api/admin/products", {
        method: "DELETE",
        body: JSON.stringify({ entity: "product", id: product.id }),
      });
      await load();
    });
  }

  async function saveVariant(variant: Variant) {
    await run(`variant-${variant.id}`, async () => {
      await adminFetch("/api/admin/products", {
        method: "PATCH",
        body: JSON.stringify({
          entity: "variant",
          id: variant.id,
          data: {
            code: variant.code,
            label: variant.label,
            price_text: variant.price_text,
            image_url: variant.image_url,
            sort_order: Number(variant.sort_order),
            is_active: variant.is_active,
          },
        }),
      });
    });
  }

  async function addVariant(product: Product) {
    await run(`add-variant-${product.id}`, async () => {
      const suffix = Date.now().toString().slice(-6);
      await adminFetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify({
          entity: "variant",
          data: {
            product_id: product.id,
            code: `color-${suffix}`,
            label: "สีใหม่",
            price_text: "0 บาท/โหล",
            image_url: product.main_image_url,
            sort_order: product.product_variants.length + 1,
            is_active: false,
          },
        }),
      });
      await load();
    });
  }

  async function deleteVariant(variant: Variant) {
    if (!window.confirm(`ลบตัวเลือก “${variant.label}” หรือไม่?`)) return;
    await run(`delete-variant-${variant.id}`, async () => {
      await adminFetch("/api/admin/products", {
        method: "DELETE",
        body: JSON.stringify({ entity: "variant", id: variant.id }),
      });
      await load();
    });
  }

  async function saveAddon(addon: Addon) {
    await run(`addon-${addon.id}`, async () => {
      await adminFetch("/api/admin/products", {
        method: "PATCH",
        body: JSON.stringify({
          entity: "addon",
          id: addon.id,
          data: {
            name: addon.name,
            price_text: addon.price_text,
            image_url: addon.image_url,
            sort_order: Number(addon.sort_order),
            is_active: addon.is_active,
          },
        }),
      });
    });
  }

  async function addAddon(category: Category) {
    await run(`add-addon-${category.id}`, async () => {
      const maxLegacy = Math.max(100, ...category.product_addons.map((addon) => addon.legacy_id ?? 0));
      await adminFetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify({
          entity: "addon",
          data: {
            category_id: category.id,
            legacy_id: maxLegacy + 1,
            name: "ตัวเลือกเสริมใหม่",
            price_text: "0 บาท/โหล",
            image_url: "",
            sort_order: category.product_addons.length + 1,
            is_active: false,
          },
        }),
      });
      await load();
    });
  }

  async function deleteAddon(addon: Addon) {
    if (!window.confirm(`ลบ “${addon.name}” หรือไม่?`)) return;
    await run(`delete-addon-${addon.id}`, async () => {
      await adminFetch("/api/admin/products", {
        method: "DELETE",
        body: JSON.stringify({ entity: "addon", id: addon.id }),
      });
      await load();
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white">
        <Loader2 className="animate-spin text-[#a6784f]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {message && (
        <div className="sticky top-4 z-30 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          {message}
        </div>
      )}

      {categories.map((category) => (
        <section key={category.id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-7">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-end">
            <label className="flex-1">
              <span className="mb-2 block text-sm font-medium text-slate-600">ชื่อหมวด / ขนาด</span>
              <input
                value={category.size_label}
                onChange={(event) => updateCategory(category.id, { size_label: event.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xl font-semibold outline-none focus:border-[#b78b64]"
              />
            </label>
            <label className="w-28">
              <span className="mb-2 block text-sm font-medium text-slate-600">ลำดับ</span>
              <input
                type="number"
                value={category.sort_order}
                onChange={(event) => updateCategory(category.id, { sort_order: Number(event.target.value) })}
                className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={category.is_active}
                onChange={(event) => updateCategory(category.id, { is_active: event.target.checked })}
              />
              แสดงหมวดนี้
            </label>
            <button
              type="button"
              onClick={() => saveCategory(category)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-[#a6784f]"
            >
              {busy === `category-${category.id}` ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
              บันทึกหมวด
            </button>
            <button
              type="button"
              onClick={() => deleteCategory(category)}
              className="rounded-xl border border-red-200 p-3 text-red-600 hover:bg-red-50"
              aria-label="ลบหมวด"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="mt-7 space-y-6">
            {category.products.map((product) => (
              <article key={product.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-medium text-slate-600">ชื่อสินค้า</span>
                    <input
                      value={product.name}
                      onChange={(event) => updateProduct(category.id, product.id, { name: event.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold outline-none focus:border-[#b78b64]"
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-medium text-slate-600">คำอธิบาย</span>
                    <input
                      value={product.description}
                      onChange={(event) => updateProduct(category.id, product.id, { description: event.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#b78b64]"
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_110px_auto_auto] lg:items-end">
                  <label>
                    <span className="mb-2 block text-sm font-medium text-slate-600">รูปหลัก</span>
                    <MediaUpload
                      value={product.main_image_url}
                      onChange={(url) => updateProduct(category.id, product.id, { main_image_url: url })}
                      folder="products"
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-medium text-slate-600">ลำดับ</span>
                    <input
                      type="number"
                      value={product.sort_order}
                      onChange={(event) => updateProduct(category.id, product.id, { sort_order: Number(event.target.value) })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none"
                    />
                  </label>
                  <label className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={product.is_active}
                      onChange={(event) => updateProduct(category.id, product.id, { is_active: event.target.checked })}
                    />
                    แสดงสินค้า
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveProduct(product)}
                      className="rounded-xl bg-slate-900 p-2.5 text-white hover:bg-[#a6784f]"
                      aria-label="บันทึกสินค้า"
                    >
                      {busy === `product-${product.id}` ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product)}
                      className="rounded-xl border border-red-200 p-2.5 text-red-600 hover:bg-red-50"
                      aria-label="ลบสินค้า"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="min-w-[920px] w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="px-3 py-3">รหัสสี</th>
                        <th className="px-3 py-3">ชื่อสี</th>
                        <th className="px-3 py-3">ราคา</th>
                        <th className="px-3 py-3">รูปภาพ</th>
                        <th className="px-3 py-3">ลำดับ</th>
                        <th className="px-3 py-3">แสดง</th>
                        <th className="px-3 py-3">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.product_variants.map((variant) => (
                        <tr key={variant.id} className="border-t border-slate-100 align-top">
                          <td className="p-3">
                            <input
                              value={variant.code}
                              onChange={(event) => updateVariant(category.id, product.id, variant.id, { code: event.target.value })}
                              className="w-28 rounded-lg border border-slate-200 px-2 py-2"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              value={variant.label}
                              onChange={(event) => updateVariant(category.id, product.id, variant.id, { label: event.target.value })}
                              className="w-32 rounded-lg border border-slate-200 px-2 py-2"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              value={variant.price_text}
                              onChange={(event) => updateVariant(category.id, product.id, variant.id, { price_text: event.target.value })}
                              className="w-36 rounded-lg border border-slate-200 px-2 py-2"
                            />
                          </td>
                          <td className="min-w-72 p-3">
                            <MediaUpload
                              value={variant.image_url}
                              onChange={(url) => updateVariant(category.id, product.id, variant.id, { image_url: url })}
                              folder="product-variants"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={variant.sort_order}
                              onChange={(event) => updateVariant(category.id, product.id, variant.id, { sort_order: Number(event.target.value) })}
                              className="w-20 rounded-lg border border-slate-200 px-2 py-2"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={variant.is_active}
                              onChange={(event) => updateVariant(category.id, product.id, variant.id, { is_active: event.target.checked })}
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => saveVariant(variant)}
                                className="rounded-lg bg-slate-900 p-2 text-white"
                                aria-label="บันทึกตัวเลือก"
                              >
                                {busy === `variant-${variant.id}` ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteVariant(variant)}
                                className="rounded-lg border border-red-200 p-2 text-red-600"
                                aria-label="ลบตัวเลือก"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={() => addVariant(product)}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-[#b78b64] px-4 py-2 text-sm font-semibold text-[#8f6644] hover:bg-[#deb18a]/15"
                >
                  <Plus size={17} /> เพิ่มสี / ราคา
                </button>
              </article>
            ))}

            <button
              type="button"
              onClick={() => addProduct(category)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#deb18a] px-4 py-3 text-sm font-semibold text-[#20202b] hover:bg-[#c89b72]"
            >
              <Plus size={18} /> เพิ่มสินค้าในหมวดนี้
            </button>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-7">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">ตัวเลือกเสริม</h3>
              <button
                type="button"
                onClick={() => addAddon(category)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#b78b64] px-3 py-2 text-sm font-semibold text-[#8f6644]"
              >
                <Plus size={16} /> เพิ่มตัวเลือกเสริม
              </button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {category.product_addons.map((addon) => (
                <div key={addon.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={addon.name}
                      onChange={(event) => updateAddon(category.id, addon.id, { name: event.target.value })}
                      className="rounded-xl border border-slate-200 px-3 py-2 font-medium"
                      placeholder="ชื่อ"
                    />
                    <input
                      value={addon.price_text}
                      onChange={(event) => updateAddon(category.id, addon.id, { price_text: event.target.value })}
                      className="rounded-xl border border-slate-200 px-3 py-2"
                      placeholder="ราคา"
                    />
                  </div>
                  <div className="mt-3">
                    <MediaUpload
                      value={addon.image_url}
                      onChange={(url) => updateAddon(category.id, addon.id, { image_url: url })}
                      folder="addons"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={addon.is_active}
                        onChange={(event) => updateAddon(category.id, addon.id, { is_active: event.target.checked })}
                      />
                      แสดง
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={addon.sort_order}
                        onChange={(event) => updateAddon(category.id, addon.id, { sort_order: Number(event.target.value) })}
                        className="w-20 rounded-lg border border-slate-200 px-2 py-2 text-sm"
                        aria-label="ลำดับ"
                      />
                      <button
                        type="button"
                        onClick={() => saveAddon(addon)}
                        className="rounded-lg bg-slate-900 p-2 text-white"
                        aria-label="บันทึกตัวเลือกเสริม"
                      >
                        {busy === `addon-${addon.id}` ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteAddon(addon)}
                        className="rounded-lg border border-red-200 p-2 text-red-600"
                        aria-label="ลบตัวเลือกเสริม"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <button
        type="button"
        onClick={addCategory}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-[#a6784f]"
      >
        {busy === "add-category" ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
        เพิ่มหมวดขนาดใหม่
      </button>
    </div>
  );
}
