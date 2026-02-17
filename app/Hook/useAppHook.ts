"use client";
import { useState } from 'react'
import { Conversation } from '../types/interface';

export const useAppHook = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const activeConversation = conversations.find((c) => c.id === activeId) || null;
    const [input, setInput] = useState("");

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
    const InputhandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleSubmit(input);
        setInput(""); // Clear input after submission
    };

    const truncateText = (text: string, maxLength: number = 40) => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    return {
        conversations,
        activeId,
        loading,
        error,
        isSidebarOpen,
        activeConversation,
        truncateText,
        handleSubmit,
        handleNewChat,
        setIsSidebarOpen,
        handleSelectConversation,
        InputhandleSubmit,
        input,
        setInput,
    }
}
