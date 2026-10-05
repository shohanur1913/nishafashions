import { HeaderSimple } from "@/components/header-simple";
import { QuoteModal } from "@/components/website/quote-modal";

export function Header() {
  return (
    <>
      <HeaderSimple 
        logoImage="https://www.nishafashions.com/wp-content/uploads/2022/11/nfw_logo3.jpg"
        logoSize={48}
        ctaText="Get a Quote"
        backgroundColor="transparent"
        showBorder={false}
      />
      <QuoteModal />
    </>
  );
}
