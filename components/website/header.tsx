import { HeaderSimple } from "@/components/header-simple";
import { QuoteModal } from "@/components/website/quote-modal";
import { NoticeBar } from "@/components/website/notice-bar";

export function Header({ 
  logoImage, 
  settings 
}: { 
  logoImage?: string; 
  settings?: Record<string, string>;
}) {
  return (
    <>
      {/* Notice Bar - Displayed above header if position is top */}
      <NoticeBar settings={settings} positionFilter="top" />

      <HeaderSimple 
        logoImage={logoImage || "/images/logo.jpg"}
        logoText="Nisha Fashions Wear - Bangladesh Apparel Manufacturer & Supplier"
        logoSize={48}
        ctaText="Get a Quote"
        ctaBackground="var(--brand, #E94D65)"
        ctaTextColor="#ffffff"
        backgroundColor="transparent"
        showBorder={false}
      />

      {/* Notice Bar - Displayed below header if position is bottom */}
      <NoticeBar settings={settings} positionFilter="bottom" />

      <QuoteModal />
    </>
  );
}
