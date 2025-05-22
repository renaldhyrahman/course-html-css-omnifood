// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/* -------- -------- -------- -------- */
const elYear = document.querySelector(".year");
const elBtnNav = document.querySelector(".btn-mobile-nav");
const elHeader = document.querySelector(".header");
const elAllLinks = document.querySelectorAll("a:link");
const elSectionHero = document.querySelector(".section-hero");

// Update year in the footer
elYear.textContent = new Date().getFullYear();

// Mobile navigation menu
elBtnNav.addEventListener("click", () => {
  elHeader.classList.toggle("nav-open");
});

// Smooth scrolling
elAllLinks.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const href = el.getAttribute("href");
    const elTarget = document.querySelector(href);

    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    else if (href.startsWith("#"))
      elTarget.scrollIntoView({ behavior: "smooth" });

    elHeader.classList.remove("nav-open");
  });
});

// Sticky Navigation
const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting) document.body.classList.add("sticky");
    else document.body.classList.remove("sticky");
  },
  { root: null, threshold: 0, rootMargin: "-80px" }
);

observer.observe(elSectionHero);

/* -------- -------- -------- -------- */
/* Fixing flexbox gap property missing in some Safari versions */
/* -------- -------- -------- -------- */

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  // console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
