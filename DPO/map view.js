const map = document.getElementById("mapArea");
const popup = document.getElementById("popup");

const pins = [
  { x: 70, y: 40, color: "orange" },
  { x: 55, y: 65, color: "yellow" },
  { x: 30, y: 55, color: "orange" }
];

pins.forEach(p => {
  const el = document.createElement("div");
  el.className = "pin " + p.color;
  el.style.left = p.x + "%";
  el.style.top = p.y + "%";

  el.onclick = (e) => {
    popup.style.display = "block";
    popup.style.left = e.pageX + 10 + "px";
    popup.style.top = e.pageY + 10 + "px";
  };

  map.appendChild(el);
});

document.addEventListener("click", e => {
  if (!e.target.classList.contains("pin")) {
    popup.style.display = "none";
  }
});
