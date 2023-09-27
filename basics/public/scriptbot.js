// Function to trigger the chat bubble script
function openChatBubble() {
    // Replace this with your chat bubble script
    window.embeddedChatbotConfig = {
      chatbotId: "yvvnY74pW-UC4aHI9f_xe",
      domain: "www.chatbase.co"
    };
  
    // Include the chat bubble script dynamically
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    //script.src = "embed.min.js";
    script.chatbotId = "yvvnY74pW-UC4aHI9f_xe";
    script.domain = "www.chatbase.co";
    script.defer = true;
  
    // Append the script to the document
    document.body.appendChild(script);
  }
  
  // Add an event listener to the "Talk to Bot" button
  const talkToBotButton = document.getElementById("talkToBotButton");
  talkToBotButton.addEventListener("click", openChatBubble);
  