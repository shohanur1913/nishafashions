import { Metadata } from "next";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Apparel Merchandising & Sourcing Desk",
  description: "Get in touch with Nisha Fashions Wear in Dhaka, Bangladesh. Request fast FOB costing, sample development, and factory allocation for your brand within 48 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Apparel Sourcing Desk | Nisha Fashions Wear Bangladesh",
    description: "Submit RFQ, garment specifications and tech packs. Senior merchandisers respond within 48h with indicative FOB pricing and production schedule.",
    url: "https://www.nishafashions.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
