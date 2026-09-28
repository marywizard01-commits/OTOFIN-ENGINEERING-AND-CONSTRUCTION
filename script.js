const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-nav");

const setNavigationOpen = (isOpen) => {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  primaryNavigation.classList.toggle("is-open", isOpen);
};

menuToggle.addEventListener("click", () => {
  setNavigationOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setNavigationOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setNavigationOpen(false);
    menuToggle.focus();
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#quote-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form).entries());
  const name = values.name.trim();
  const subject = encodeURIComponent(`Project enquiry from ${name}`);
  const body = encodeURIComponent([
    `Full name: ${name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Project type: ${values["project-type"]}`,
    `Project location: ${values.location}`,
    `Estimated budget: ${values.budget || "Not specified"}`,
    "",
    "Project description:",
    values.message
  ].join("\n"));
  document.querySelector("#form-feedback").textContent = "Opening your email app with the project details ready to send.";
  window.location.href = `mailto:otofinu76@icloud.com?subject=${subject}&body=${body}`;
});