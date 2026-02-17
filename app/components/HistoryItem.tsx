"use client";
import { HistoryItemProps } from "../TS/Interface";

export default function HistoryItem(props: HistoryItemProps) {
  return (
    <button
      onClick={props.onClick}
      className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all duration-200 group ${
        props.isActive
          ? "bg-gray-800 text-white shadow-md"
          : "text-gray-300 hover:bg-gray-800/50"
      }`}
    >
      <div className="flex items-start gap-2">
        <svg
          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
            props.isActive
              ? "text-blue-400"
              : "text-gray-500 group-hover:text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium truncate">
            {props.truncateText(props.conversation.problem, 40)}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
            {new Date(props.conversation.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </button>
  );
}
