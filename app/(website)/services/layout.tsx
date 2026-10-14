import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apparel Manufacturing & Sourcing Services | Nisha Fashions Wear",
  description: "Full-service apparel sourcing, product development, fabric & trim sourcing, costing, merchandising, quality assurance, compliance, packing, and shipping.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
