import { Header } from "@/components/website/header";
import { Footer } from "@/components/website/footer";
import { getSiteSettings } from "@/lib/content-service";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const logo = settings.header_logo_url || "/images/logo.jpg";

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoImage={logo} settings={settings} />
      <main className="flex-1 w-full">{children}</main>
      <Footer logoImage={logo} />
    </div>
  );
}
