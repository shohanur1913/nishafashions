import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content-service";
import { PageHero } from "@/components/website/page-hero";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await getPageContent(slug);
    if (!page || !page.title) return {};
    return {
      title: page.seo_title || `${page.title} | Nisha Fashions Wear`,
      description: page.seo_description || page.subtitle || "Official page of Nisha Fashions Wear.",
      alternates: {
        canonical: `/${slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default async function DynamicCustomPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageContent(slug);

  if (!page || !page.title) {
    notFound();
  }

  const content = page.content || {};
  const hero = content.hero || {};
  const sections = content.sections || [];
  const richBody = content.richBody || content.body || "";

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Universal Page Hero */}
      <PageHero
        badge={hero.badge || "Corporate Document"}
        title={hero.title || page.title}
        description={hero.description || page.subtitle || ""}
      />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-12 sm:mt-16 space-y-12">
        {/* Render Rich Markdown / Body if available */}
        {richBody && (
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4 text-xs sm:text-sm text-foreground/85 leading-relaxed">
            {richBody.split("\n\n").map((block: string, idx: number) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // Check for image
              const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
              if (imgMatch) {
                return (
                  <figure key={idx} className="my-6 rounded-2xl overflow-hidden bg-muted/30 border border-border/70 p-2">
                    <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-auto max-h-[500px] object-cover rounded-xl mx-auto" />
                    {imgMatch[1] && <figcaption className="text-center text-xs text-muted-foreground mt-2">{imgMatch[1]}</figcaption>}
                  </figure>
                );
              }

              if (trimmed.startsWith("### ")) {
                return <h4 key={idx} className="text-sm sm:text-base font-semibold text-foreground mt-4 mb-2">{trimmed.replace("### ", "")}</h4>;
              }
              if (trimmed.startsWith("## ")) {
                return <h3 key={idx} className="text-base sm:text-lg font-semibold text-foreground mt-6 mb-2">{trimmed.replace("## ", "")}</h3>;
              }
              if (trimmed.startsWith("# ")) {
                return <h2 key={idx} className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-3 border-b border-border/50 pb-2">{trimmed.replace("# ", "")}</h2>;
              }
              if (trimmed.startsWith("> ")) {
                return <blockquote key={idx} className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-xl italic text-foreground/80">{trimmed.replace("> ", "")}</blockquote>;
              }

              return <p key={idx} className="my-3 leading-relaxed">{trimmed}</p>;
            })}
          </div>
        )}

        {/* Structured Sections if available */}
        {sections.length > 0 && (
          <div className="space-y-10">
            {sections.map((sec: any, idx: number) => (
              <article key={sec.id || idx} className="p-6 sm:p-8 rounded-2xl bg-card border border-border/70 shadow-xs space-y-4">
                {sec.image && (
                  <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-muted mb-4 border border-border">
                    <img src={sec.image} alt={sec.title || "Section illustration"} className="w-full h-full object-cover" />
                  </div>
                )}
                <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                  {sec.title}
                </h2>
                {sec.content && (
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {sec.content}
                  </p>
                )}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="space-y-2 pt-2">
                    {sec.bullets.map((b: string, bIdx: number) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-muted/40 border border-border text-center space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            Have questions regarding this document or our apparel operations?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            Our compliance desk and merchandise operations team are available for technical audits and buyer onboarding.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs"
            >
              <span>Contact Compliance Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
