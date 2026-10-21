import { getAdminUser } from "@/lib/auth";

export const metadata = {
  title: "Admin Dashboard | Nisha Fashions Wear",
  description: "Manage content, products, categories, pages and buyer enquiries",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      {children}
    </div>
  );
}
