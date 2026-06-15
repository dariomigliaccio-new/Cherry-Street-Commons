import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import SessionProvider from "@/components/admin/SessionProvider";

export const metadata = { title: "Admin — Cherry Street Commons" };

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      {session ? <AdminLayout>{children}</AdminLayout> : children}
    </SessionProvider>
  );
}
