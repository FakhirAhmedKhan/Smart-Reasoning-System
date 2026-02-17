"use client";

import { MainContentProps } from "../TS/Interface";
import InputBox from "./InputBox";
import StepViewer from "./StepViewer";
import FinalAnswer from "./FinalAnswer";

export default function MainContent(props: MainContentProps) {
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center py-6 sm:py-8 lg:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Smart Reasoning System
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Break down complex problems into structured steps
          </p>
        </div>

        <InputBox
          onSubmit={props.onSubmit}
          loading={props.loading}
          handleSubmit={props.handleSubmit}
          input={props.input}
          setInput={props.setInput}
          isDisabled={props.isDisabled}
        />

        {props.error && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl sm:rounded-2xl shadow-sm animate-in fade-in duration-300">
            <div className="flex items-start gap-2 sm:gap-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm sm:text-base">{props.error}</p>
            </div>
          </div>
        )}

        {props.activeConversation && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Problem
              </h3>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                {props.activeConversation.problem}
              </p>
            </div>

            {props.activeConversation.steps.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
                  Reasoning Steps
                </h3>
                <StepViewer steps={props.activeConversation.steps} />
              </div>
            )}

            {props.activeConversation.finalAnswer && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
                  Conclusion
                </h3>
                <FinalAnswer answer={props.activeConversation.finalAnswer} />
              </div>
            )}
          </div>
        )}

        {!props.activeConversation && !props.loading && (
          <div className="text-center py-12 sm:py-16 text-gray-400">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-base sm:text-lg">No conversation selected</p>
            <p className="text-xs sm:text-sm mt-2">
              Submit a problem to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
