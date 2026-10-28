import { Header } from "@/components/website/header";
import { Footer } from "@/components/website/footer";
import { GlobalHotDeals } from "@/components/website/global-hot-deals";
import { getSiteSettings, getHotDeals } from "@/lib/content-service";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, hotDeals] = await Promise.all([
    getSiteSettings(),
    getHotDeals(),
  ]);
  const logo = settings.header_logo_url || "/images/logo.jpg";

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoImage={logo} settings={settings} />
      <main className="flex-1 w-full">{children}</main>
      <GlobalHotDeals deals={hotDeals} />
      <Footer logoImage={logo} />
    </div>
  );
}
