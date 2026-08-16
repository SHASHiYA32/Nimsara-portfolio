"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  Send,
  CheckCircle,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/supabase/client";

export interface DatabaseComment {
  id: number;
  author: string | null;
  role: string | null;
  company: string | null;
  content: string | null;
  rating: string | null;
  created_at: string;
}

export default function ContactGuestbook() {
  const supabase = createClient();
  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Guestbook Comments State
  const [comments, setComments] = useState<DatabaseComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  // New Comment Input State (including rating selection)
  const [newComment, setNewComment] = useState({
    name: "",
    role: "",
    company: "",
    text: "",
    rating: 5,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Fetch comments from Supabase on mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoadingComments(true);
      const { data, error } = await supabase
        .from("initial_comments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching comments:", error);
      } else if (data) {
        setComments(data);
      }
    } catch (err) {
      console.error("Unexpected error fetching comments:", err);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 800);
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return;

    try {
      const { data, error } = await supabase
        .from("initial_comments")
        .insert([
          {
            author: newComment.name,
            role: newComment.role || "Guest Visitor",
            company: newComment.company || "Community Member",
            content: newComment.text,
            rating: newComment.rating.toString(),
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting comment:", error);
        return;
      }

      if (data) {
        setComments([data[0], ...comments]);
        setNewComment({ name: "", role: "", company: "", text: "", rating: 5 });
        setCurrentPage(1); // Reset to first page to see the new comment
        setCommentSuccess(true);
        setTimeout(() => setCommentSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Unexpected error posting comment:", err);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  return (
    <div className="space-y-20 py-16 border-t border-white/10">
      {/* 5. CONTACT SECTION */}
      <section
        id="contact"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="mb-6">
            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
              // GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Send a Message
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Have an exciting project, full-stack role, or consulting
              opportunity? Fill out the transparent Glass Form below
            </p>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>
                Thank you! Your inquiry has been received. I will reply within
                24 hours.
              </span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">
                PROJECT DETAILS / MESSAGE *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your timeline, tech stack, and goals..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full glass-input px-4 py-3 rounded-xl text-sm placeholder:text-zinc-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Direct Info & Quick Stats */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4 uppercase font-mono tracking-wider">
              Direct Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400">Direct Email</span>
                <a
                  href="mailto:shashinthanimsara.perera@gmail.com"
                  className="text-white font-mono hover:underline"
                >
                  shashinthanimsara.perera@gmail.com
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400">Location</span>
                <span className="text-white font-mono">Kandy, Sri Lanka</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400">Phone</span>
                <span className="text-white font-mono">+94 72 351 3533</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400">Response Rate</span>
                <span className="text-emerald-400 font-mono font-bold">
                  100% within 24h
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/20 to-transparent">
            <h3 className="text-sm font-bold text-white mb-2">
              Need a High-Impact Developer?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ready to build scalable full-stack applications, optimize web
              performance, and deliver exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* 6. GUESTBOOK SECTION */}
      <section id="guestbook" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
              // COMMUNITY FEEDBACK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
              Guestbook & Endorsements
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm">
            Leave a public note or testimonial. Comments render live on the dark
            glass wall.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Comment Input Form */}
          <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white">Sign the Guestbook</h3>

            {commentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs animate-in fade-in">
                ✓ Comment posted successfully to the live wall!
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={newComment.name}
                  onChange={(e) =>
                    setNewComment({ ...newComment, name: e.target.value })
                  }
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Role (e.g. Developer)"
                  value={newComment.role}
                  onChange={(e) =>
                    setNewComment({ ...newComment, role: e.target.value })
                  }
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
                <input
                  type="text"
                  placeholder="Company (Optional)"
                  value={newComment.company}
                  onChange={(e) =>
                    setNewComment({ ...newComment, company: e.target.value })
                  }
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              {/* Interactive Star Rating Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase">
                  Select Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() =>
                        setNewComment({ ...newComment, rating: star })
                      }
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (hoverRating || newComment.rating) >= star
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-mono text-amber-400">
                    {newComment.rating} / 5
                  </span>
                </div>
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="Your testimonial or public message..."
                  value={newComment.text}
                  onChange={(e) =>
                    setNewComment({ ...newComment, text: e.target.value })
                  }
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-all"
              >
                Post Public Comment
              </button>
            </form>
          </div>

          {/* Comments Cards List & Pagination */}
          <div className="lg:col-span-7 space-y-4">
            {isLoadingComments ? (
              <div className="glass-card p-8 rounded-2xl text-center text-xs text-zinc-400 font-mono">
                Loading community feedback...
              </div>
            ) : comments.length === 0 ? (
              <div className="glass-card p-8 rounded-2xl text-center text-xs text-zinc-400 font-mono">
                No comments yet. Be the first to sign the guestbook!
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {currentComments.map((comment) => {
                    const parsedRating = parseInt(comment.rating || "5", 10);
                    const avatarSeed = comment.author || "Guest";
                    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(avatarSeed)}`;

                    return (
                      <div
                        key={comment.id}
                        className="glass-card p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={avatarUrl}
                              alt={comment.author || "User"}
                              className="w-9 h-9 rounded-full object-cover border border-white/10"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                              }}
                            />
                            <div>
                              <h4 className="text-xs font-bold text-white">
                                {comment.author}
                              </h4>
                              <p className="text-[10px] text-zinc-400 font-mono">
                                {comment.role}{" "}
                                {comment.company ? `• ${comment.company}` : ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center text-amber-400 gap-0.5">
                            {[
                              ...Array(isNaN(parsedRating) ? 5 : parsedRating),
                            ].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-zinc-300 italic leading-relaxed">
                          &ldquo;{comment.content}&rdquo;
                        </p>

                        <div className="text-[10px] text-zinc-500 font-mono text-right">
                          {new Date(comment.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls (Hidden if 0 comments[cite: 1]) */}
                {comments.length > 0 && (
                  <div className="flex items-center justify-between pt-4 px-2">
                    <span className="text-[10px] font-mono text-zinc-400">
                      Showing {indexOfFirstComment + 1}-
                      {Math.min(indexOfLastComment, comments.length)} of{" "}
                      {comments.length} comments
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="text-xs font-mono text-zinc-300 px-2">
                        {currentPage} / {totalPages || 1}
                      </span>

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
