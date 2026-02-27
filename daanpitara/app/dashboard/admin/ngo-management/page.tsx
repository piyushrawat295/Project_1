import { getAdminNGOs } from "@/actions/admin";
import NGOManagementClient from "@/components/admin/NGOManagementClient";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function NGOManagementPage() {
   const ngosRes = await getAdminNGOs();

   if ('error' in ngosRes) {
       return (
           <div className="flex h-full w-full items-center justify-center min-h-[50vh]">
               <div className="flex flex-col items-center gap-4 text-gray-500">
                   <AlertCircle className="h-10 w-10 text-red-500" />
                   <p className="text-lg font-medium">{ngosRes.error}</p>
                  <Link href="/signin" className="text-blue-500 hover:underline">Return to Login</Link>
               </div>
           </div>
       );
   }

   return (
       <NGOManagementClient initialNgos={ngosRes.data || []} />
   );
}
