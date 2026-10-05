import { Knockout404 } from "@/components/ui/not-found-knockout";
import { Header } from "@/components/website/header";
import { Footer } from "@/components/website/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full dark">
        <Knockout404 
          glyph="404"
          message="This page drifted into the void."
          primaryLabel="Take me home"
          primaryHref="/"
          secondaryLabel="Contact support"
          secondaryHref="/contact"
        />
      </main>
      <Footer />
    </div>
  );
}
