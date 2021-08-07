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
  navbarMenu.classList.remove('active');
  scrollIntoView(link);
});

// navbar button toggle
const navbarButton = document.querySelector('.navbar__toggle-btn');
navbarButton.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
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

// filtering & toggling project categories section
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

// activate navbar when scrolled to the matching section
const sectionIds = ['#home', '#about', '#skills', '#work', '#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
  const element = document.querySelector(selector);
  const scrollTo = element.getBoundingClientRect().top - navbarHeight;
  window.scrollBy({ top: scrollTo, behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersection && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
