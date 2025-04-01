import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaArrowDown, FaArrowLeft, FaPaperclip, FaFile, FaFileImage, FaFilePdf, FaFileWord, FaFileAlt, FaDownload, FaTimes } from "react-icons/fa";
import { socket } from "../../Components_merchant/Api/Api";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";

function ViewSupportTickets() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const ticketId = state?.ticketId;
  const Subject = state?.Subject;
  const merchantName = state?.merchantName || "";

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [nowmessage, setNowmessage] = useState(0);
  const [hasScrolledToRead, setHasScrolledToRead] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputMessageRef = useRef(null);
  const fileInputRef = useRef(null);

  const [showdropdown, setShowdropdown] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoadingfile, setIsLoadingfile] = useState({});


  if (!ticketId) {
    return <div>No ticket selected. Please go back and select a ticket.</div>;
  }

  const setAllMessagesRead = async () => {
    try {
      const response = await axios.patch(
        `https://create-courier-8.onrender.com/mobile/auth/support-tickets/${ticketId}/messages`,
      );
      console.log(response.data, 'red');
      if (response.data.message === 'Messages read successfully' || response.data.message === 'Message read successfully') {
        console.log(messages, 'messages');
        const nowdata = messages.map(msg => ({
          ...msg,
          isRead: msg.sender.toLowerCase() === "admin" ? true : msg.isRead
        }))
        console.log(nowdata, 'nowdata');

        if (nowdata.length > 0) {
          setMessages(
            nowdata
          );
        }
      }
    } catch (error) {
      console.error("Error setting messages as read:", error);
    }
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://create-courier-8.onrender.com/mobile/auth/support-tickets/${ticketId}/messages`
        );
        console.log(response.data, 'response.data123');
        setMessages(response.data);

        if (!hasScrolledToRead) {
          const adminMessages = response.data.filter((msg) => msg.sender.toLowerCase() === "admin");
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

    socket.connect();
    socket.on("SupportTicketssendMessage", (message) => {
      if (message.ticketId == ticketId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        setAllMessagesRead();
        if (message.sender.toLowerCase() === "admin") {
          setNowmessage((prev) => prev + 1);
          if (isNearBottom) {
            setTimeout(() => {
              scrollToBottom();
            }, 100);
          }
        }
      }
    });

    socket.on("messageRead", (message) => {
      if (message.ticketId == ticketId) {
        setMessages(message.update);
      }
    });

    socket.on("messageDelete", (message) => {
      console.log(message, 'messawqedawdge');
      if (message.ticketId == ticketId) {
        setMessages(message.update);
      }
    });

    return () => {
      socket.off("SupportTicketssendMessage");
      socket.off("messageRead");
      socket.off("messageDelete");
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    if (distanceToBottom < 100) {
      setNowmessage(0);
    }

    setIsNearBottom(distanceToBottom < 100);
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
    console.log(msg, 'Edit');
    if (msg.sender !== 'merchant') return;

    try {
      setIsEditing(true);
      const response = await axios.patch(
        `https://create-courier-8.onrender.com/mobile/auth/support-tickets/${ticketId}/messages/${msg._id}`,
        { nowmessage: inputValue }
      );
      console.log(response, 'Edit');

      if (response.status === 200) {
        console.log(response.data, 'Edit');
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

  const getFileIcon = (fileType, sender) => {
    if (fileType?.startsWith('image/')) return <FaFileImage className="text-4xl text-blue-500" />;
    if (fileType === 'application/pdf') return <FaFilePdf className="text-4xl text-red-500" />;
    if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      return <FaFileWord className="text-4xl text-blue-600" />;
    return <FaFileAlt className={`text-4xl  ${sender !== "admin" ? "text-gray-500" : "text-[#ffffff]"}`} />;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() || selectedFile) {
      try {
        setIsSending(true);
        if (editingMessage) {
          await editMessageown(editingMessage);
        } else {
          let messageData = {
            text: inputValue,
            sender: "merchant",
            fileType: selectedFile?.type
          };

          if (selectedFile) {
            setIsUploading(true);
            const base64File = await convertToBase64(selectedFile);

            // Extract file extension from filename
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

            messageData.file = {
              data: base64File,
              name: selectedFile.name,
              type: selectedFile.type,
              extension: fileExtension,
            };
            setUploadProgress(100);
          }

          const response = await axios.post(
            `https://create-courier-8.onrender.com/mobile/auth/support-tickets/${ticketId}/messages`,
            messageData
          );

          // Reset all states after successful send
          setInputValue("");
          setSelectedFile(null);
          setFilePreview(null);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input
          }
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message");
      } finally {
        setIsSending(false);
        setIsUploading(false);
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
      console.log(msg._id, 'msg._id');

      const response = await axios.delete(
        `https://create-courier-8.onrender.com/mobile/auth/support-tickets/${ticketId}/messages/${msg._id}`
      );
      console.log(response.data, 'delete');
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
      <div className="bg-blue-600 text-white p-2 text-center font-semibold flex justify-between items-center">
        <Link to="/Show-list-of-support-ticket" className="flex items-center">
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

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-auto p-2 space-y-2"
        style={{ height: "calc(100vh - 300px)" }}
      >
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`flex w-[97%] ${msg.sender === "merchant" ? "justify-end" : "justify-start"}`}
            id={msg._id?.toString()}
          >
            <div
              className={`flex relative group ${msg.sender === "admin"
                ? "bg-[#1976D2] text-white"
                : "bg-[#E3F2FD] text-gray-800"
                } rounded-lg p-2 max-w-lg ${deletingMessageId === msg._id ? "opacity-50" : ""
                }`}
              onClick={(e) => {
                if (msg.sender !== "admin") {
                  e.stopPropagation();
                  showdropdownfunction(msg);
                }
              }}
            >
              {msg?.file?.data ? (
                <div className="flex flex-col items-center">
                  <div className="text-sm mb-2">{msg?.file?.name}</div>
                  {msg?.file?.type?.startsWith('image/') ? (
                    <div className="relative group">
                      {msg?.file?.data ? (
                        <>
                          <div className="relative flex justify-center items-center">
                            {isLoadingfile[msg._id] ? null :
                              (<div className="w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded">
                                <FaFileImage className="text-gray-400 text-4xl animate-pulse" />
                              </div>)
                            }
                            <img
                              src={msg?.file?.data}
                              alt={msg?.file?.name}
                              className={`max-w-[200px] rounded cursor-pointer hover:opacity-90 transition-opacity ${!isLoadingfile[msg._id] ? 'hidden' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImage(msg?.file?.data);
                                setShowImagePreview(true);
                              }}
                              onLoad={() => {
                                setIsLoadingfile(prev => ({ ...prev, [msg._id]: true }));
                              }}
                            />
                            {msg?.file?.data && isLoadingfile[msg._id] && (
                              <div
                                className="absolute z-10 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-70 transition-all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  fetch(msg?.file?.data)
                                    .then(response => response.blob())
                                    .then(blob => {
                                      const url = window.URL.createObjectURL(blob);
                                      const link = document.createElement('a');
                                      link.href = url;
                                      link.download = msg?.file?.name;
                                      document.body.appendChild(link);
                                      link.click();
                                      window.URL.revokeObjectURL(url);
                                      document.body.removeChild(link);
                                    });
                                }}
                              >
                                <FaDownload className="text-white text-sm" />
                              </div>
                            )}
                          </div>

                        </>
                      ) : (
                        <div className="max-w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      {msg?.file?.data ? (
                        <>
                          {isLoadingfile[msg._id] ? (
                            <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-100 rounded">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                          ) : (
                            <>
                              {getFileIcon(msg?.file?.type, msg?.sender)}
                              <a
                                href={msg?.file?.data}
                                download={msg?.file?.name}
                                className="text-blue-500 hover:underline flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full"
                                onClick={(e) => e.stopPropagation()}
                                onLoad={() => {
                                  setIsLoadingfile(prev => ({ ...prev, [msg._id]: true }));
                                }}
                                onError={() => {
                                  setIsLoadingfile(prev => ({ ...prev, [msg._id]: true }));
                                }}
                              >
                                <FaDownload className="text-sm" />
                                Download File
                              </a>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-100 rounded">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                    </div>
                  )}
                  {msg.text && (
                    <div className={`mt-2 ${msg.text.trim().split(" ").every(word => word.length > 50) ? "break-all " : ""}`}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ) : (
                <div className={`${msg.text.trim().split(" ").every(word => word.length > 50) ? "break-all " : ""}`}>
                  {msg.text}
                </div>
              )}

              {deletingMessageId === msg._id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                </div>
              )}

              <div className={`absolute right-0 top-[-5px] hidden ${msg.sender === "admin" ? "" : "group-hover:block"}`}>
                <MdOutlineArrowDropDown className="text-[25px] text-gray-500" />
              </div>

              {msg.sender === "merchant" && (
                <div className="flex ml-[2px] items-end absolute bottom-[2px] right-[2px]">
                  <IoCheckmarkDoneSharp
                    className={`align-bottom text-xs ${msg.isRead ? "text-[#44b310]" : "text-[#979797]"}`}
                  />
                </div>
              )}

              {showdropdown?._id != null && showdropdown?._id == msg._id && (
                <div className="absolute top-[100%] right-[2px] flex flex-col gap-1 z-10 align-center bg-white rounded-md p-2">
                  {!msg?.file?.data && (
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
                  )}
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

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending || isEditing}
          className="ml-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <FaPaperclip className="text-gray-600" />
        </button>

        {selectedFile && (
          <div className="ml-2 flex items-center">
            <span className="text-sm text-gray-600">{selectedFile.name}</span>
            <button
              onClick={() => {
                setSelectedFile(null);
                setFilePreview(null);
              }}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {isUploading && (
          <div className="ml-2 flex items-center">
            <div className="w-20 h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-blue-500 rounded"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm text-gray-600">{uploadProgress}%</span>
          </div>
        )}

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

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowImagePreview(false)}>
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
              onClick={(e) => {
                e.stopPropagation();
                setShowImagePreview(false);
              }}
            >
              <FaTimes size={24} />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSupportTickets;
