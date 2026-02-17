import { InputBoxProps } from "../Types/Interface";

export default function InputBox(props: InputBoxProps) {
  return (
    <form
      onSubmit={props.handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4 transition-all duration-200 hover:shadow-xl"
    >
      <textarea
        value={props.input}
        onChange={(e) => props.setInput(e.target.value)}
        placeholder="Enter your problem or question here..."
        className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-800 placeholder-gray-400"
        disabled={props.loading || props.isDisabled}
      />

      <button
        type="submit"
        disabled={props.loading || !props.input.trim() || props.isDisabled}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {props.loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Thinking...
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
