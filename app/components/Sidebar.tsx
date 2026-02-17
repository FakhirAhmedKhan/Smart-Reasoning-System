import { SidebarProps } from "../types/interface";
import HistoryItem from "./HistoryItem";

export default function Sidebar({
    conversations,
    activeId,
    onSelect,
    onNewChat,
    onClose,
    truncateText,
}: SidebarProps) {
    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-screen border-r border-gray-700 relative">
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={onNewChat}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md text-sm"
                    >
                        <svg
                            className="w-4 h-4"
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
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                        title="Close Sidebar"
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
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
                                truncateText={truncateText}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
                Smart Reasoning System
            </div>
        </div>
    );
}
