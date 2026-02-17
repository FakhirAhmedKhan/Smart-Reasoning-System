import { FinalAnswerProps } from "../types/interface";

export default function FinalAnswer({ answer }: FinalAnswerProps) {
  return (
    <div className="relative overflow-hidden p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-green-900">
            Final Answer
          </h2>
        </div>
        <p className="text-green-950 text-lg leading-relaxed font-medium">
          {answer}
        </p>
      </div>
    </div>
  );
}
