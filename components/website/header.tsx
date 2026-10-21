import { HeaderSimple } from "@/components/header-simple";
import { QuoteModal } from "@/components/website/quote-modal";

export function Header() {
  return (
    <>
      <HeaderSimple 
        logoImage="/images/logo.jpg"
        logoText="Nisha Fashions Wear - Bangladesh Apparel Manufacturer & Supplier"
        logoSize={48}
        ctaText="Get a Quote"
        ctaBackground="var(--brand, #E94D65)"
        ctaTextColor="#ffffff"
        backgroundColor="transparent"
        showBorder={false}
      />
      <QuoteModal />
    </>
  );
}
