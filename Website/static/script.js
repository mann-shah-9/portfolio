// ================= LOADER =================
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 500); // Matches fade-out timing
});

// ================= SMOOTH SCROLLING =================
document.querySelectorAll('.nav-links a, .logo a').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith("#")) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // offset for header
                    behavior: "smooth"
                });
            }
        }
    });
});

// CLOCK FUNCTION
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}

// Run clock every second
setInterval(updateClock, 1000);
updateClock();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // stop page reload

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://127.0.0.1:5000/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("✅ Message sent successfully!");
                form.reset();
            } else {
                alert("❌ Failed to send message.");
            }
        } catch (error) {
            alert("⚠️ Error connecting to server.");
        }
    });
});

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target).entries());

  const res = await fetch("http://127.0.0.1:5000/send-message", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });

  if (res.ok) alert("Message sent!");
  else alert("Failed to send. Try again.");
});