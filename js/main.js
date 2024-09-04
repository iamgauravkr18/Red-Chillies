document.addEventListener("DOMContentLoaded", () => {
  // Variables for the chat system
  const chatForm = document.getElementById("chat-form");
  const chatBox = document.getElementById("chat-box");
  const chatMessage = document.getElementById("chat-message");

  // Initialize countdown timers
  initializeCountdown("countdown1", "September 15, 2024 10:00:00");
  initializeCountdown("countdown2", "September 20, 2024 14:00:00");

  // Event Listener for Login Form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const loginMessage = document.getElementById("login-message");

      if (username === "admin" && password === "password") {
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
        loginForm.reset();
      } else {
        loginMessage.textContent = "Invalid username or password.";
        loginMessage.style.color = "red";
      }
    });
  }

  // Event Listener for Registration Form
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const regUsername = document.getElementById("reg-username").value;
      const regEmail = document.getElementById("reg-email").value;
      const regPassword = document.getElementById("reg-password").value;
      const registerMessage = document.getElementById("register-message");

      if (regUsername && regEmail && regPassword) {
        registerMessage.textContent = "Registration successful!";
        registerMessage.style.color = "green";
        registerForm.reset();
      } else {
        registerMessage.textContent = "Please fill in all fields.";
        registerMessage.style.color = "red";
      }
    });
  }

  // Event Listener for Chat Form
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = chatMessage.value;
    if (message.trim() !== "") {
      addMessage("user", message);
      chatMessage.value = "";
      chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom

      // Simulate a bot response
      setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage("agent", botResponse);
      }, 1000);
    }
  });

  function addMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.className = sender;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
  }

  function getBotResponse(message) {
    const responses = {
      hello: "Hi there! How can I assist you today?",
      "how are you": "I’m doing great, thank you! How can I help you?",
      events:
        "We have several exciting events coming up. What type of events are you interested in?",
      help: "I’m here to help! Please let me know what you need assistance with.",
      bye: "Goodbye! Have a great day!",
    };

    const normalizedMessage = message.toLowerCase();

    for (const [key, response] of Object.entries(responses)) {
      if (normalizedMessage.includes(key)) {
        return response;
      }
    }

    return "I’m not sure how to respond to that. Can you please rephrase?";
  }

  // Function to open event details modal
  window.openEventDetails = function (title, date, time, image) {
    const modal = document.getElementById("event-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDate = document.getElementById("modal-date");
    const modalTime = document.getElementById("modal-time");
    const modalImage = document.getElementById("modal-image");

    modalTitle.textContent = title;
    modalDate.textContent = `Date: ${date}`;
    modalTime.textContent = `Time: ${time}`;
    modalImage.src = `images/${image}`;
    modal.style.display = "block";
  };

  // Function to close event details modal
  window.closeEventDetails = function () {
    const modal = document.getElementById("event-modal");
    modal.style.display = "none";
  };

  // Function to navigate to events section
  window.navigateToEvents = function () {
    document.getElementById("events").scrollIntoView({ behavior: "smooth" });
  };

  // Function to open contact form
  window.openContactForm = function () {
    document.getElementById("contact-popup").style.display = "flex";
  };

  // Function to close contact form
  window.closeContactForm = function () {
    document.getElementById("contact-popup").style.display = "none";
  };

  // Countdown Timer Function
  function initializeCountdown(elementId, endDate) {
    const countdownElement = document.getElementById(elementId);
    const targetDate = new Date(endDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        countdownElement.textContent = "Event Started!";
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
      }
    }, 1000);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const contactUsBtn = document.getElementById("contact-us-btn");
  const modal = document.getElementById("contact-form-modal");
  const closeModal = document.querySelector(".close");

  const whatsappBtn = document.getElementById("whatsapp-btn");
  const chatbox = document.getElementById("chatbox");
  const closeChat = document.querySelector(".close-chat");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  // Contact Form Modal
  contactUsBtn.onclick = function () {
    modal.style.display = "block";
  };

  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // WhatsApp Chatbot
  whatsappBtn.onclick = function () {
    chatbox.style.display =
      chatbox.style.display === "block" ? "none" : "block";
  };

  closeChat.onclick = function () {
    chatbox.style.display = "none";
  };

  chatForm.onsubmit = function (e) {
    e.preventDefault();
    const userMessage = chatInput.value.trim();

    if (userMessage) {
      addChatMessage("user", userMessage);
      chatInput.value = "";

      setTimeout(function () {
        const botMessage = getBotResponse(userMessage);
        addChatMessage("agent", botMessage);
      }, 1000);
    }
  };

  function addChatMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(message) {
    const responses = {
      hi: "Hello! How can I help you today?",
      hello: "Hi there! How can I assist you?",
      "how are you?": "I'm just a bot, but I'm here to help!",
      "what is your name?": "I'm Red bot virtual assistant.",
      contact:
        "You can contact us at support@redch.com or call us at 123-456-7890.",
      services:
        "We offer a wide range of services. Please visit our Services page for more information.",
      pricing: "Our pricing details are available on the Pricing page.",
      location: "We are located at 123 Main Street, City, Country.",
      hours: "Our working hours are Monday to Friday, 9 AM to 6 PM.",
      support: "For support, please reach out via our Contact page.",
      bye: "Goodbye! Have a great day!",
      default: "I'm not sure about that. Please try asking something else.",
    };

    const lowerCaseMessage = message.toLowerCase();
    return responses[lowerCaseMessage] || responses.default;
  }
});
