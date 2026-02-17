"use client";
import { useState, useEffect } from 'react'
import { Conversation, User } from '../types/Interface';

export const useAppHook = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [input, setInput] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const isDisabled = !user && conversations.length > 0;
    const activeConversation = conversations.find((c) => c.id === activeId) || null;

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogin = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setShowLoginModal(false);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        setConversations([]);
        setActiveId(null);
    };

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
            LoginHandleSubmit,
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

            // Trigger login modal after first successful chat if not logged in
            if (!user && conversations.length === 0) {
                setTimeout(() => setShowLoginModal(true), 1500); // Small delay for UX
            }
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

        // Block if not logged in and not first chat
        if (!user && conversations.length > 0) {
            setShowLoginModal(true);
            return;
        }

        handleSubmit(input);
        setInput(""); // Clear input after submission
    };

    const truncateText = (text: string, maxLength: number = 40) => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    const LoginHandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !email.trim()) {
            setError("Both fields are required");
            return;
        }
        setError("");
        handleLogin({ username, email });
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
        isDisabled,
        setInput,
        user,
        showLoginModal,
        handleLogin,
        handleLogout,
        username,
        setUsername,
        email,
        setEmail,
        LoginHandleSubmit,
    }
}
