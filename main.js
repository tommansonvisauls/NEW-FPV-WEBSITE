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
// Vimeo hover previews
document.querySelectorAll(".vimeo-tile").forEach(tile => {
  const iframe = tile.querySelector(".preview");
  const base = tile.dataset.vimeo;

  if (!iframe || !base) return;

  // Add background mode + autoplay/muted/loop to keep Vimeo happy
  const vimeoURL =
    base + "?background=1&autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0";

  const startPreview = () => {
    // Only set if not already set (avoids reloading every tiny mouse move)
    if (iframe.src !== vimeoURL) {
      iframe.src = vimeoURL;
    }
  };

  const stopPreview = () => {
    // Unload iframe so it stops playing + frees resources
    if (iframe.src) {
      iframe.src = "about:blank";
    }
  };

  // Mouse + keyboard
  tile.addEventListener("mouseenter", startPreview);
  tile.addEventListener("mouseleave", stopPreview);
  tile.addEventListener("focusin", startPreview);
  tile.addEventListener("focusout", stopPreview);
});

