document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const homeBtn = document.getElementById("home-btn");
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  // Toggle between login and signup forms
  loginBtn.addEventListener("click", () => {
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
  });

  signupBtn.addEventListener("click", () => {
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
  });

  // Password visibility toggle
  passwordInputs.forEach((input) => {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.classList.add("password-toggle");
    toggle.innerHTML = '<i class="fa fa-eye"></i>';
    input.parentElement.style.position = "relative";
    input.parentElement.appendChild(toggle);

    toggle.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        toggle.innerHTML = '<i class="fa fa-eye-slash"></i>';
      } else {
        input.type = "password";
        toggle.innerHTML = '<i class="fa fa-eye"></i>';
      }
    });
  });

  // Form submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (validatePassword(password)) {
      console.log(`Email: ${email}, Password: ${password}`);
      window.location.href = "index.html";
    } else {
      alert("Password does not meet the required criteria.");
    }
  });

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (validatePassword(password)) {
      console.log(`Email: ${email}, Password: ${password}`);
      window.location.href = "index.html";
    } else {
      alert("Password does not meet the required criteria.");
    }
  });

  // Function to validate password
  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  // Redirect to the home page when the "Home" button is clicked
  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
