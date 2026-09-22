import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Search, ArrowLeft, Trash2, Reply, Mail, Inbox } from "lucide-react";
import { db } from "../firebase";
import { LoadingDots } from "./Common";

interface MessagesProps {
  notify: (text: string, type: "success" | "error") => void;
  setConfirmDialog: (dialog: { message: string; onConfirm: () => void } | null) => void;
}

interface MessageItem {
  id: string;
  name?: string;
  email?: string;
  message?: string;
  createdAt?: { seconds: number };
}

const Messages: React.FC<MessagesProps> = ({ notify, setConfirmDialog }) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const s = await getDocs(collection(db, "messages"));
      setMessages(s.docs.map(d => ({ id: d.id, ...d.data() }) as MessageItem));
    } catch (err) {
      notify("Failed to fetch messages", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const deleteMessage = async (id: string) => {
    setConfirmDialog({
      message: "Are you sure you want to delete this message?",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "messages", id));
          if (selectedMsgId === id) setSelectedMsgId(null);
          fetchMessages();
          notify("Message deleted", "success");
        } catch { notify("Failed to delete message", "error"); }
        setConfirmDialog(null);
      },
    });
  };

  if (loading && messages.length === 0) return <LoadingDots />;

  const query = searchQuery.trim().toLowerCase();
  const filtered = messages.filter(m =>
    m.name?.toLowerCase().includes(query) ||
    m.email?.toLowerCase().includes(query) ||
    m.message?.toLowerCase().includes(query)
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          Inbox
          <span className="px-2.5 py-0.5 bg-muted/60 text-primary text-xs font-bold rounded-full border border-border">
            {messages.length}
          </span>
        </h2>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search messages..."
            aria-label="Search messages"
            className="w-full pl-10 pr-4 py-2 bg-card/70 border border-border/70 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="max-w-xl mx-auto text-center bg-card/60 border border-border/60 rounded-3xl py-20 px-6 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-6">
            <Inbox className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-foreground font-bold text-lg mb-2">No messages yet</h3>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
            When visitors reach out to you through your portfolio contact form, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
          <div className={`flex-1 lg:max-w-sm flex flex-col bg-card/70 border border-border/60 rounded-2xl overflow-hidden backdrop-blur-xl ${selectedMsgId ? 'hidden lg:flex' : 'flex'}`}>
            <div className="overflow-y-auto custom-scrollbar flex-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">No messages match your search.</div>
              ) : (
                filtered.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMsgId(msg.id)}
                    className={`w-full text-left p-4 border-b border-border/50 transition-all duration-200 group
                      ${selectedMsgId === msg.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-muted/50 border-l-4 border-l-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-sm font-bold truncate ${selectedMsgId === msg.id ? 'text-primary' : 'text-foreground'}`}>
                        {msg.name}
                      </span>
                      {msg.createdAt?.seconds && (
                        <span className="text-[10px] text-muted-foreground flex-shrink-0 font-medium">
                          {new Date(msg.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 truncate font-medium">{msg.email}</p>
                    <p className="text-[13px] text-muted-foreground line-clamp-2 leading-snug">
                      {msg.message}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className={`flex-[2] flex flex-col bg-card/70 border border-border/60 rounded-2xl overflow-hidden overflow-y-auto backdrop-blur-xl ${!selectedMsgId ? 'hidden lg:flex items-center justify-center text-center p-12' : 'flex'}`}>
            {selectedMsgId ? (
              (() => {
                const msg = messages.find(m => m.id === selectedMsgId);
                if (!msg) return null;
                return (
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-border/60 flex justify-between items-center bg-card/50 backdrop-blur sticky top-0">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedMsgId(null)} aria-label="Back to message list"
                          className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                          {msg.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground leading-none mb-1">{msg.name}</h3>
                          <a href={`mailto:${msg.email}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">{msg.email}</a>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all flex items-center gap-2 text-xs font-bold"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="p-8 flex-1">
                      {msg.createdAt?.seconds && (
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-8 font-bold uppercase tracking-widest bg-muted/50 w-fit px-3 py-1 rounded-full border border-border">
                          <Mail className="w-3.5 h-3.5" />
                          {new Date(msg.createdAt.seconds * 1000).toLocaleString('en-US')}
                        </div>
                      )}

                      <div className="bg-muted/40 rounded-3xl p-8 border border-border/50 relative">
                        <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap relative z-10">{msg.message}</p>
                      </div>

                      <div className="mt-8">
                        <a
                          href={`mailto:${msg.email}?subject=${encodeURIComponent("Re: Portfolio Contact")}&body=${encodeURIComponent("\n\n--- Original Message ---\n" + (msg.message ?? ""))}`}
                          className="px-6 py-3 bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit"
                        >
                          <Reply className="w-4 h-4" />
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="max-w-xs mx-auto text-center">
                <h4 className="text-muted-foreground font-bold text-sm">Select a message</h4>
                <p className="text-muted-foreground/60 text-xs mt-1">Pick a message from the sidebar to view full details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default memo(Messages);