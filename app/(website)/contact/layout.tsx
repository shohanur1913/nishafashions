import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Nisha Fashions Wear | Bangladesh Apparel Supplier",
  description: "Contact Nisha Fashions Wear for your apparel manufacturing, sourcing, and production inquiries. We partner with international buyers to deliver premium solutions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
