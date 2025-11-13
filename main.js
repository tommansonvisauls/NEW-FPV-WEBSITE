// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll
const header = document.querySelector('.nav');
function toggleScrolled() {
  if (window.scrollY > 6) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
toggleScrolled();
window.addEventListener('scroll', toggleScrolled, { passive: true });

// Fade on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting){
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
}, {threshold: .18});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

// Keyboard video fallback
document.querySelectorAll('.tile video').forEach(v=>{
  v.setAttribute("tabindex","0");
  v.addEventListener('focus', ()=>v.play());
  v.addEventListener('blur', ()=>{
    v.pause();
    v.currentTime = 0;
  });
});
document.querySelectorAll(".vimeo-tile").forEach(tile => {
  const iframe = tile.querySelector(".preview");
  const vimeoURL = tile.dataset.vimeo + "?autoplay=1&muted=1&loop=1";

  tile.addEventListener("mouseenter", () => {
    iframe.src = vimeoURL;
  });

  tile.addEventListener("mouseleave", () => {
    iframe.src = "";
  });
});
