const API_URL = "https://monfungapi.onrender.com";
const API_KEY = "41a5bff2-f14a-45f4-9bba-9de475ab4399"; // use the same one in your .env on Render

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const msg = document.getElementById("msg");

sendOtpBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  
  msg.textContent = "Sending OTP...";
  const res = await fetch(`${API_URL}/send-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ email, name }),
  });

  const data = await res.json();
  if (data.success) {
    msg.textContent = "OTP sent! Check your email.";
    document.getElementById("otpSection").style.display = "block";
  } else {
    msg.textContent = "Failed to send OTP: " + data.message;
  }
});

verifyOtpBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const otp = document.getElementById("otp").value.trim();
  
  msg.textContent = "Verifying OTP...";
  const res = await fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ email, otp, purpose: "verification" }),
  });

  const data = await res.json();
  if (data.success) {
    msg.textContent = "Verification successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    msg.textContent = "Verification failed: " + data.message;
  }
});
