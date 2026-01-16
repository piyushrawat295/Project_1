import { getMapNGOs } from "@/actions/get-map-ngos";
import NGOListClient from "@/components/landing/NGOListClient";

export default async function NGOListPage() {
  const ngos = await getMapNGOs();

  return <NGOListClient ngos={ngos} />;
}
