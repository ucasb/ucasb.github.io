// 0) AUTO‑TAG IMAGES FOR LIGHTBOX
document.querySelectorAll(".tileImg img").forEach(img => {
  img.classList.add("lightbox-trigger");
});

// script.js

// —————————————————————————
// 1) LIGHTBOX (always active)
// —————————————————————————
const lightbox        = document.getElementById("lightbox");
const lightboxImg     = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose   = document.getElementById("lightbox-close");

function openLightbox(img) {
  lightboxImg.src            = img.src;
  lightboxCaption.textContent = img.alt;
  lightbox.style.display     = "flex";
}

// bind *only* to images with the class `lightbox-trigger`
document.querySelectorAll(".lightbox-trigger").forEach(img => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => openLightbox(img));
});

// close handlers
lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});


// —————————————————————————
// 2) CAROUSELS (multiple, independent)
// —————————————————————————
document.querySelectorAll(".carousel-container").forEach(carousel => {
  const track           = carousel.querySelector(".carousel-track");
  if (!track) return;               // skip if no track
  
  const slides          = Array.from(track.children);
  const prevBtn         = carousel.querySelector(".prev");
  const nextBtn         = carousel.querySelector(".next");
  const thumbsContainer = carousel.querySelector(".carousel-thumbnails");
  let   idx             = 0;
  let   interval;

  function goToSlide(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
    idx = i;
    // update thumbnail highlighting
    if (thumbsContainer) {
      thumbsContainer.querySelectorAll("img").forEach((thumb, j) =>
        thumb.classList.toggle("active", j === idx)
      );
    }
  }

  function stop() { clearInterval(interval); }
  function start() {
    stop();
    if (!carousel.matches(":hover")) {
      // auto‑advance is off by default—uncomment to re-enable:
      // interval = setInterval(() => {
      //   goToSlide((idx + 1) % slides.length);
      // }, 10000);
    }
  }

  // pause/resume on hover
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  // prev/next buttons
  if (prevBtn) prevBtn.addEventListener("click", () =>
    goToSlide((idx - 1 + slides.length) % slides.length)
  );
  if (nextBtn) nextBtn.addEventListener("click", () =>
    goToSlide((idx + 1) % slides.length)
  );

  // click a slide → lightbox + pause this carousel
  slides.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      openLightbox(img);
      stop();
    });
  });

  // build thumbnail strip (if present)
  if (thumbsContainer) {
    slides.forEach((slide, i) => {
      const thumb = document.createElement("img");
      thumb.src   = slide.src;
      thumb.alt   = slide.alt;
      thumb.addEventListener("click", () => goToSlide(i));
      thumbsContainer.appendChild(thumb);
    });
  }

  // when lightbox closes, resume this carousel
  lightboxClose.addEventListener("click", start);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) start();
  });

  // initialize
  goToSlide(0);
  // start();  // ← uncomment to turn auto‑advance back on
});


function toggleDropdown() {
  const menu = document.getElementById('dropdownMenu');
  menu.classList.toggle('show');
}

window.addEventListener('click', function(e) {
  const button   = document.querySelector('.menu-button');
  const dropdown = document.getElementById('dropdownMenu');
  // if either one is missing, do nothing
  if (!button || !dropdown) return;

  if (!button.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

const scrollBtn = document.getElementById('scrollToTop');

// Show button when scrolling down
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

// Scroll to top when clicked
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.onload=window.onscroll=window.onresize=function(){
var s=window.scrollY;
var mp=Math.max(0,23-s);
document.getElementById("stiky").style.top = mp+"px";
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img.hover-overlay').forEach(img => {
    // 1) wrap the image
    const wrapper = document.createElement('div');
    wrapper.className = 'overlay-container';

    // carry over width/height
    if (img.style.width)  { wrapper.style.width  = img.style.width;  img.style.width  = '100%'; }
    if (img.style.height) { wrapper.style.height = img.style.height; img.style.height = 'auto'; }

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    // 2) build overlay
    const ov = document.createElement('div');
    ov.className = 'overlay';

    // 3) build text/link
    const txt = document.createElement('div');
    txt.className = 'overlay-text';
    const url = img.getAttribute('link');
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.textContent = img.alt;
      txt.appendChild(a);
    } else {
      txt.textContent = img.alt;
    }

    ov.appendChild(txt);
    wrapper.appendChild(ov);
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('img.hover-overlay').forEach(img => {
//     // 1) Create the wrapper
//     const wrapper = document.createElement('div');
//     wrapper.className = 'overlay-container';

//     // 2) Move any inline width/height from the img to the wrapper
//     const w = img.style.width;
//     const h = img.style.height;
//     if (w) {
//       wrapper.style.width = w;
//       img.style.width = '100%';
//     }
//     if (h) {
//       wrapper.style.height = h;
//       img.style.height = 'auto';
//     }

//     // 3) Insert the wrapper into the DOM
//     img.parentNode.insertBefore(wrapper, img);
//     wrapper.appendChild(img);

//     // 4) Build the overlay
//     const overlay = document.createElement('div');
//     overlay.className = 'overlay';
//     const text = document.createElement('div');
//     text.className = 'overlay-text';
//     text.textContent = img.alt;
//     overlay.appendChild(text);
//     wrapper.appendChild(overlay);
//   });
// });
