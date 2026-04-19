import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import Groq from 'groq-sdk';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are a helpful financial assistant for the Calckaro app — a calculator tool that helps users with:
1. EMI (Equated Monthly Installment) calculations for loans.
2. PF (Provident Fund) calculations for retirement savings.
3. Loan Eligibility calculations based on income and expenses.

Help users understand these financial concepts, answer questions about their calculations, and provide general financial guidance. Keep responses concise and clear. If asked about anything unrelated to finance, gently redirect the conversation back to financial topics.`;

const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;

export default function ChatBot() {
  const [open, setOpen] = React.useState(true);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Calckaro AI assistant. Ask me anything about EMI, PF, or Loan Eligibility calculations!',
    },
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: trimmed },
        {
          role: 'assistant',
          content:
            '⚠️ Groq API key is not configured. Please add VITE_GROQ_API_KEY to your .env.local file and restart the dev server.',
        },
      ]);
      setInput('');
      return;
    }

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const client = new Groq({ apiKey, dangerouslyAllowBrowser: true });

      const response = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        ],
        max_tokens: 500,
      });

      const reply = response.choices[0]?.message?.content ?? 'Sorry, I could not get a response.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${errorMessage}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Tooltip title="Chat with AI Assistant" placement="left">
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            width: 60,
            height: 60,
            background: 'linear-gradient(135deg, #1976d2 0%, #ec407a 100%)',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(25,118,210,0.45)',
            zIndex: 1300,
            '&:hover': {
              background: 'linear-gradient(135deg, #1565c0 0%, #d81b60 100%)',
              transform: 'scale(1.08)',
            },
            transition: 'transform 0.2s',
          }}
          aria-label="Open AI chat"
        >
          {open ? <CloseIcon sx={{ fontSize: 28 }} /> : <ChatIcon sx={{ fontSize: 28 }} />}
        </IconButton>
      </Tooltip>

      {/* Chat Window */}
      <Fade in={open}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 28,
            width: { xs: 'calc(100vw - 32px)', sm: 380 },
            maxWidth: 420,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 4,
            overflow: 'hidden',
            zIndex: 1299,
            boxShadow: '0 8px 40px rgba(25,118,210,0.25)',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(90deg, #1976d2 60%, #ec407a 100%)',
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SmartToyIcon sx={{ color: '#fff', fontSize: 26 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
                Calckaro AI
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Powered by Groq (Llama 3)
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 1.5,
              bgcolor: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: msg.role === 'user' ? '#ec407a' : '#1976d2',
                    flexShrink: 0,
                  }}
                >
                  {msg.role === 'user' ? (
                    <PersonIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  )}
                </Avatar>
                <Box
                  sx={{
                    maxWidth: '78%',
                    bgcolor: msg.role === 'user' ? '#ec407a' : '#fff',
                    color: msg.role === 'user' ? '#fff' : 'text.primary',
                    borderRadius:
                      msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    px: 1.5,
                    py: 1,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    fontSize: 14,
                    lineHeight: 1.55,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </Box>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: '#1976d2' }}>
                  <SmartToyIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '4px 18px 18px 18px',
                    px: 1.5,
                    py: 1,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  }}
                >
                  <CircularProgress size={16} thickness={5} />
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box
            sx={{
              px: 1.5,
              py: 1,
              bgcolor: '#fff',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={3}
              size="small"
              placeholder="Ask about EMI, PF, or Loans..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: 14,
                },
              }}
            />
            <IconButton
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #ec407a 100%)',
                color: '#fff',
                width: 40,
                height: 40,
                flexShrink: 0,
                '&:hover': { background: 'linear-gradient(135deg, #1565c0 0%, #d81b60 100%)' },
                '&.Mui-disabled': { background: '#e0e0e0', color: '#aaa' },
              }}
              aria-label="Send message"
            >
              <SendIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </>
  );
}
