"use client";

import { useState } from "react";
import { Conversation, ReasonStep } from "./types/interface";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function Page() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeConversation = conversations.find((c) => c.id === activeId) || null;

  const handleSubmit = async (problem: string) => {
    setLoading(true);
    setError("");

    // Create new conversation
    const newConversation: Conversation = {
      id: Date.now().toString(),
      problem,
      steps: [],
      finalAnswer: "",
      createdAt: new Date().toISOString(),
    };

    // Add to conversations and set as active
    setConversations((prev) => [newConversation, ...prev]);
    setActiveId(newConversation.id);

    try {
      const res = await fetch("/api/reason", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        // Remove the failed conversation
        setConversations((prev) => prev.filter((c) => c.id !== newConversation.id));
        setActiveId(null);
        return;
      }

      // Update conversation with results
      setConversations((prev) =>
        prev.map((c) =>
          c.id === newConversation.id
            ? {
              ...c,
              steps: data.steps || [],
              finalAnswer: data.finalAnswer || "",
            }
            : c
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server");
      // Remove the failed conversation
      setConversations((prev) => prev.filter((c) => c.id !== newConversation.id));
      setActiveId(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setActiveId(null);
    setError("");
  };

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setError("");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {isSidebarOpen ? (
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
          onNewChat={handleNewChat}
          onClose={() => setIsSidebarOpen(false)}
        />
      ) : (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-20 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg border border-gray-700"
          title="Open Sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? '' : 'w-full'}`}>
        <MainContent
          activeConversation={activeConversation}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
