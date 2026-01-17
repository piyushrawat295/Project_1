
import { getNGOProfile } from "@/actions/dashboard";
import NGODetailsClient from "@/components/dashboard/NGODetailsClient";

export default async function NGODetailsPage() {
  const ngoData = await getNGOProfile();

  // Map database object to form shape if necessary, or pass directly
  // Adjust type mapping if needed based on your schema
  const initialData = ngoData ? {
    name: ngoData.name,
    type: ngoData.type || "Trust",
    panNumber: ngoData.panNumber || "",
    registrationNumber: ngoData.registrationNumber || "",
    foundedYear: ngoData.foundedYear || "",
    teamSize: ngoData.teamSize || "",
    headquarters: ngoData.headquarters || "",
    description: ngoData.description || "",
    focusAreas: (ngoData.focusAreas as string[]) || [],
    operationalStates: (ngoData.operationalStates as string[]) || [],
    operationalDistricts: (ngoData.operationalDistricts as string[]) || [],
    vision: ngoData.vision || "",
    mission: ngoData.mission || "",
    objectives: ngoData.objectives || "",
    lat: ngoData.lat || 0,
    lng: ngoData.lng || 0,
    teamMembers: ngoData.teamMembers || [],
    boardMembers: ngoData.boardMembers || [],
  } : null;

  return <NGODetailsClient initialData={initialData} />;
}
