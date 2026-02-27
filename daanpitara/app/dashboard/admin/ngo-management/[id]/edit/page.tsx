import { getAdminNGOById } from "@/actions/admin";
import AdminNGOEditClient from "@/components/admin/AdminNGOEditClient";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminNGOEditPage({ params }: { params: { id: string } }) {
    const ngoId = parseInt(params.id);
    const result = await getAdminNGOById(ngoId);

    if (result.error || !result.name) {
        return (
            <div className="flex h-full w-full items-center justify-center min-h-[50vh]">
                <div className="flex flex-col items-center gap-4 text-gray-500">
                    <AlertCircle className="h-10 w-10 text-red-500" />
                    <p className="text-lg font-medium">{result.error || 'NGO Not Found'}</p>
                   <Link href="/dashboard/admin/ngo-management" className="text-blue-500 hover:underline">Return to Management</Link>
                </div>
            </div>
        );
    }

    return <AdminNGOEditClient ngo={result} />;
}
