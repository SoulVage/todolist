import React from "react";
import ReactMarkdown from "react-markdown";

function ChatMessage({ message, sender }) {
  return (
    <div
      dir="auto"
      className={`w-fit px-5 py-3 rounded-4xl text-right leading-8 ${
        sender == "ai"
          ? " mr-auto dark:text-white/70"
          : "max-w-80 x ml-auto bg-[#edeff1] dark:bg-white/10 dark:text-white/80"
      }`}
    >
      {sender == "ai" ? (
        <ReactMarkdown
          components={{
            strong: ({ children }) => (
              <strong style={{ fontSize: "1.1rem" }}>{children}</strong>
            ),
            h1: ({ children }) => (
              <h1 style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                {children}
              </h1>
            ),
            h3: ({ children }) => (
              <h3 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h3 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {children}
              </h3>
            ),
            h2: ({ children }) => (
              <h2 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                {children}
              </h2>
            ),
          }}
        >
          {message}
        </ReactMarkdown>
      ) : (
        message
      )}
    </div>
  );
}

export default ChatMessage;
