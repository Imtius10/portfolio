"use client";

import { useState } from "react";
import { ProfileData } from "@/lib/types";
import { Mail, Phone, MessageCircle, Send, CheckCircle, Loader2 } from "lucide-react";

interface ContactProps {
  profile: ProfileData;
}

export default function Contact({ profile }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 light:bg-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-4">
            Get In <span className="text-emerald-400 light:text-emerald-600">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 light:bg-emerald-600 mx-auto rounded-full"></div>
          <p className="text-slate-400 light:text-slate-500 mt-4 max-w-xl mx-auto">
            Looking for a dedicated developer to join your team? Let&apos;s talk.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white light:text-slate-800 mb-4">
              Let&apos;s Connect
            </h3>
            <p className="text-slate-400 light:text-slate-500">
              I&apos;m actively seeking internships and junior full-stack roles.
              Whether you have an opportunity or want to collaborate, I&apos;d love to hear from you.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 bg-white/5 light:bg-slate-50 backdrop-blur-md rounded-xl border border-white/10 light:border-slate-200 hover:border-emerald-400/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-emerald-400 light:text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 light:text-slate-400">Email</p>
                  <p className="text-white light:text-slate-800">{profile.email}</p>
                </div>
              </a>

              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-4 p-4 bg-white/5 light:bg-slate-50 backdrop-blur-md rounded-xl border border-white/10 light:border-slate-200 hover:border-emerald-400/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-emerald-400 light:text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 light:text-slate-400">Phone</p>
                    <p className="text-white light:text-slate-800">{profile.phone}</p>
                  </div>
                </a>
              )}

              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 light:bg-slate-50 backdrop-blur-md rounded-xl border border-white/10 light:border-slate-200 hover:border-emerald-400/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-emerald-400 light:text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 light:text-slate-400">WhatsApp</p>
                    <p className="text-white light:text-slate-800">{profile.whatsapp}</p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Contact Form - glass */}
          <div className="bg-white/5 light:bg-slate-50 backdrop-blur-md rounded-xl p-6 border border-white/10 light:border-slate-200 shadow-lg shadow-black/10">
            <h3 className="text-xl font-semibold text-white light:text-slate-800 mb-4">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-slate-400 light:text-slate-500 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    suppressHydrationWarning
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 light:bg-white border border-slate-700 light:border-slate-200 rounded-lg text-white light:text-slate-800 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-slate-400 light:text-slate-500 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    suppressHydrationWarning
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 light:bg-white border border-slate-700 light:border-slate-200 rounded-lg text-white light:text-slate-800 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-slate-400 light:text-slate-500 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  suppressHydrationWarning
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900 light:bg-white border border-slate-700 light:border-slate-200 rounded-lg text-white light:text-slate-800 focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-400 light:text-slate-500 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900 light:bg-white border border-slate-700 light:border-slate-200 rounded-lg text-white light:text-slate-800 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-600/25"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : status === "sent" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
