const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});
 
const ctx = document.getElementById('businessPie');

new Chart(ctx, {
  type: 'pie',
  data: {
    labels: [
      'Retail',
      'Trading',
      'Construction',
      'Rental',
      'Medical',
      'Banks',
      'Other'
    ],
    datasets: [{
      data: [12, 9, 7, 5, 6, 3, 8]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});
