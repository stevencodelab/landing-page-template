import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Paperclip, Smile, Image, Phone, Video, MoreHorizontal } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState('online');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can we help you today?",
      isAdmin: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    }
  ]);

  // Basic emoji list
  const emojis = ['😊', '👍', '❤️', '😂', '🙏', '👋', '🎉', '✨', '💡', '📎'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      // Simulate stopping typing after 2 seconds
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMessage = {
          id: messages.length + 1,
          isAdmin: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          file: {
            name: file.name,
            type: file.type,
            url: e.target.result
          }
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        isAdmin: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsTyping(false);

      // Simulate admin typing
      setTimeout(() => setIsTyping(true), 500);

      // Simulate admin response after 2 seconds
      setTimeout(() => {
        setIsTyping(false);
        const adminResponse = {
          id: messages.length + 2,
          text: "Thank you for your message. Our team will assist you shortly.",
          isAdmin: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent'
        };
        setMessages(prev => [...prev, adminResponse]);
      }, 2000);
    }
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const MessageStatus = ({ status }) => {
    return (
      <span className="text-xs text-gray-400 ml-2">
        {status === 'sent' && '✓'}
        {status === 'delivered' && '✓✓'}
        {status === 'read' && <span className="text-blue-500">✓✓</span>}
      </span>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 relative"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl w-80 ${isMinimized ? 'h-14' : 'h-96'} flex flex-col transition-all duration-300`}>
          {/* Chat Header */}
          <div className="bg-teal-600 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <MessageCircle className="w-5 h-5" />
                  <span className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full ${
                    onlineStatus === 'online' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                </div>
                <div>
                  <span className="font-semibold block">Support Team</span>
                  <span className="text-xs opacity-75">{onlineStatus}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="hover:text-teal-200 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="hover:text-teal-200 transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:text-teal-200 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:text-teal-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.isAdmin ? 'bg-gray-100' : 'bg-teal-500 text-white'
                    }`}>
                      {msg.text && <p className="text-sm">{msg.text}</p>}
                      {msg.file && (
                        <div className="mb-2">
                          {msg.file.type.startsWith('image/') ? (
                            <img src={msg.file.url} alt="uploaded" className="max-w-full rounded" />
                          ) : (
                            <div className="flex items-center space-x-2 bg-white/10 p-2 rounded">
                              <Paperclip className="w-4 h-4" />
                              <span className="text-sm truncate">{msg.file.name}</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-end mt-1">
                        <span className="text-xs opacity-75">{msg.timestamp}</span>
                        {!msg.isAdmin && <MessageStatus status={msg.status} />}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Tools */}
              <div className="p-2 border-t flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="text-gray-500 hover:text-teal-600 transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-500 hover:text-teal-600 transition-colors"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className="text-gray-500 hover:text-teal-600 transition-colors">
                    <Image className="w-5 h-5" />
                  </button>
                </div>
                <button className="text-gray-500 hover:text-teal-600 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-20 left-4 bg-white border rounded-lg shadow-lg p-2">
                  <div className="grid grid-cols-5 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => addEmoji(emoji)}
                        className="text-xl hover:bg-gray-100 p-1 rounded"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={handleTyping}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!message.trim() && !isTyping}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveChat;