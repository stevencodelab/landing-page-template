// AI Chat Integration
async function processAIResponse(message) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': ''
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: message }],
        system: "You are a helpful customer service assistant for a hanger store. Answer questions about products, shipping, returns, and general inquiries professionally and concisely."
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    addMessage('assistant', data.content[0].text);
    
  } catch (error) {
    console.error('Error:', error);
    handleFallbackResponse(message);
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  
  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    document.getElementById('notification-badge').classList.add('hidden');
  });

  document.getElementById('chat-close').addEventListener('click', () => 
    chatWindow.classList.add('hidden')
  );

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      addMessage('user', message);
      chatInput.value = '';
      await processAIResponse(message);
    }
  });

  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const question = btn.textContent.trim();
      chatInput.value = question;
      await processAIResponse(question);
      chatInput.value = '';
    });
  });
});

function addMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `flex items-start space-x-3 message-in ${sender === 'user' ? 'flex-row-reverse' : ''}`;
  
  const avatar = sender === 'user' ? 
    '<i class="fas fa-user text-white"></i>' : 
    '<i class="fas fa-robot text-teal-600"></i>';
    
  const bgColor = sender === 'user' ? 
    'bg-teal-600 text-white' : 
    'bg-white text-gray-700';

  messageDiv.innerHTML = `
    <div class="flex-shrink-0">
      <div class="w-10 h-10 rounded-full ${sender === 'user' ? 'bg-teal-600' : 'bg-teal-100'} flex items-center justify-center">
        ${avatar}
      </div>
    </div>
    <div class="flex flex-col space-y-2 max-w-[80%]">
      <div class="${bgColor} rounded-2xl ${sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} p-4 shadow-sm">
        <p>${text}</p>
      </div>
      <span class="text-xs text-gray-500 ${sender === 'user' ? 'mr-2' : 'ml-2'}">${sender === 'user' ? 'You' : 'AI Assistant'} • Just now</span>
    </div>
  `;

  document.getElementById('chat-messages').appendChild(messageDiv);
  messageDiv.scrollIntoView({ behavior: 'smooth' });
}

function handleFallbackResponse(message) {
  const fallbackResponses = {
    products: {
      keywords: ['product', 'hanger', 'item'],
      response: "Our premium hangers collection includes wooden luxury ($29.99/set), velvet non-slip ($24.99/set), and chrome metal ($19.99/set). All sets include 10 pieces with free shipping!"
    },
    shipping: {
      keywords: ['shipping', 'delivery'],
      response: "📦 Shipping: Standard (Free, 5-7 days), Express ($9.99, 2-3 days), Premium ($14.99, Next day). Free shipping on orders over $50!"
    },
    returns: {
      keywords: ['return', 'refund'],
      response: "↩️ Returns: 30-day window, free returns, hassle-free process, full refund guaranteed"
    }
  };

  const messageLower = message.toLowerCase();
  const defaultResponse = "How can I assist you with our hanger products today?";
  
  const matchedCategory = Object.values(fallbackResponses).find(
    category => category.keywords.some(keyword => messageLower.includes(keyword))
  );
  
  addMessage('assistant', matchedCategory?.response || defaultResponse);
}