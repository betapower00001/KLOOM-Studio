import { notFound } from "next/navigation";
import { getPublicArticle } from "@/lib/cms/public";
import BlogDetailClient from "./BlogDetailClient";

export const dynamic = "force-dynamic";

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getPublicArticle(params.slug);
  if (!article) notFound();

  return <BlogDetailClient article={article} />;
}
