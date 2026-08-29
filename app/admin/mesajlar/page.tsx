"use client";

import React, { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2, CheckCircle2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentRead }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead: !currentRead } : m))
        );
      }
    } catch (err) {
      alert("Hata oluştu");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      alert("Silme başarısız");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center">
            <Mail className="w-6 h-6 text-blue-400 mr-2.5" />
            <span>İletişim Mesajları Gelen Kutusu</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            İletişim formu üzerinden gelen müşteri mesajları ve talepler.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400 space-y-3">
          <Mail className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Gelen kutusu boş.</h3>
          <p className="text-xs max-w-sm mx-auto">
            İletişim formundan mesaj gönderildikçe burada listelenecektir.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-6 rounded-2xl border transition-all ${
                m.isRead
                  ? "bg-slate-900/60 border-slate-800 text-slate-300"
                  : "bg-slate-900 border-blue-500/40 text-white shadow-lg shadow-blue-500/5"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  {!m.isRead && (
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                  )}
                  <h3 className="text-sm font-bold text-white">{m.fullName}</h3>
                  <span className="text-xs text-slate-400">• {m.email}</span>
                  {m.phone && <span className="text-xs text-slate-400">• {m.phone}</span>}
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span>{formatDateTime(m.createdAt)}</span>
                  <button
                    onClick={() => toggleRead(m.id, m.isRead)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title={m.isRead ? "Okunmadı İşaretle" : "Okundu İşaretle"}
                  >
                    {m.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4 text-blue-400" />}
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-3 space-y-1.5 text-xs">
                <div className="font-bold text-amber-400">Konu: {m.subject}</div>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm pt-1">
                  {m.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
