"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Check, 
  X,
  Shield
} from "lucide-react";
import { 
  deletePageAction, 
  bulkDeletePagesAction, 
  bulkUpdatePagesStatusAction, 
  createPageAction 
} from "@/actions/admin";
import { RichTextEditor } from "./rich-text-editor";

export interface PageItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  seo_title: string;
  seo_description: string;
  is_published: boolean;
  updated_at: string;
}

interface PagesListClientProps {
  initialPages: PageItem[];
}

export function PagesListClient({ initialPages }: PagesListClientProps) {
  const router = useRouter();
  const [pages, setPages] = useState<PageItem[]>(initialPages);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">("all");
  const [bulkAction, setBulkAction] = useState("");
  const [isPending, startTransition] = useTransition();

  // Modal State for Add New Page
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [addError, setAddError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setNewTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setNewSlug(generatedSlug);
  };

  // Filtered pages based on search and tab
  const filteredPages = pages.filter((page) => {
    const matchesSearch = 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (page.subtitle && page.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === "published") return page.is_published;
    if (activeTab === "draft") return !page.is_published;
    return true;
  });

  const publishedCount = pages.filter((p) => p.is_published).length;
  const draftCount = pages.filter((p) => !p.is_published).length;

  // Toggle selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allSelectable = filteredPages.map((p) => p.id);
      setSelectedIds(allSelectable);
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: number) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Execute bulk action
  const handleApplyBulkAction = () => {
    if (!bulkAction) return;
    if (selectedIds.length === 0) {
      alert("Please select at least one page to apply bulk actions.");
      return;
    }

    if (bulkAction === "delete") {
      if (!confirm(`Are you sure you want to permanently delete the ${selectedIds.length} selected pages?`)) {
        return;
      }
      startTransition(async () => {
        const res = await bulkDeletePagesAction(selectedIds);
        if (res.success) {
          setPages((prev) => prev.filter((p) => !selectedIds.includes(p.id) || p.slug === "home"));
          setSelectedIds([]);
          setBulkAction("");
          router.refresh();
        } else {
          alert(res.error || "Failed to delete selected pages.");
        }
      });
    } else if (bulkAction === "publish") {
      startTransition(async () => {
        const res = await bulkUpdatePagesStatusAction(selectedIds, true);
        if (res.success) {
          setPages((prev) => 
            prev.map((p) => selectedIds.includes(p.id) ? { ...p, is_published: true } : p)
          );
          setSelectedIds([]);
          setBulkAction("");
          router.refresh();
        }
      });
    } else if (bulkAction === "draft") {
      startTransition(async () => {
        const res = await bulkUpdatePagesStatusAction(selectedIds, false);
        if (res.success) {
          setPages((prev) => 
            prev.map((p) => selectedIds.includes(p.id) ? { ...p, is_published: false } : p)
          );
          setSelectedIds([]);
          setBulkAction("");
          router.refresh();
        }
      });
    }
  };

  // Delete single page
  const handleDeleteSingle = (id: number, title: string, slug: string) => {
    if (slug === "home") {
      alert("The Homepage is a protected system core page and cannot be deleted.");
      return;
    }

    if (!confirm(`Are you sure you want to delete "${title}" (/ ${slug})?`)) {
      return;
    }

    startTransition(async () => {
      const res = await deletePageAction(id);
      if (res.success) {
        setPages((prev) => prev.filter((p) => p.id !== id));
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        router.refresh();
      } else {
        alert(res.error || "Failed to delete page.");
      }
    });
  };

  // Create new page
  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    setCreating(true);

    try {
      const initialContentJson = JSON.stringify({
        hero: {
          badge: "Corporate Document",
          title: newTitle.trim(),
          description: newSubtitle.trim() || "",
          backgroundImage: "/images/hero-apparel.png"
        },
        richBody: newContent,
        lastUpdated: "October 2026",
        sections: []
      }, null, 2);

      const res = await createPageAction({
        title: newTitle.trim(),
        slug: newSlug.trim(),
        subtitle: newSubtitle.trim(),
        content_json: initialContentJson,
        seo_title: `${newTitle.trim()} | Nisha Fashions Wear`,
        seo_description: newSubtitle.trim() || `Read the official ${newTitle.trim()} of Nisha Fashions Wear.`,
        is_published: true
      });

      if (res.success && res.slug) {
        setIsAddModalOpen(false);
        router.push(`/admin/pages/${res.slug}`);
      } else {
        setAddError(res.error || "Failed to create new page.");
      }
    } catch (err: any) {
      setAddError(err?.message || "An unexpected error occurred.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-7xl mx-auto space-y-5">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Pages
          </h1>
        </div>

        <button
          type="button"
          onClick={() => {
            setNewTitle("");
            setNewSlug("");
            setNewSubtitle("");
            setNewContent("");
            setAddError(null);
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Page</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border/60 text-xs w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === "all"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All <span className="opacity-70">({pages.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("published")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === "published"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Published <span className="opacity-70">({publishedCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("draft")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === "draft"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Drafts <span className="opacity-70">({draftCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bulk Actions Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-card border border-border/70 text-xs">
        <div className="flex items-center gap-2">
          <select
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-primary"
          >
            <option value="">Bulk Actions</option>
            <option value="publish">Mark as Published</option>
            <option value="draft">Move to Draft</option>
            <option value="delete">Delete Selected</option>
          </select>
          <button
            type="button"
            onClick={handleApplyBulkAction}
            disabled={!bulkAction || selectedIds.length === 0 || isPending}
            className="px-3.5 py-1.5 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? "Applying..." : "Apply"}
          </button>
        </div>

        <div className="text-muted-foreground text-xs font-medium">
          {selectedIds.length > 0 ? (
            <span className="text-primary font-semibold">
              {selectedIds.length} of {filteredPages.length} selected
            </span>
          ) : (
            <span>Showing {filteredPages.length} pages</span>
          )}
        </div>
      </div>

      {/* Pages Table - whitespace-nowrap, no line break, full text shown */}
      <div className="bg-card border border-border/70 rounded-2xl overflow-x-auto shadow-xs w-full">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border/60 text-muted-foreground uppercase text-[10px] font-semibold whitespace-nowrap">
            <tr>
              <th className="py-3.5 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    filteredPages.length > 0 &&
                    selectedIds.length === filteredPages.length
                  }
                  className="rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-4">Title</th>
              <th className="py-3.5 px-4">Summary</th>
              <th className="py-3.5 px-4">Route</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Last Modified</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 whitespace-nowrap">
            {filteredPages.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground text-xs">
                  No pages found matching your search.
                </td>
              </tr>
            ) : (
              filteredPages.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                const isHome = p.slug === "home";

                return (
                  <tr 
                    key={p.id} 
                    className={`transition-colors group ${
                      isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleRow(p.id)}
                        className="rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                      />
                    </td>

                    {/* Page Title & Quick Actions */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted/80 border border-border/60 flex items-center justify-center shrink-0">
                          {isHome ? (
                            <Shield className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <FileText className="w-3.5 h-3.5 text-foreground/70" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/pages/${p.slug}`}
                              className="font-semibold text-foreground text-sm hover:text-primary transition-colors"
                            >
                              {p.title}
                            </Link>
                            {isHome && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-primary/10 text-primary border border-primary/20">
                                System Core
                              </span>
                            )}
                          </div>
                          
                          {/* Quick Row Action Links */}
                          <div className="flex items-center gap-2 pt-1 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                              href={`/admin/pages/${p.slug}`}
                              className="text-primary font-medium hover:underline"
                            >
                              Edit
                            </Link>
                            <span className="text-border">|</span>
                            <Link
                              href={`/${p.slug === "home" ? "" : p.slug}`}
                              target="_blank"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              View
                            </Link>
                            {!isHome && (
                              <>
                                <span className="text-border">|</span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSingle(p.id, p.title, p.slug)}
                                  className="text-destructive hover:underline cursor-pointer"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Full Subtitle / Summary (No line break) */}
                    <td className="py-4 px-4 text-muted-foreground text-xs">
                      {p.subtitle || "—"}
                    </td>

                    {/* Route URL */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center font-mono text-[11px] px-2 py-1 rounded bg-muted/70 text-foreground/80 border border-border/40">
                        /{p.slug === "home" ? "" : p.slug}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-4">
                      {p.is_published ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Published</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Clock className="w-3 h-3" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>

                    {/* Modified Date */}
                    <td className="py-4 px-4 text-muted-foreground text-[11px]">
                      {p.updated_at ? new Date(p.updated_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      }) : "Recent"}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/${p.slug === "home" ? "" : p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          title="Preview Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/pages/${p.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background font-semibold text-xs hover:bg-foreground/90 transition-colors shadow-2xs"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </Link>
                        {!isHome && (
                          <button
                            type="button"
                            onClick={() => handleDeleteSingle(p.id, p.title, p.slug)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            title="Delete Page"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Page Modal Dialog with Embedded Rich Text & Image Options */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="w-full max-w-3xl bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Create New Page
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {addError && (
              <div className="p-3 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{addError}</span>
              </div>
            )}

            <form onSubmit={handleCreatePage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Sustainability & CSR"
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                    URL Route Slug *
                  </label>
                  <div className="flex items-center bg-background border border-border rounded-xl px-3.5 py-2 text-xs">
                    <span className="text-muted-foreground font-mono mr-1">/</span>
                    <input
                      type="text"
                      required
                      value={newSlug}
                      onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "-"))}
                      placeholder="sustainability"
                      className="w-full bg-transparent text-foreground font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                  Subtitle / Summary
                </label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="Summary text for hero banner..."
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Rich Text Editor with Image Options */}
              <div className="space-y-1.5">
                <RichTextEditor
                  label="Page Content & Media"
                  value={newContent}
                  onChange={setNewContent}
                  placeholder="Write page content here... Click 'Add Image' in the toolbar to insert photos from the library or URLs."
                  minHeight="240px"
                />
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !newTitle || !newSlug}
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {creating ? "Creating..." : "Create Page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default PagesListClient;
