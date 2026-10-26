import { Knockout404 } from "@/components/ui/not-found-knockout";

export default function WebsiteNotFound() {
  return (
    <div className="w-full dark">
      <Knockout404 
        glyph="404"
        message="This apparel item or page does not exist or has been relocated."
        primaryLabel="Browse Categories"
        primaryHref="/#categories"
        secondaryLabel="Contact Merchandiser"
        secondaryHref="/contact"
      />
    </div>
  );
}
