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
    <div className="flex h-screen overflow-hidden bg-white">
      <LoginModal
        isOpen={showLoginModal}
        LoginHandleSubmit={LoginHandleSubmit}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        error={error}
      />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar
          user={user}
          onLogout={handleLogout}
          conversations={conversations}
          activeId={activeId}
          onSelect={(id) => {
            handleSelectConversation(id);
            // Close sidebar on mobile when item is selected
            if (window.innerWidth < 768) {
              setIsSidebarOpen(false);
            }
          }}
          onNewChat={handleNewChat}
          onClose={() => setIsSidebarOpen(false)}
          truncateText={truncateText}
        />
      </div>

      {/* Hamburger Menu Button (Mobile Only) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 p-2 md:hidden bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg border border-gray-700"
          title="Open Menu"
          aria-label="Open sidebar menu"
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
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
