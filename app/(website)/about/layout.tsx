import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nisha Fashions Wear | Bangladesh Apparel Manufacturer",
  description: "Nisha Fashions Wear is an experienced apparel production management and sourcing partner for international buyers, ensuring quality manufacturing and compliance.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
