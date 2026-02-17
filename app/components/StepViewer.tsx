import { StepViewerProps } from "../types/interface";

export default function StepViewer({ steps }: StepViewerProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-200 group"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="flex items-start gap-3">
            {/* Step Number Badge */}
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h2>

              {/* Reason */}
              <div className="mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Reasoning
                </span>
                <p className="text-gray-700 mt-1 leading-relaxed">
                  {step.reason}
                </p>
              </div>

              {/* Result */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Result
                </span>
                <p className="text-gray-800 font-medium mt-1 leading-relaxed">
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
