'use strict';

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// Add background-color to navbar when scrolled
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('active');
  } else {
    navbar.classList.remove('active');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__right');
navbarMenu.addEventListener('click', (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

// Handle scrolling when "contact me" button is clicked
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Handle transparency of #Home when scrolling
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  const opacity = 1 - window.scrollY / homeHeight;
  home.style.opacity = opacity;
});

// Scroll to the top when arrow button is clicked
const arrow = document.querySelector('.up__arrow');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrow.classList.add('active');
  } else {
    arrow.classList.remove('active');
  }
});
arrow.addEventListener('click', () => {
  scrollIntoView('#home');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

const work = document.querySelector('.work__projects');
const categories = document.querySelector('.work__categories');
const projects = document.querySelectorAll('.project');
categories.addEventListener('click', (e) => {
  if (e.target == null) {
    return;
  }
  // Remove selection from the previous item and select the new one
  if (e.target.nodeName === 'BUTTON') {
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    e.target.classList.add('selected');
  }

  // filter my works by types
  const filter = e.target.dataset.filter;
  if (filter == null) {
    return;
  }
  work.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || project.dataset.type.includes(filter)) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    work.classList.remove('anim-out');
  }, 200);
});
