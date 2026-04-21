import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Send, ShieldAlert, Image as ImageIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { subscribeToMessages, sendMessage, MessageData } from "../../services/chatService";
import { useAuth } from "../../hooks/useAuth";

export const ChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    
    // In a real app, 'id' would be the chatId, but we're mocking it
    const chatId = "mock-chat-1"; 
    
    const unsubscribe = subscribeToMessages(chatId, (newMessages) => {
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await sendMessage("mock-chat-1", user.uid, newMessage.trim());
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] border border-border rounded-xl overflow-hidden bg-background">
      {/* Left Sidebar: Conversations List */}
      <div className="w-80 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {/* Mock Conversation Item */}
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              J
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">Now</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">Yes, that is my Macbook!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-lg cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-status-found/20 text-status-found flex items-center justify-center font-bold">
              S
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">Sarah M.</span>
                <span className="text-xs text-muted-foreground">2d</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">Thanks for returning my keys.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content: Active Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-16 px-4 border-b border-border bg-card flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="md:hidden p-2 -ml-2 rounded-md hover:bg-secondary text-muted-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">J</span>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">John Doe</h2>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-found"></span> Online
                </p>
              </div>
            </div>
          </div>
          
          <button className="text-muted-foreground hover:text-foreground">
            <ShieldAlert className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/5 border-b border-primary/10 p-3 flex justify-center text-xs text-muted-foreground">
          You are chatting about <span className="font-medium text-foreground ml-1">MacBook Pro 14"</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((msg, index) => {
            const isMe = msg.senderId === user?.uid;
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[75%] lg:max-w-[60%] px-4 py-2 rounded-2xl ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 mx-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-card border-t border-border">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-input-background border border-border rounded-md pl-4 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-2.5 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
