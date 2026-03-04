const modal = document.getElementById("requestModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

// Open modal
openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close modal (cancel button)
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Close using ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});