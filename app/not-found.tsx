import { Knockout404 } from "@/components/ui/not-found-knockout";

export default function NotFound() {
  return (
    <div className="w-full dark min-h-[70vh] flex items-center justify-center">
      <Knockout404 
        glyph="404"
        message="This apparel product or specification sheet is not available or has been relocated."
        primaryLabel="Browse Categories"
        primaryHref="/#categories"
        secondaryLabel="Contact Sourcing Team"
        secondaryHref="/contact"
      />
    </div>
  );
}
