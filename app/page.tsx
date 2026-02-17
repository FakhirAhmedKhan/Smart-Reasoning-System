"use client";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import LoginModal from "./components/LoginModal";
import { useAppHook } from "./Hook/useAppHook";

export default function Page() {
  const {
    conversations,
    activeId,
    isSidebarOpen,
    activeConversation,
    handleSubmit,
    handleNewChat,
    handleSelectConversation,
    setIsSidebarOpen,
    loading,
    error,
    input,
    setInput,
    InputhandleSubmit,
    truncateText,
    user,
    showLoginModal,
    handleLogin,
    LoginHandleSubmit,
    username,
    setUsername,
    email,
    setEmail,
    handleLogout,
    isDisabled,
  } = useAppHook();

  return (
    <div className="flex h-screen overflow-y-auto bg-white">
      <LoginModal
        isOpen={showLoginModal}
        LoginHandleSubmit={LoginHandleSubmit}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        error={error}
      />
      {isSidebarOpen ? (
        <div className="z-50 fixed">
          <Sidebar
            user={user}
            onLogout={handleLogout}
            conversations={conversations}
            activeId={activeId}
            onSelect={handleSelectConversation}
            onNewChat={handleNewChat}
            onClose={() => setIsSidebarOpen(false)}
            truncateText={truncateText}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-20 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg border border-gray-700"
          title="Open Sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "" : "w-full"}`}
      >
        <MainContent
          activeConversation={activeConversation}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          handleSubmit={InputhandleSubmit}
          input={input}
          setInput={setInput}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}
