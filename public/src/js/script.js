// Slide Form Mobile

const form = document.getElementById("form");
const btn1 = document.querySelector("[btn1]");
const btn2 = document.querySelector("[btn2]");

console.log(form);
console.log(btn1);
console.log(btn2);

btn1.addEventListener("click", () => {
  form.style.display = "block";
});
btn2.addEventListener("click", () => {
  form.style.display = "block";
});

// Form Validation
