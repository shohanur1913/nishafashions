"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  updateEnquiryStatusAction, 
  deleteEnquiryAction,
  replyEnquiryEmailAction 
} from "@/actions/admin";
import { 
  Inbox, 
  Mail, 
  Phone, 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Send, 
  AlertCircle, 
  Settings, 
  RefreshCw, 
  History, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

interface EnquiryReply {
  id: number;
  enquiry_id: number;
  to_email: string;
  subject: string;
  message: string;
  sender_name: string;
  sent_at: string;
}

interface EnquiriesClientProps {
  initialEnquiries: any[];
  initialReplies?: EnquiryReply[];
  isSmtpConfigured: boolean;
  senderEmail?: string;
  senderName?: string;
}

export function EnquiriesClient({ 
  initialEnquiries, 
  initialReplies = [], 
  isSmtpConfigured,
  senderEmail = "info@nishafashions.com",
  senderName = "Nisha Fashions Wear",
}: EnquiriesClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [replies, setReplies] = useState<EnquiryReply[]>(initialReplies);
  const detailRef = useRef<HTMLDivElement>(null);

  // Email Reply Composer State
  const [isComposerOpen, setIsComposerOpen] = useState(true);
  const [replyTo, setReplyTo] = useState("");
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyStatus, setReplyStatus] = useState("quoted");
  const [sendingReply, setSendingReply] = useState(false);
  const [replySuccessMsg, setReplySuccessMsg] = useState<string | null>(null);
  const [replyErrorMsg, setReplyErrorMsg] = useState<string | null>(null);

  const selectEnquiry = (enq: any) => {
    setSelectedEnquiry(enq);
    setReplyTo(enq.email || "");
    const category = enq.category || "Apparel";
    setReplySubject(`Quotation Response — ${category} Sourcing RFQ | ${senderName}`);
    setReplyMessage(
      `Dear ${enq.name || "Buyer"},\n\nThank you for reaching out to Nisha Fashions Wear regarding your ${category} production requirement.\n\nWe have reviewed your inquiry and would be pleased to provide you with indicative FOB pricing, sampling timeline, and fabric recommendations.\n\nCould you please confirm if you have tech packs, spec sheets, or target FOB price points for this order?\n\nLooking forward to working together.\n\nBest regards,\nMerchandising Team\nNisha Fashions Wear`
    );
    setReplySuccessMsg(null);
    setReplyErrorMsg(null);

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const filtered = initialEnquiries.filter((enq) => {
    if (activeTab === "all") return true;
    return enq.status === activeTab;
  });

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateEnquiryStatusAction(id, status);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
      router.refresh();
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await deleteEnquiryAction(id);
      setSelectedEnquiry(null);
      router.refresh();
    } catch (err: any) {
      alert("Error deleting enquiry: " + err.message);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setSendingReply(true);
    setReplySuccessMsg(null);
    setReplyErrorMsg(null);

    try {
      const res = await replyEnquiryEmailAction({
        enquiryId: selectedEnquiry.id,
        to: replyTo,
        subject: replySubject,
        message: replyMessage,
        newStatus: replyStatus,
      });

      if (res.success) {
        setReplySuccessMsg(`Email response successfully delivered to ${replyTo}!`);
        // Update local state
        const newReplyObj: EnquiryReply = {
          id: Date.now(),
          enquiry_id: selectedEnquiry.id,
          to_email: replyTo,
          subject: replySubject,
          message: replyMessage,
          sender_name: senderName,
          sent_at: new Date().toISOString(),
        };
        setReplies([newReplyObj, ...replies]);
        setSelectedEnquiry({ ...selectedEnquiry, status: replyStatus });
        router.refresh();
      } else {
        setReplyErrorMsg(res.error || "Failed to dispatch email via SMTP server.");
      }
    } catch (err: any) {
      setReplyErrorMsg(err.message || "An error occurred while sending email.");
    } finally {
      setSendingReply(false);
    }
  };

  // Quick message template presets
  const applyTemplate = (type: "quote" | "more_info" | "sample") => {
    if (!selectedEnquiry) return;
    const cat = selectedEnquiry.category || "Apparel";
    const name = selectedEnquiry.name || "Buyer";

    if (type === "quote") {
      setReplyMessage(
        `Dear ${name},\n\nThank you for reaching out to Nisha Fashions Wear regarding your ${cat} inquiry (${selectedEnquiry.quantity || "bulk"} units).\n\nBased on your specified quantity, we are pleased to confirm that we can accommodate this production run at our compliant partner facilities in Dhaka.\n\nIndicative FOB Price: [Enter Price / Pc, e.g. $4.50 - $6.20 FOB Chittagong]\nLead Time: 60-75 days upon lab dip & PP sample approval.\nPayment Terms: LC at sight / TT.\n\nPlease let us know if this meets your target so we can proceed with developing proto samples.\n\nBest regards,\nNisha Fashions Wear`
      );
    } else if (type === "more_info") {
      setReplyMessage(
        `Dear ${name},\n\nThank you for contacting Nisha Fashions Wear.\n\nTo provide you with an exact FOB quotation and mill allocation for ${cat}, could you please share:\n1. Tech pack / Measurement spec sheet (CAD or PDF)\n2. Fabric GSM and composition preference (e.g. 100% Combed Cotton, CVC, French Terry)\n3. Order breakdown per color/size\n4. Target port and required delivery date\n\nOnce received, our senior merchandising desk will return a detailed cost breakdown within 24-48 hours.\n\nBest regards,\nMerchandising Desk\nNisha Fashions Wear`
      );
    } else if (type === "sample") {
      setReplyMessage(
        `Dear ${name},\n\nThank you for your interest in Nisha Fashions Wear.\n\nWe would be happy to prepare proto samples and lab dips for your ${cat} order. Our typical sample turnaround is 7-10 business days.\n\nPlease confirm your delivery courier account (DHL / FedEx) so we can dispatch the samples immediately once ready.\n\nBest regards,\nSampling Department\nNisha Fashions Wear`
      );
    }
  };

  const tabs = [
    { id: "all", label: "All Enquiries", count: initialEnquiries.length },
    { id: "new", label: "New", count: initialEnquiries.filter((e) => e.status === "new").length },
    { id: "in_progress", label: "In Progress", count: initialEnquiries.filter((e) => e.status === "in_progress").length },
    { id: "quoted", label: "Quoted", count: initialEnquiries.filter((e) => e.status === "quoted").length },
    { id: "closed", label: "Closed", count: initialEnquiries.filter((e) => e.status === "closed").length },
  ];

  // Filter replies for currently selected inquiry
  const selectedReplies = selectedEnquiry
    ? replies.filter((r) => r.enquiry_id === selectedEnquiry.id)
    : [];

  return (
    <div className="space-y-6">
      
      {/* Top Banner if SMTP not configured */}
      {!isSmtpConfigured && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-semibold block">SMTP Server is Not Configured Yet</span>
              <span className="text-amber-800 text-[11px]">
                Configure your outbound SMTP credentials to send one-click email replies and quotation offers directly to buyers.
              </span>
            </div>
          </div>
          <Link
            href="/admin/settings"
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-semibold text-xs hover:bg-amber-700 transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-xs"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Setup SMTP Now</span>
          </Link>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === tab.id ? "bg-background text-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid: List on Left, Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Enquiry List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 rounded-2xl bg-card border border-border/70 text-center text-xs text-muted-foreground">
              No enquiries found in this category.
            </div>
          ) : (
            filtered.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              const date = new Date(enq.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              const replyCount = replies.filter((r) => r.enquiry_id === enq.id).length;

              return (
                <div
                  key={enq.id}
                  onClick={() => selectEnquiry(enq)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                    isSelected
                      ? "bg-muted/70 border-foreground shadow-xs"
                      : "bg-card border-border/70 hover:border-foreground/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-xs">{enq.name}</span>
                      {enq.company && (
                        <span className="text-[11px] text-muted-foreground truncate max-w-[130px]">• {enq.company}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{date}</span>
                  </div>

                  <p className="text-xs text-foreground/80 line-clamp-2 leading-relaxed">
                    {enq.message || "No message provided."}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-muted-foreground font-mono">
                        {enq.category || "Apparel"} • {enq.quantity || "N/A"}
                      </span>
                      {replyCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary/10 text-primary font-semibold">
                          {replyCount} {replyCount === 1 ? "reply" : "replies"}
                        </span>
                      )}
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      enq.status === "new"
                        ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                        : enq.status === "quoted"
                        ? "bg-blue-500/10 text-blue-700 border border-blue-500/20"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed View */}
        <div ref={detailRef} className="lg:col-span-7 space-y-6">
          {selectedEnquiry ? (
            <div className="p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                      {selectedEnquiry.name}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedEnquiry.status === "new"
                        ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                        : selectedEnquiry.status === "quoted"
                        ? "bg-blue-500/10 text-blue-700 border border-blue-500/20"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {selectedEnquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedEnquiry.company ? `${selectedEnquiry.company} • ` : ""}
                    Received on {new Date(selectedEnquiry.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Delete Enquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Direct Communication Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent("Quotation Response — Nisha Fashions Wear")}`}
                  className="p-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/70 transition-colors flex items-center gap-3 text-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-muted-foreground block">Email Address</span>
                    <span className="font-semibold text-foreground truncate block">{selectedEnquiry.email}</span>
                  </div>
                </a>

                {selectedEnquiry.phone ? (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors flex items-center gap-3 text-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                      <WhatsAppIcon className="w-4 h-4 shrink-0" fill="#ffffff" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-emerald-700 block font-medium">WhatsApp Buyer</span>
                      <span className="font-semibold text-foreground truncate block">{selectedEnquiry.phone}</span>
                    </div>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-muted/20 border border-border/40 flex items-center gap-3 text-xs text-muted-foreground">
                    <Phone className="w-4 h-4 opacity-40" />
                    <span>No Phone Provided</span>
                  </div>
                )}
              </div>

              {/* Order Parameters */}
              <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/50 space-y-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Order & Sourcing Parameters
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Product Category:</span>
                    <strong className="text-foreground">{selectedEnquiry.category || "General Apparel"}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Target Quantity:</span>
                    <strong className="text-foreground">{selectedEnquiry.quantity || "Not specified"}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Destination:</span>
                    <strong className="text-foreground">{selectedEnquiry.country || "International"}</strong>
                  </div>
                </div>
              </div>

              {/* Buyer Message */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Buyer Requirement Details / Tech Pack Notes
                </h4>
                <div className="p-4 rounded-2xl bg-background border border-border text-xs leading-relaxed text-foreground whitespace-pre-line font-normal">
                  {selectedEnquiry.message || "No additional message provided."}
                </div>
              </div>

              {/* ============================================================= */}
              {/* EMAIL REPLY COMPOSER (WHEN SMTP CONFIGURED) */}
              {/* ============================================================= */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
                      Send Direct Reply via SMTP
                    </h4>
                    {isSmtpConfigured && (
                      <span className="px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-semibold">
                        Ready
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(!isComposerOpen)}
                    className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {isComposerOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isComposerOpen && (
                  <>
                    {!isSmtpConfigured ? (
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 space-y-2">
                        <p className="font-medium">
                          SMTP server is not configured. Configure your outgoing mail server under Settings to enable in-app email replies.
                        </p>
                        <Link
                          href="/admin/settings"
                          className="inline-flex items-center gap-1.5 font-semibold text-amber-900 underline hover:opacity-80"
                        >
                          <span>Open Mail Settings</span>
                          <span>→</span>
                        </Link>
                      </div>
                    ) : (
                      <form onSubmit={handleSendReply} className="space-y-4">
                        
                        {/* Quick Presets */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                            Templates:
                          </span>
                          <button
                            type="button"
                            onClick={() => applyTemplate("quote")}
                            className="px-2.5 py-1 rounded-lg bg-muted text-[11px] font-medium text-foreground hover:bg-muted/80 border border-border/50 cursor-pointer"
                          >
                            Indicative FOB Quote
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTemplate("more_info")}
                            className="px-2.5 py-1 rounded-lg bg-muted text-[11px] font-medium text-foreground hover:bg-muted/80 border border-border/50 cursor-pointer"
                          >
                            Request Tech Pack / Specs
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTemplate("sample")}
                            className="px-2.5 py-1 rounded-lg bg-muted text-[11px] font-medium text-foreground hover:bg-muted/80 border border-border/50 cursor-pointer"
                          >
                            Sample Turnaround Offer
                          </button>
                        </div>

                        {/* Recipient & Subject */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-medium text-muted-foreground block">To Email</label>
                            <input
                              type="email"
                              required
                              value={replyTo}
                              onChange={(e) => setReplyTo(e.target.value)}
                              className="w-full px-3 py-1.5 bg-background border border-border rounded-xl text-xs text-foreground font-mono focus:outline-none focus:border-foreground"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-medium text-muted-foreground block">Subject</label>
                            <input
                              type="text"
                              required
                              value={replySubject}
                              onChange={(e) => setReplySubject(e.target.value)}
                              className="w-full px-3 py-1.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                            />
                          </div>
                        </div>

                        {/* Message Content */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-muted-foreground block">
                            Reply Message Body
                          </label>
                          <textarea
                            rows={8}
                            required
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground leading-relaxed focus:outline-none focus:border-foreground resize-y font-sans"
                            placeholder="Type your response to the buyer..."
                          />
                        </div>

                        {/* Status update option & Send button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">After sending, set status to:</span>
                            <select
                              value={replyStatus}
                              onChange={(e) => setReplyStatus(e.target.value)}
                              className="px-2.5 py-1 rounded-lg bg-background border border-border text-xs text-foreground focus:outline-none"
                            >
                              <option value="quoted">Quoted</option>
                              <option value="in_progress">In Progress</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            disabled={sendingReply}
                            className="px-5 py-2 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 shadow-xs"
                          >
                            {sendingReply ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Sending Email...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>Send Reply via SMTP</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Feedback alerts */}
                        {replySuccessMsg && (
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{replySuccessMsg}</span>
                          </div>
                        )}

                        {replyErrorMsg && (
                          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                            <span>{replyErrorMsg}</span>
                          </div>
                        )}

                      </form>
                    )}
                  </>
                )}
              </div>

              {/* ============================================================= */}
              {/* PAST REPLIES HISTORY */}
              {/* ============================================================= */}
              {selectedReplies.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-muted-foreground" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Past Sent Replies ({selectedReplies.length})
                    </h4>
                  </div>

                  <div className="space-y-2.5">
                    {selectedReplies.map((r) => (
                      <div key={r.id} className="p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground border-b border-border/40 pb-1">
                          <span className="font-semibold text-foreground">
                            Sent to {r.to_email} by {r.sender_name}
                          </span>
                          <span>{new Date(r.sent_at).toLocaleString()}</span>
                        </div>
                        <div className="font-medium text-foreground text-[11px]">Subject: {r.subject}</div>
                        <div className="text-foreground/80 whitespace-pre-line text-[11px] pt-1">
                          {r.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Status Buttons */}
              <div className="pt-4 border-t border-border/60 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                  Quick Status Marker
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry.id, "new")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer border ${
                      selectedEnquiry.status === "new"
                        ? "bg-foreground text-background font-semibold"
                        : "bg-muted/40 hover:bg-muted"
                    }`}
                  >
                    Mark as New
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry.id, "in_progress")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer border ${
                      selectedEnquiry.status === "in_progress"
                        ? "bg-foreground text-background font-semibold"
                        : "bg-muted/40 hover:bg-muted"
                    }`}
                  >
                    Mark In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry.id, "quoted")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer border ${
                      selectedEnquiry.status === "quoted"
                        ? "bg-foreground text-background font-semibold"
                        : "bg-muted/40 hover:bg-muted"
                    }`}
                  >
                    Mark Quoted
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry.id, "closed")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer border ${
                      selectedEnquiry.status === "closed"
                        ? "bg-foreground text-background font-semibold"
                        : "bg-muted/40 hover:bg-muted"
                    }`}
                  >
                    Mark Closed
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-16 rounded-3xl bg-card border border-border/70 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Inbox className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-foreground">Select an Enquiry</h4>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
