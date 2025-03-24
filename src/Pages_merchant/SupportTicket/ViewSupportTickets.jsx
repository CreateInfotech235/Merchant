import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { socket } from "../../Components_merchant/Api/Api";

function ViewSupportTickets() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const ticketId = state?.ticketId;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [nowmessage, setNowmessage] = useState(0);
  const [hasScrolledToRead, setHasScrolledToRead] = useState(false); // Track if scrolled once
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  if (!ticketId) {
    return <div>No ticket selected. Please go back and select a ticket.</div>;
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/mobile/auth/support-tickets/${ticketId}/messages`
        );
        setMessages(response.data);

        // Scroll only ONCE to the last read message
        if (!hasScrolledToRead) {
          const lastreadMessage = response.data
            .filter((msg) => msg.sender.toLowerCase() === "admin")
            .findLast((msg) => msg.isRead === true);

          if (lastreadMessage) {
            setTimeout(() => {
              const readElement = document.getElementById(lastreadMessage._id);
              if (readElement) {
                readElement.scrollIntoView({ behavior: "instant", block: "end" });
                setHasScrolledToRead(true); // Prevent multiple scrolling
              }
            }, 300);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.connect();
    socket.on("SupportTicketssendMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      if (message.sender.toLowerCase() === "admin") {
        setNowmessage((prev) => prev + 1);
      }

      // Auto-scroll only if the user is near the bottom
      if (isNearBottom) {
        scrollToBottom();
      }
    });

    return () => {
      socket.off("SupportTicketssendMessage");
      socket.disconnect();
    };
  }, [ticketId, isNearBottom, hasScrolledToRead]);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Track scroll position
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    if (distanceToBottom < 100) {
      setNowmessage(0);
    }

    setIsNearBottom(distanceToBottom < 100); // If distance < 100px, consider near bottom
  };

  useEffect(() => {
    const chatBox = chatContainerRef.current;
    if (chatBox) {
      chatBox.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatBox) {
        chatBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      axios
        .post(
          `http://localhost:8001/mobile/auth/support-tickets/${ticketId}/messages`,
          { text: inputValue, sender: "merchant" }
        )
        .then(() => {
          setInputValue("");
          scrollToBottom(); // Always scroll when sending a message
        });
    }
  };

  return (
    <div className="border rounded bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-2 text-center font-semibold flex justify-between">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div>Chat with Admin</div>
        <div></div>
      </div>

      {/* Chat Box */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-auto p-2 space-y-2 "
        style={{ height: "calc(100vh - 300px)" }}
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex w-[97%] ${msg.sender === "merchant" ? "justify-end" : "justify-start"
              }`}
            id={msg._id?.toString()}
          >
            <div
              className={`${msg.sender === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
                } rounded-lg p-2 max-w-xs`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {!isNearBottom && (
          <div className="text-center  w-[40px]  h-[40px] rounded-full bg-blue-500 text-white fixed bottom-[130px] right-[40px] m-2 flex justify-center items-center"
            onClick={scrollToBottom}
          >
            <FaArrowDown className="text-lg" />
            {nowmessage > 0 && (
              <div className="absolute top-0 right-1 font-semibold mb-3 mr-1 rounded-full">
                {nowmessage}
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="flex p-2 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
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
