import { FinalAnswerProps } from "../TS/Interface";

export default function FinalAnswer({ answer }: FinalAnswerProps) {
  return (
    <div className="relative overflow-hidden p-4 sm:p-5 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl sm:rounded-2xl shadow-lg">
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
      <div className="relative">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
          <h2 className="text-lg sm:text-xl font-bold text-green-900">
            Final Answer
          </h2>
        </div>
        <p className="text-green-950 text-base sm:text-lg leading-relaxed font-medium break-words">
          {answer}
        </p>
      </div>
    </div>
  );
}
