"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Save,
  Trash2,
  Edit3,
  Globe,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowLeft,
  PlusCircle,
  RotateCcw,
} from "lucide-react";

interface MultilingualField {
  en: string;
  mr: string;
  hi: string;
}

interface DynamicItem {
  id: string;
  type: "announcement" | "news" | "event_update" | "notice";
  title: MultilingualField;
  content: MultilingualField;
  category: MultilingualField;
  date: string;
  author?: string;
  priority?: "normal" | "high" | "urgent";
  status: "published" | "draft";
  createdAt: string;
}

export default function AdminContentManager() {
  const [items, setItems] = useState<DynamicItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [type, setType] = useState<"announcement" | "news" | "event_update" | "notice">("announcement");
  const [priority, setPriority] = useState<"normal" | "high" | "urgent">("normal");

  // English source
  const [enTitle, setEnTitle] = useState("");
  const [enContent, setEnContent] = useState("");
  const [enCategory, setEnCategory] = useState("Announcement");

  // Marathi translation (reviewed & editable)
  const [mrTitle, setMrTitle] = useState("");
  const [mrContent, setMrContent] = useState("");
  const [mrCategory, setMrCategory] = useState("महत्त्वाची सूचना");

  // Hindi translation (reviewed & editable)
  const [hiTitle, setHiTitle] = useState("");
  const [hiContent, setHiContent] = useState("");
  const [hiCategory, setHiCategory] = useState("सूचना");

  const [translationMode, setTranslationMode] = useState<"none" | "generated">("none");
  const [isMockMode, setIsMockMode] = useState(false);

  // Fetch all existing content
  const loadContent = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to load content from database." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Clear form
  const resetForm = () => {
    setEditingId(null);
    setType("announcement");
    setPriority("normal");
    setEnTitle("");
    setEnContent("");
    setEnCategory("Announcement");
    setMrTitle("");
    setMrContent("");
    setMrCategory("महत्त्वाची सूचना");
    setHiTitle("");
    setHiContent("");
    setHiCategory("सूचना");
    setTranslationMode("none");
  };

  // Populate form for editing existing record
  const handleEdit = (item: DynamicItem) => {
    setEditingId(item.id);
    setType(item.type);
    setPriority(item.priority || "normal");
    setEnTitle(item.title.en);
    setEnContent(item.content.en);
    setEnCategory(item.category.en);
    setMrTitle(item.title.mr);
    setMrContent(item.content.mr);
    setMrCategory(item.category.mr);
    setHiTitle(item.title.hi);
    setHiContent(item.content.hi);
    setHiCategory(item.category.hi);
    setTranslationMode("generated");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Trigger Google Translation API
  const handleAutoTranslate = async () => {
    if (!enTitle.trim() || !enContent.trim()) {
      setNotification({
        type: "error",
        message: "Please enter English Title and Content before requesting translation.",
      });
      return;
    }

    try {
      setIsTranslating(true);
      setNotification(null);

      const res = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: enTitle.trim(),
          content: enContent.trim(),
          category: enCategory.trim(),
        }),
      });

      const data = await res.json();

      if (data.success && data.translations) {
        const trans = data.translations;
        if (trans.title) {
          setMrTitle(trans.title.mr || "");
          setHiTitle(trans.title.hi || "");
        }
        if (trans.content) {
          setMrContent(trans.content.mr || "");
          setHiContent(trans.content.hi || "");
        }
        if (trans.category) {
          setMrCategory(trans.category.mr || "");
          setHiCategory(trans.category.hi || "");
        }

        setIsMockMode(Boolean(trans.isMock));
        setTranslationMode("generated");

        setNotification({
          type: "success",
          message: trans.isMock
            ? "Translations generated in development fallback mode. You can review and edit below."
            : "Complete sentences translated via Google Cloud Translation API! Review and refine below.",
        });
      } else {
        throw new Error(data.message || "Failed to translate");
      }
    } catch (err) {
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Error connecting to translation service.",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Save all 3 versions to database
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enTitle.trim() || !mrTitle.trim() || !hiTitle.trim()) {
      setNotification({
        type: "error",
        message: "Titles for all 3 languages (English, Marathi, Hindi) are required.",
      });
      return;
    }

    if (!enContent.trim() || !mrContent.trim() || !hiContent.trim()) {
      setNotification({
        type: "error",
        message: "Content for all 3 languages (English, Marathi, Hindi) is required.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        id: editingId || undefined,
        type,
        priority,
        status: "published",
        title: { en: enTitle, mr: mrTitle, hi: hiTitle },
        content: { en: enContent, mr: mrContent, hi: hiContent },
        category: { en: enCategory, mr: mrCategory, hi: hiCategory },
      };

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setNotification({
          type: "success",
          message: editingId
            ? "Record updated in database! All 3 translations saved."
            : "Record saved and published to database with English, Marathi & Hindi!",
        });
        resetForm();
        loadContent();
      } else {
        throw new Error(data.message || "Save failed");
      }
    } catch (err) {
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to persist to database.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content item?")) return;

    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/content?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setNotification({ type: "success", message: "Item deleted from database." });
        loadContent();
        if (editingId === id) resetForm();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to delete item.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-24">
      {/* Top Admin Navbar */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Website
            </Link>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h1 className="text-sm font-bold tracking-wide uppercase text-neutral-200">
                Admin Content Hub
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3 h-3" />
              Live Announcements Hub
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Notifications */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center justify-between border ${
              notification.type === "success"
                ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-300"
                : "bg-rose-950/50 border-rose-500/30 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-xs opacity-60 hover:opacity-100 uppercase tracking-wider"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Workflow Explanation Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-neutral-300">
            <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
              <span className="font-bold text-amber-400 block mb-1">1. Enter English</span>
              Write official notices or announcements in full natural sentences.
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
              <span className="font-bold text-amber-400 block mb-1">2. Auto-Translate</span>
              Google Cloud Translation API generates Hindi & Marathi translations instantly on the server.
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
              <span className="font-bold text-amber-400 block mb-1">3. Human Review</span>
              Admin reviews and refines cultural words (*श्री प्रतिष्ठान*, *स्वागत यात्रा*).
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
              <span className="font-bold text-amber-400 block mb-1">4. Save 3 Versions</span>
              Zero ongoing API calls for visitors. Stored directly in the database.
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSave} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-6">
            <div>
              <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                {editingId ? <Edit3 className="w-5 h-5 text-amber-400" /> : <PlusCircle className="w-5 h-5 text-amber-400" />}
                {editingId ? "Edit & Review Multilingual Content" : "Create New Dynamic Content"}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Type in English, click Auto-Translate, review Marathi & Hindi, then save.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-neutral-200 bg-neutral-800 hover:bg-neutral-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Cancel Edit
                </button>
              )}

              <button
                type="button"
                onClick={handleAutoTranslate}
                disabled={isTranslating || !enTitle || !enContent}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Sparkles className={`w-4 h-4 ${isTranslating ? "animate-spin" : ""}`} />
                {isTranslating ? "Translating with Google..." : "Auto-Translate with Google"}
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save to Database"}
              </button>
            </div>
          </div>

          {/* Metadata Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Content Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="announcement">Announcement (महत्त्वाची सूचना)</option>
                <option value="notice">Official Notice (कार्यालयीन परिपत्रक)</option>
                <option value="event_update">Festival / Event Update (सण व उपक्रम)</option>
                <option value="news">Press / Media Release (वृत्त / बातमी)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="normal">Normal (साधारण)</option>
                <option value="high">High (महत्त्वाचे)</option>
                <option value="urgent">Urgent / Highlight (तात्काळ / अग्रक्रम)</option>
              </select>
            </div>
          </div>

          {/* Tri-Language Side-by-Side Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: English Source */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  1. English (Source)
                </span>
                <span className="text-[10px] text-neutral-500 uppercase font-mono">Primary Input</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  Category Tag (e.g. Cultural Festival)
                </label>
                <input
                  type="text"
                  value={enCategory}
                  onChange={(e) => setEnCategory(e.target.value)}
                  placeholder="e.g. Cultural Festival"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  Headline / Title (Complete sentence)
                </label>
                <input
                  type="text"
                  value={enTitle}
                  onChange={(e) => setEnTitle(e.target.value)}
                  placeholder="e.g. Blood Donation Drive Scheduled for Next Sunday"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  Detailed Content / Announcement
                </label>
                <textarea
                  rows={6}
                  value={enContent}
                  onChange={(e) => setEnContent(e.target.value)}
                  placeholder="Write complete sentences here. For example: Shree Pratishtan invites youth volunteers from Indira Nagar to participate in our grand cleanliness drive..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* Column 2: Marathi Translation (Human-in-the-loop editable) */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                  2. मराठी (Review & Edit)
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                  Editable
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  वर्गवारी (Category in Marathi)
                </label>
                <input
                  type="text"
                  value={mrCategory}
                  onChange={(e) => setMrCategory(e.target.value)}
                  placeholder="उदा. सांस्कृतिक उत्सव"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  शीर्षक (Title in Marathi)
                </label>
                <input
                  type="text"
                  value={mrTitle}
                  onChange={(e) => setMrTitle(e.target.value)}
                  placeholder="मराठी शीर्षक येथे दिसेल"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-orange-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  सविस्तर मजकूर (Content in Marathi)
                </label>
                <textarea
                  rows={6}
                  value={mrContent}
                  onChange={(e) => setMrContent(e.target.value)}
                  placeholder="येथे गूगल ट्रान्सलेटद्वारे आलेला मराठी मजकूर दिसेल. आवश्यकतेनुसार शब्द दुरुस्त करा."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {/* Column 3: Hindi Translation (Human-in-the-loop editable) */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                  3. हिन्दी (Review & Edit)
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                  Editable
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  श्रेणी (Category in Hindi)
                </label>
                <input
                  type="text"
                  value={hiCategory}
                  onChange={(e) => setHiCategory(e.target.value)}
                  placeholder="उदा. सांस्कृतिक उत्सव"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  शीर्षक (Title in Hindi)
                </label>
                <input
                  type="text"
                  value={hiTitle}
                  onChange={(e) => setHiTitle(e.target.value)}
                  placeholder="हिन्दी शीर्षक यहाँ दिखेगा"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-sky-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  विस्तृत विवरण (Content in Hindi)
                </label>
                <textarea
                  rows={6}
                  value={hiContent}
                  onChange={(e) => setHiContent(e.target.value)}
                  placeholder="यहाँ गूगल ट्रांसलेट द्वारा तैयार हिन्दी अनुवाद दिखेगा। आवश्यकतानुसार बदलाव करें।"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>
          </div>
        </form>

        {/* Existing Dynamic Content Database Records */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              Published Multilingual Records in Database ({items.length})
            </h3>
            <span className="text-xs text-neutral-500">
              All 3 translations stored in database &amp; served without runtime Google API calls
            </span>
          </div>

          {items.length === 0 ? (
            <div className="p-8 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 text-neutral-500 text-xs">
              No dynamic records found. Use the form above to publish your first announcement.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {item.type}
                      </span>
                      {item.priority === "urgent" && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300">
                          Urgent
                        </span>
                      )}
                      <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium text-neutral-300 hover:text-amber-400 bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit Translations
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 bg-neutral-800 hover:bg-rose-950/50 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Multilingual Preview Tabs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    {/* EN */}
                    <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        English
                      </span>
                      <h4 className="text-xs font-semibold text-neutral-200 line-clamp-1">{item.title.en}</h4>
                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">{item.content.en}</p>
                    </div>

                    {/* MR */}
                    <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block mb-1">
                        मराठी
                      </span>
                      <h4 className="text-xs font-semibold text-neutral-200 line-clamp-1">{item.title.mr}</h4>
                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">{item.content.mr}</p>
                    </div>

                    {/* HI */}
                    <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
                        हिन्दी
                      </span>
                      <h4 className="text-xs font-semibold text-neutral-200 line-clamp-1">{item.title.hi}</h4>
                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">{item.content.hi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
