import { SidebarProps } from "../types/Interface";
import HistoryItem from "./HistoryItem";

export default function Sidebar(props: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen border-r border-gray-700 relative">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={props.onNewChat}
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
            onClick={props.onClose}
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
        {props.conversations.length === 0 ? (
          <div className="text-gray-500 text-sm text-center mt-8 px-4">
            No conversations yet. Start by asking a question!
          </div>
        ) : (
          <div className="space-y-1">
            {props.conversations.map((conv) => (
              <HistoryItem
                key={conv.id}
                conversation={conv}
                isActive={conv.id === props.activeId}
                onClick={() => props.onSelect(conv.id)}
                truncateText={props.truncateText}
              />
            ))}
          </div>
        )}
      </div>
      {/* //footer Section */}
      <div className="p-4 border-t border-gray-700 space-y-4">
        {props.user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                {props.user.username.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  {props.user.username}
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  {props.user.email}
                </p>
              </div>
            </div>
            <button
              onClick={props.onLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs bg-gray-800 hover:bg-red-900/40 hover:text-red-400 text-gray-400 rounded-lg transition-all border border-gray-700 hover:border-red-900/50"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <div className="text-xs text-center text-gray-500 py-2 italic font-light">
            Offline Mode
          </div>
        )}
        <div className="text-[10px] text-gray-500 text-center font-medium opacity-50">
          Smart Reasoning System
        </div>
      </div>
    </div>
  );
}
