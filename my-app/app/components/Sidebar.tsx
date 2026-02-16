"use client";

import { Conversation } from "../types/interface";
import HistoryItem from "./HistoryItem";

interface SidebarProps {
    conversations: Conversation[];
    activeId: string | null;
    onSelect: (id: string) => void;
    onNewChat: () => void;
}

export default function Sidebar({
    conversations,
    activeId,
    onSelect,
    onNewChat,
}: SidebarProps) {
    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-screen border-r border-gray-700">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <button
                    onClick={onNewChat}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    New Chat
                </button>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-2">
                {conversations.length === 0 ? (
                    <div className="text-gray-500 text-sm text-center mt-8 px-4">
                        No conversations yet. Start by asking a question!
                    </div>
                ) : (
                    <div className="space-y-1">
                        {conversations.map((conv) => (
                            <HistoryItem
                                key={conv.id}
                                conversation={conv}
                                isActive={conv.id === activeId}
                                onClick={() => onSelect(conv.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
                Smart Reasoning System
            </div>
        </div>
    );
}
