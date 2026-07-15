import ReviewGalleryClient from "./ReviewGalleryClient";
import { getPublicReviewGallery } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ReviewPage({ params }: PageProps) {
  const categoryId = Number(params.id);
  const images = await getPublicReviewGallery(categoryId);
  return <ReviewGalleryClient images={images} />;
}
