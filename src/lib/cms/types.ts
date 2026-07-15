export type ProductColor = {
  id: string;
  image: string;
  price: string;
  label: string;
};

export type ProductItem = {
  id: number;
  dbId?: string;
  name: string;
  desc: string;
  mainImage?: string;
  colors: ProductColor[];
};

export type ProductAddon = {
  id: number;
  dbId?: string;
  name: string;
  image: string;
  price: string;
};

export type ProductCategory = {
  id?: string;
  size: string;
  products: ProductItem[];
  addons: ProductAddon[];
};

export type CmsArticle = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string;
  content_html: string;
  published: boolean;
  sort_order: number;
};

export type CmsTestimonial = {
  id?: string;
  customer_name: string;
  quote: string;
  image_url: string;
  published: boolean;
  sort_order: number;
};

export type CmsSettings = {
  contact: {
    phone: string;
    line: string;
    email: string;
    address: string;
  };
  hero: {
    title: string;
    subtitle: string;
    image_url: string;
    button_text: string;
  };
};
