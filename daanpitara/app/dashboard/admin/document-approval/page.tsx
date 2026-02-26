import { getAdminDocuments } from "@/actions/admin";
import DocumentApprovalClient from "@/components/admin/DocumentApprovalClient";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function DocumentApprovalPage() {
   const docsRes = await getAdminDocuments();

   if ('error' in docsRes) {
       return (
           <div className="flex h-full w-full items-center justify-center min-h-[50vh]">
               <div className="flex flex-col items-center gap-4 text-gray-500">
                   <AlertCircle className="h-10 w-10 text-red-500" />
                   <p className="text-lg font-medium">{docsRes.error}</p>
                  <Link href="/signin" className="text-blue-500 hover:underline">Return to Login</Link>
               </div>
           </div>
       );
   }

   return (
       <DocumentApprovalClient initialDocs={docsRes.data || []} />
   );
}
