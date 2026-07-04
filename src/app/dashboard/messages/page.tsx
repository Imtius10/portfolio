"use client";

import { useState, useEffect } from "react";
import { Toast } from "@/components/dashboard/Modal";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then(setMessages)
      .catch(console.error);
  }, []);

  const markRead = async (id: string) => {
    try {
      await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
    } catch {
      setToast({ message: "Failed", type: "error" });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        setToast({ message: "Deleted!", type: "success" });
      }
    } catch {
      setToast({ message: "Failed", type: "error" });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        <span className="text-emerald-400">Messages</span>
      </h1>

      {messages.length === 0 && (
        <p className="text-slate-500 text-center py-12">
          No messages yet.
        </p>
      )}

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-slate-800/50 rounded-xl p-5 border transition-colors ${
              msg.read
                ? "border-slate-700/50"
                : "border-emerald-400/30 bg-emerald-400/5"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-semibold">{msg.name}</h3>
                  <span className="text-slate-500 text-sm">{msg.email}</span>
                  {!msg.read && (
                    <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-400 text-xs rounded">
                      New
                    </span>
                  )}
                </div>
                {msg.subject && (
                  <p className="text-slate-400 text-sm mb-1">
                    Re: {msg.subject}
                  </p>
                )}
                <p className="text-slate-300">{msg.message}</p>
                <p className="text-slate-600 text-xs mt-2">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                {!msg.read && (
                  <button
                    onClick={() => markRead(msg.id)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
