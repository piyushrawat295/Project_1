import { notFound } from "next/navigation";
import { getMapNGOs } from "@/actions/get-map-ngos";
import NGODetailClient from "@/components/landing/NGODetailClient";

interface PageProps {
  params: { slug: string };
}

export default async function NGODetailPage({ params }: PageProps) {
  const ngos = await getMapNGOs();
  const ngo = ngos.find((n) => n.slug === params.slug);

  if (!ngo) {
    notFound();
  }

  return <NGODetailClient ngo={ngo} />;
}
