"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  updateEnquiryStatusAction, 
  deleteEnquiryAction 
} from "@/actions/admin";
import { 
  Inbox, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Eye, 
  X, 
  Search, 
  Building2, 
  Globe2, 
  Tag
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

interface EnquiryItem {
  id: number;
  type: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  category?: string;
  quantity?: string;
  message?: string;
  details_json?: string;
  status: string;
  created_at: string;
}

interface AdminDashboardEnquiriesProps {
  initialEnquiries: EnquiryItem[];
}

export function AdminDashboardEnquiries({ initialEnquiries = [] }: AdminDashboardEnquiriesProps) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const filtered = enquiries.filter((enq) => {
    const matchesTab = activeTab === "all" ? true : enq.status === activeTab;
    if (!matchesTab) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      enq.name?.toLowerCase().includes(q) ||
      enq.company?.toLowerCase().includes(q) ||
      enq.email?.toLowerCase().includes(q) ||
      enq.country?.toLowerCase().includes(q) ||
      enq.category?.toLowerCase().includes(q) ||
      enq.message?.toLowerCase().includes(q)
    );
  });

  const handleStatusChange = async (id: number, nextStatus: string) => {
    setUpdatingId(id);
    try {
      await updateEnquiryStatusAction(id, nextStatus);
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: nextStatus });
      }
      router.refresh();
    } catch (err: any) {
      alert("Failed to update status: " + (err.message || "Unknown error"));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry? This action cannot be undone.")) return;
    try {
      await deleteEnquiryAction(id);
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
      router.refresh();
    } catch (err: any) {
      alert("Failed to delete enquiry: " + (err.message || "Unknown error"));
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "in_review":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "quoted":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "closed":
        return "bg-muted text-muted-foreground border-border/60";
      default:
        return "bg-muted text-muted-foreground border-border/60";
    }
  };

  const counts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    in_review: enquiries.filter((e) => e.status === "in_review").length,
    quoted: enquiries.filter((e) => e.status === "quoted").length,
    closed: enquiries.filter((e) => e.status === "closed").length,
  };

  return (
    <div className="bg-card border border-border/70 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xs w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-base sm:text-lg text-foreground tracking-tight">
              Buyer Enquiries &amp; Quotation Submissions
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary">
              Live DB
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Synchronized directly with <code className="text-foreground font-mono">/admin/enquiries</code> database records
          </p>
        </div>

        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium transition-colors self-start sm:self-auto shrink-0 shadow-xs"
        >
          <span>Open Full Enquiries Inbox</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {(["all", "new", "in_review", "quoted", "closed"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-xl whitespace-nowrap transition-colors border cursor-pointer ${
                activeTab === tab
                  ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/60"
              }`}
            >
              <span className="capitalize">{tab.replace("_", " ")}</span>
              <span className="ml-1.5 text-[10px] opacity-75">
                ({counts[tab]})
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by buyer, email, item..."
            className="w-full pl-8 pr-3 py-1.5 bg-muted/30 border border-border/70 rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
          />
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="border border-border/60 rounded-xl overflow-x-auto shadow-2xs">
        <table className="w-full text-left text-xs min-w-[760px]">
          <thead className="bg-muted/40 border-b border-border/60 text-muted-foreground uppercase text-[10px] font-semibold">
            <tr>
              <th className="py-3 px-4">Buyer / Company</th>
              <th className="py-3 px-4">Category &amp; Target Quantity</th>
              <th className="py-3 px-4">Message / Requirements</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Received</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/40">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-xs text-muted-foreground">
                  No enquiries found matching this filter.
                </td>
              </tr>
            ) : (
              filtered.map((enq) => {
                const dateStr = enq.created_at
                  ? new Date(enq.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent";

                const cleanPhone = enq.phone ? enq.phone.replace(/[^0-9+]/g, "") : "";

                return (
                  <tr key={enq.id} className="hover:bg-muted/30 transition-colors">
                    {/* Buyer Details */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-foreground text-sm">
                            {enq.name || "Anonymous Buyer"}
                          </span>
                          {enq.country && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border/40">
                              <Globe2 className="w-2.5 h-2.5 opacity-60" />
                              {enq.country}
                            </span>
                          )}
                        </div>

                        {enq.company && (
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Building2 className="w-3 h-3 opacity-60 shrink-0" />
                            <span className="truncate">{enq.company}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-0.5">
                          {enq.email && (
                            <a
                              href={`mailto:${enq.email}`}
                              className="hover:text-primary transition-colors truncate max-w-[180px]"
                              title={enq.email}
                            >
                              {enq.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category & Quantity */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-primary/10 text-primary border border-primary/20">
                          <Tag className="w-2.5 h-2.5" />
                          {enq.category || "General Apparel"}
                        </span>
                        {enq.quantity && (
                          <p className="text-[11px] font-mono text-muted-foreground font-medium">
                            Qty: <strong className="text-foreground">{enq.quantity}</strong>
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Message Preview */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {enq.message || "No custom message provided."}
                      </p>
                    </td>

                    {/* Interactive Status Selector */}
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status || "new"}
                        disabled={updatingId === enq.id}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none transition-colors ${statusBadge(
                          enq.status
                        )}`}
                      >
                        <option value="new">New RFQ</option>
                        <option value="in_review">In Review</option>
                        <option value="quoted">Quoted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs text-muted-foreground font-mono whitespace-nowrap">
                      {dateStr}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-foreground transition-colors cursor-pointer"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone.replace("+", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 transition-colors"
                            title="WhatsApp Buyer"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Quick View Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-xl p-5 sm:p-6 space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-base text-foreground">
                  Inquiry Details #{selectedEnquiry.id}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                <div>
                  <span className="text-muted-foreground text-[10px] block">Buyer Name</span>
                  <strong className="text-foreground text-sm">{selectedEnquiry.name || "N/A"}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Company</span>
                  <strong className="text-foreground text-sm">{selectedEnquiry.company || "N/A"}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Email</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-primary hover:underline font-mono">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Phone / WhatsApp</span>
                  <span className="text-foreground font-mono">{selectedEnquiry.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Category</span>
                  <span className="text-foreground font-semibold">{selectedEnquiry.category || "General"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Target Quantity</span>
                  <span className="text-foreground font-semibold">{selectedEnquiry.quantity || "N/A"}</span>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground text-[10px] uppercase font-semibold block mb-1">
                  Message &amp; Requirements
                </span>
                <div className="p-3.5 rounded-xl bg-background border border-border/60 text-foreground leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedEnquiry.message || "No additional message."}
                </div>
              </div>

              {/* Status Update Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-medium">Status:</span>
                  <select
                    value={selectedEnquiry.status || "new"}
                    onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg border border-border bg-background text-xs font-semibold cursor-pointer"
                  >
                    <option value="new">New RFQ</option>
                    <option value="in_review">In Review</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/enquiries"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90"
                  >
                    <span>Reply in Enquiries Inbox</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
