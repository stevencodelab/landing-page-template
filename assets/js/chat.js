async function processAIResponse(message) {
    try {
      const API_KEY = '';
      showTypingIndicator();
  
      const systemMessage = `You are a helpful customer service assistant for a hanger store. Our products include:
      - Wooden Luxury Hangers ($29.99/set of 10)
      - Velvet Non-slip Hangers ($24.99/set of 10)
      - Chrome Metal Hangers ($19.99/set of 10)
      
      Shipping: Free standard (5-7 days), Express $9.99 (2-3 days), Next Day $14.99
      Returns: 30-day free returns with full refund
      
      Respond professionally and concisely.`;
  
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 150,
          messages: [
            {
              role: 'system',
              content: systemMessage
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7
        })
      });
  
      const data = await response.json();
      removeTypingIndicator();
      
      if (data.content && data.content[0].text) {
        addMessage('assistant', data.content[0].text);
      } else {
        handleFallbackResponse(message);
      }
  
    } catch (error) {
      console.error('Error:', error);
      removeTypingIndicator();
      handleFallbackResponse(message);
    }
  }
  
  function handleFallbackResponse(message) {
    const fallbacks = {
      products: {
        match: ['product', 'hanger', 'price'],
        response: "Our hangers: Wooden ($29.99/10pc), Velvet ($24.99/10pc), Chrome ($19.99/10pc)"
      },
      shipping: {
        match: ['shipping', 'delivery'],
        response: "Shipping: Free Standard (5-7d), Express $9.99 (2-3d), Next Day $14.99"
      },
      returns: {
        match: ['return', 'refund'],
        response: "30-day free returns with full refund guaranteed."
      }
    };
  
    const msgLower = message.toLowerCase();
    let response = "How can I help with our hanger products?";
  
    for (const category in fallbacks) {
      if (fallbacks[category].match.some(word => msgLower.includes(word))) {
        response = fallbacks[category].response;
        break;
      }
    }
  
    addMessage('assistant', response);
  }