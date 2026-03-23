"use strict";

(function () {

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const elements = select(el, all);
    if (!elements) return;

    if (all) elements.forEach(e => e.addEventListener(type, listener));
    else elements.addEventListener(type, listener);
  };

  const onscroll = (el, listener) => el.addEventListener("scroll", listener);

  /* =========================
     NAVBAR ACTIVE
  ========================= */
  let navbarlinks = select("#navbar .scrollto", true);

  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;

      if (position >= section.offsetTop &&
        position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /* =========================
     SMOOTH SCROLL
  ========================= */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;

    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth"
    });
  };

  /* =========================
     HEADER SCROLL EFFECT
  ========================= */
  let header = select("#header");

  const headerScrolled = () => {
    window.scrollY > 100
      ? header.classList.add("header-scrolled")
      : header.classList.remove("header-scrolled");
  };

  window.addEventListener("load", headerScrolled);
  onscroll(document, headerScrolled);

  /* =========================
     BACK TO TOP
  ========================= */
  let backtotop = select(".back-to-top");

  const toggleBacktotop = () => {
    window.scrollY > 100
      ? backtotop.classList.add("active")
      : backtotop.classList.remove("active");
  };

  window.addEventListener("load", toggleBacktotop);
  onscroll(document, toggleBacktotop);

  /* =========================
     MOBILE NAV
  ========================= */
  on("click", ".mobile-nav-toggle", function () {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on("click", ".scrollto", function (e) {
    if (select(this.hash)) {
      e.preventDefault();
      let navbar = select("#navbar");

      if (navbar.classList.contains("navbar-mobile")) {
        navbar.classList.remove("navbar-mobile");
        select(".mobile-nav-toggle").classList.toggle("bi-list");
        select(".mobile-nav-toggle").classList.toggle("bi-x");
      }

      scrollto(this.hash);
    }
  }, true);

  /* =========================
     TYPING EFFECT
  ========================= */
  const typed = select(".typed");
  if (typed) {
    let items = typed.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: items,
      loop: true,
      typeSpeed: 90,
      backSpeed: 40,
      backDelay: 2000
    });
  }

  /* =========================
     PRELOADER
  ========================= */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /* =========================
     PURE COUNTER
  ========================= */
  new PureCounter();

})();

/* =========================
   🎮 VIDEO SYSTEM (UPGRADED)
========================= */

const videos = document.querySelectorAll(".hover-video");
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");
const closeBtn = document.querySelector(".close-video");

/* VISIBILITY */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;

    if (entry.isIntersecting) {
      video.dataset.visible = "true";
    } else {
      video.pause();
      video.currentTime = 0;
      video.dataset.visible = "false";
    }
  });
}, { threshold: 0.6 });

videos.forEach(video => {
  observer.observe(video);

  const container = video.closest(".work-img");

  /* HOVER PLAY */
  container.addEventListener("mouseenter", () => {
    if (video.dataset.visible === "true") video.play();
  });

  container.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });

  /* CLICK MODAL */
  video.addEventListener("click", () => {
    modal.style.display = "flex";
    modalVideo.src = video.querySelector("source").src;
    modalVideo.play();
  });
});

/* CLOSE MODAL */
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.src = "";
});

/* =========================
   ⚡ CARD ANIMATION
========================= */
const cards = document.querySelectorAll(".work-box");

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => cardObserver.observe(card));

/* =========================
   🖱️ CUSTOM CURSOR
========================= */
/* =========================
🎮 AAA CURSOR SYSTEM (GLOBAL)
========================= */

const cursor = document.querySelector(".custom-cursor");

if (cursor) {
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
mouseX = e.clientX;
mouseY = e.clientY;
});

function animateCursor() {
currentX += (mouseX - currentX) * 0.15;
currentY += (mouseY - currentY) * 0.15;


cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

requestAnimationFrame(animateCursor);


}

animateCursor();

/* HOVER SCALE */
document.querySelectorAll("a, button, .work-box, video").forEach(el => {
el.addEventListener("mouseenter", () => {
cursor.style.transform += " scale(1.8)";
});

```
el.addEventListener("mouseleave", () => {
  cursor.style.transform = cursor.style.transform.replace(" scale(1.8)", "");
});
```

});
}

/* =========================
🔊 HOVER SOUND
========================= */

const hoverSound = document.getElementById("hover-sound");

if (hoverSound) {
document.querySelectorAll("a, .work-box, video").forEach(el => {
el.addEventListener("mouseenter", () => {
hoverSound.currentTime = 0;
hoverSound.play().catch(() => {});
});
});
}

/* =========================
🎬 VIDEO INTERACTION (DETAIL PAGE)
========================= */

document.querySelectorAll(".showcase-video").forEach(video => {
video.addEventListener("mouseenter", () => {
video.play().catch(() => {});
});

video.addEventListener("mouseleave", () => {
video.pause();
});
});

/* =========================
🧠 SMOOTH SCROLL (KEEP NAV SAME)
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener("click", function (e) {
const target = document.querySelector(this.getAttribute("href"));
if (target) {
e.preventDefault();
target.scrollIntoView({ behavior: "smooth" });
}
});
});



/* =========================
   🎮 HERO PARALLAX EFFECT
========================= */
const hero = document.querySelector(".hero");
const heroVideo = document.querySelector(".hero-video");

document.addEventListener("mousemove", (e) => {
  let x = (e.clientX / window.innerWidth - 0.5) * 20;
  let y = (e.clientY / window.innerHeight - 0.5) * 20;

  if (hero) {
    hero.style.transform = `translate(${x}px, ${y}px)`;
  }

  if (heroVideo) {
    heroVideo.style.transform = `scale(1.1) translate(${x * 0.5}px, ${y * 0.5}px)`;
  }
});

/* =========================
   ⚡ GLITCH RANDOM BOOST
========================= */
setInterval(() => {
  const title = document.querySelector(".hero-title");
  if (title) {
    title.style.animation = "none";
    setTimeout(() => {
      title.style.animation = "glitch 0.3s";
    }, 50);
  }
}, 3000);

/* =========================
   🧠 SYSTEM BLOCK ANIMATION
========================= */

const blocks = document.querySelectorAll(".system-block");

const blockObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

blocks.forEach(block => {
  block.style.opacity = "0";
  block.style.transform = "translateY(40px)";
  block.style.transition = "0.6s ease";
  blockObserver.observe(block);
});

/* =========================
   💥 CLICK IMPACT FX
========================= */
document.querySelectorAll(".work-box").forEach(card => {
  card.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "click-ripple";
    ripple.style.left = e.offsetX + "px";
    ripple.style.top = e.offsetY + "px";
    card.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

