import { Metadata } from "next";
import { ServicesClient } from "./services-client";

export const metadata: Metadata = {
  title: "Apparel Sourcing Services & Manufacturing Scope",
  description: "End-to-end apparel production management in Dhaka, Bangladesh: Knitwear, Woven, Denim, and Sweaters. Factory sourcing, sampling, QA, and export logistics.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Apparel Sourcing Services & Manufacturing Scope | Nisha Fashions Wear",
    description: "Five specialized manufacturing divisions and 9 operational disciplines covering factory sourcing, pattern engineering, inline QA, and international export logistics.",
    url: "https://www.nishafashions.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
