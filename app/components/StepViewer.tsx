import { StepViewerProps } from "../TS/Interface";

export default function StepViewer({ steps }: StepViewerProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className="bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-200 group"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-md">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors break-words">
                {step.title}
              </h2>
              <div className="mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Reasoning
                </span>
                <p className="text-sm sm:text-base text-gray-700 mt-1 leading-relaxed break-words">
                  {step.reason}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <span className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Result
                </span>
                <p className="text-sm sm:text-base text-gray-800 font-medium mt-1 leading-relaxed break-words">
                  {step.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
