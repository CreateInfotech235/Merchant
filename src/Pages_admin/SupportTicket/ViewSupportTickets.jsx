import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { socket } from "../../Components_admin/Api/Api";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";

function ViewSupportTickets() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const ticketId = state?.ticketId;
  const Subject = state?.Subject;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [nowmessage, setNowmessage] = useState(0);
  const [hasScrolledToRead, setHasScrolledToRead] = useState(false); // Track if scrolled once
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputMessageRef = useRef(null);

  const [showdropdown, setShowdropdown] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState(null);

  if (!ticketId) {
    return <div>No ticket selected. Please go back and select a ticket.</div>;
  }



  const setAllMessagesRead = async () => {
    try {
      const response = await axios.patch(
        `https://create-courier-8.onrender.com/admin/auth/support-tickets/${ticketId}/messages`,
      );
      if (response.data) {
        setMessages(prevMessages =>
          prevMessages.map(msg => ({
            ...msg,
            isRead: msg.sender.toLowerCase() === "merchant" ? true : msg.isRead
          }))
        );
      }
    } catch (error) {
      console.error("Error setting messages as read:", error);
    }
  }



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://create-courier-8.onrender.com/admin/auth/support-tickets/${ticketId}/messages`
        );
        setMessages(response.data);

        if (!hasScrolledToRead) {
          const adminMessages = response.data.filter((msg) => msg.sender.toLowerCase() === "merchant");
          const allMessagesRead = adminMessages.every((msg) => msg.isRead === true);

          if (allMessagesRead) {
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
              setHasScrolledToRead(true);
            }, 300);
          } else {
            const lastreadMessage = adminMessages.findLast((msg) => msg.isRead === true);
            if (lastreadMessage) {
              setTimeout(() => {
                const readElement = document.getElementById(lastreadMessage._id);
                if (readElement) {
                  readElement.scrollIntoView({ behavior: "instant", block: "end" });
                  setHasScrolledToRead(true);
                }
              }, 300);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };


    fetchMessages();

    // socket connection aollradey
    socket.connect();
    socket.on("SupportTicketssendMessage", (message) => {
      if (message.ticketId == ticketId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        setAllMessagesRead();
        if (message.sender.toLowerCase() === "merchant") {
          setNowmessage((prev) => prev + 1);
          if (isNearBottom) {
            scrollToBottom();
          }
        }
      }
    });

    socket.on("messageRead", (message) => {
      if (message.ticketId == ticketId) {
        setMessages(message.update.messages);
      }
    });

    socket.on("messageDelete", (message) => {
      console.log(message, 'messawqedawdge');
      if (message.ticketId == ticketId) {
        setMessages(message.update.messages);
      }
    });

    return () => {
      socket.off("SupportTicketssendMessage");
      socket.off("messageRead");
      socket.off("messageDelete");
    };
  }, [ticketId, hasScrolledToRead]);

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

  function showdropdownfunction(msg) {
    setShowdropdown(msg);
    console.log(msg);
  }

  const editMessageown = async (msg) => {
    if (msg.sender !== 'admin') return;

    try {
      setIsEditing(true);
      const response = await axios.patch(
        `https://create-courier-8.onrender.com/admin/auth/support-tickets/${ticketId}/messages/${msg._id}`,
        { nowmessage: inputValue }
      );

      if (response.status === 200) {
        setMessages(messages.map(message =>
          message._id === msg._id
            ? { ...message, text: inputValue }
            : message
        ));
        setEditingMessage(null);
        setInputValue("");
        setShowdropdown(null);
      }
    } catch (error) {
      console.error("Error editing message:", error);
      alert("Failed to edit message");
    } finally {
      setIsEditing(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      try {
        setIsSending(true);
        if (editingMessage) {
          await editMessageown(editingMessage);
        } else {
          const response = await axios.post(
            `https://create-courier-8.onrender.com/admin/auth/support-tickets/${ticketId}/messages`,
            { text: inputValue, sender: "admin" }
          );
          setInputValue("");
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message");
      } finally {
        setIsSending(false);
        setTimeout(() => {
          inputMessageRef.current.focus();
        }, 10);
      }
    }
  };



  useEffect(() => {
    setAllMessagesRead();
  }, []);

  const deleteMessageown = async (msg) => {
    try {
      setDeletingMessageId(msg._id);
      setIsDeleting(true);

      const response = await axios.delete(
        `https://create-courier-8.onrender.com/admin/auth/support-tickets/${ticketId}/messages/${msg._id}`
      );

      setMessages(prevMessages => prevMessages.filter(message => message._id !== msg._id));
      setShowdropdown(null);

    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    } finally {
      setIsDeleting(false);
      setDeletingMessageId(null);
    }
  };

  return (
    <div className="border rounded bg-white" onClick={() => {
      showdropdownfunction(null);
    }}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-2 text-center font-semibold flex justify-between items-center">
        <Link to="/support-ticket" className="flex items-center">
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
        <h2 className="text-lg">Chat with Admin</h2>
        {Subject && (
          <div >
            Subject: {Subject}
          </div>
        )}
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
            className={`flex w-[97%] ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
            id={msg._id?.toString()}
          >
            <div
              className={`flex relative group ${msg.sender === "merchant"
                ? "bg-[#1976D2] text-white"
                : "bg-[#E3F2FD] text-gray-800"
                } rounded-lg p-2 max-w-lg ${deletingMessageId === msg._id ? "opacity-50" : ""
                }`}
              onClick={(e) => {
                if (msg.sender !== "merchant") {
                  e.stopPropagation();
                  showdropdownfunction(msg);
                }
              }}
            >
              <div className={`${msg.text.trim().split(" ").every(word => word.length > 50) ? "break-all " : ""}`}>
                {msg.text}
              </div>

              {deletingMessageId === msg._id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                </div>
              )}

              <div className={`absolute right-0 top-[-5px] hidden ${msg.sender === "merchant" ? "" : "group-hover:block"}`}>
                <MdOutlineArrowDropDown className="text-[25px] text-gray-500" />
              </div>

              {msg.sender === "admin" && (
                <div className="flex ml-[2px] items-end absolute bottom-[2px] right-[2px]">
                  <IoCheckmarkDoneSharp
                    className={`align-bottom text-xs ${msg.isRead ? "text-[#44b310]" : "text-[#979797]"}`}
                  />
                </div>
              )}

              {showdropdown?._id != null && showdropdown?._id == msg._id && (
                <div className="absolute top-[100%] right-[2px] flex flex-col gap-1 z-10 align-center bg-white rounded-md p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                    onClick={() => {
                      setEditingMessage(msg);
                      setInputValue(msg.text);
                      inputMessageRef.current.focus();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => deleteMessageown(msg)}
                    disabled={deletingMessageId === msg._id}
                  >
                    {deletingMessageId === msg._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {!isNearBottom && (
          <div className="text-center  w-[40px]  h-[40px] rounded-full bg-blue-500 text-white fixed bottom-[130px] right-[40px] m-2 flex justify-center items-center"
            onClick={scrollToBottom}
            onMouseLeave={() => {
              setShowdropdown(null);
            }}
          >
            <FaArrowDown className="text-lg" />
            {nowmessage > 0 && (
              <div className="absolute top-0 right-1 font-semibold mb-3 mr-1 rounded-full">
                {nowmessage}
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} className="h-[5px]"></div>
      </div>

      {/* Input Area */}
      <div className="flex p-2 border-t">
        <input
          type="text"
          placeholder={editingMessage ? "Edit message..." : "Type your message..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isSending && !isEditing) {
              handleSendMessage();
            } else if (e.key === "Escape" && editingMessage) {
              setEditingMessage(null);
              setInputValue("");
            }
          }}
          ref={inputMessageRef}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSending || isEditing}
        />

        <button
          onClick={handleSendMessage}
          disabled={isSending || isEditing}
          className={`ml-2 px-4 ${isSending || isEditing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded`}
        >
          {editingMessage
            ? isEditing ? "Updating..." : "Update"
            : isSending ? "Sending..." : "Send"
          }
        </button>
        {editingMessage && (
          <button
            onClick={() => {
              setEditingMessage(null);
              setInputValue("");
            }}
            disabled={isEditing}
            className={`ml-2 px-4 ${isEditing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-600'
              } text-white rounded`}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default ViewSupportTickets;
