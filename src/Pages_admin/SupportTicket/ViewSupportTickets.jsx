import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


function ViewSupportTickets() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const ticketId = state?.ticketId;
  const contextMenuRef = useRef(null); // Ref to context menu

  if (!ticketId) {
    return <div>No ticket selected. Please go back and select a ticket.</div>;
  }

  useEffect(() => {

    axios
      .get(
        `https://create-courier-8.onrender.com/admin/auth/support-tickets/${ticketId}/messages`
      )
      .then((response) => setMessages(response.data));

  }, [ticketId]);

  // Function to send a message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      axios
        .post(
          `https://create-courier-8.onrender.com/admin/auth/support-tickets/${ticketId}/messages`,
          {
            text: inputValue,
            sender: "admin", // Sending message as support
          }
        )
        .then((response) => {
          setMessages(response.data);
          setInputValue("");
        });
    }
  };

  // Handle right-click event to show the context menu
  const handleContextMenu = (e, messageId, sender) => {
    // Only show context menu for admin messages
    if (sender === "admin") {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY, messageId });
    }
  };

  // Handle "Unsend" click event
  const handleUnsendMessage = (messageId) => {
    // Optimistic update: remove message immediately from the UI
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== messageId)
    );

    // Send delete request to the server
    axios
      .delete(
        `https://create-courier-8.onrender.com/admin/auth/support-tickets/${ticketId}/messages/${messageId}`
      )
      .then(() => {
        setContextMenu(null); // Close the context menu
      })
      .catch((error) => {
        console.error("Error unsending message:", error);

        // Handle the error appropriately, or you can skip re-adding the message
        // in case of an error if you want silent failure.
        setMessages(
          (prevMessages) => prevMessages.filter((msg) => msg.id !== messageId) // No re-add here
        );
      });
  };

  // Close the context menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setContextMenu(null); // Close the context menu
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <div className="min-h-[calc(100vh-187px)] flex flex-col  border rounded bg-white">

      <div className="bg-blue-600 text-white p-2 text-center font-semibold flex justify-between">
        <div className="flex justify-center items-center">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
        </div>
        <div>
          Chat with User
        </div>
        <div>

        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id} // Assuming each message has a unique `id`
            className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            onContextMenu={(e) => handleContextMenu(e, msg._id, msg.sender)} // Pass sender to the handler
          >
            <div
              className={`${msg.sender === "admin"
                ? "bg-blue-500 text-white" // Admin messages
                : "bg-gray-300 text-gray-800" // User messages
                } rounded-lg p-2 max-w-xs`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef} // Attach the ref to the context menu div
          className="absolute bg-white border rounded shadow-lg p-2"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
        >
          <button
            onClick={() => handleUnsendMessage(contextMenu.messageId)}
            className="text-red-500"
          >
            Unsend
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="flex p-2 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ViewSupportTickets;
