'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
}

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay = revealDelayElements[i].dataset.revealDelay;
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


var swiper = new Swiper('.slide-content', {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});


document.addEventListener('DOMContentLoaded', function() {
  const visitorCountElement = document.getElementById('visitorCount');
  let count = 0;
  const visitorKey = 'visitorCount';
  const lastVisitKey = 'lastVisitTime';

  // Mencoba mendapatkan nilai dari localStorage
  if (localStorage.getItem(visitorKey)) {
      count = parseInt(localStorage.getItem(visitorKey), 10);
  }

  // Memeriksa apakah waktu terakhir pengunjung sudah lebih dari 5 menit
  const lastVisitTime = localStorage.getItem(lastVisitKey);
  if (lastVisitTime) {
    const now = new Date().getTime();
    const timeDiff = now - lastVisitTime;

    // Konversi 5 menit ke milidetik (1 menit = 60 detik, 1 detik = 1000 milidetik)
    const fiveMinutes = 5 * 60 * 1000;

    if (timeDiff > fiveMinutes) {
      // Jika lebih dari 5 menit, tambah 1 ke hitungan pengunjung
      count++;
      localStorage.setItem(visitorKey, count);
      // Update waktu terakhir pengunjung
      localStorage.setItem(lastVisitKey, new Date().getTime());
    }
  } else {
    // Jika pengunjung pertama atau还没有时间戳，tambah 1 ke hitungan pengunjung dan simpan waktu terakhir pengunjung
    count++;
    localStorage.setItem(visitorKey, count);
    localStorage.setItem(lastVisitKey, new Date().getTime());
  }

  // Menampilkan jumlah pengunjung
  visitorCountElement.textContent = count;
});