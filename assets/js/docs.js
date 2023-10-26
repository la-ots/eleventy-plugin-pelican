const pageWrapper = document.getElementById("page-wrapper");
const sidebarButton = document.getElementById("sidebar-button");
const sidebarDropdownLink = document.querySelectorAll(
  ".sidebar-dropdown-header-expand"
);
const scrollToTop = document.getElementById("ScrollToTop");

const slideUp = (target, duration = 500) => {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.boxSizing = "border-box";
  target.style.height = target.offsetHeight + "px";
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

const slideDown = (target, duration = 500) => {
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;
  if (display === "none") display = "block";
  target.style.display = display;
  const height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

if (sidebarButton) {
  sidebarButton.onclick = () => {
    pageWrapper.classList.toggle("toggled");
  };
}

sidebarDropdownLink.forEach((dropdownItem) => {
  dropdownItem.onclick = (event) => {
    const sidebarSubMenu = document.querySelectorAll(".sidebar-submenu");
    let expand = event.target;
    if (expand.nodeName !== "A") {
      expand = expand.parentNode;
    }
    const header = expand.parentNode;

    sidebarSubMenu.forEach((subMenu) => {
      const display = window.getComputedStyle(subMenu).display;
      if (display === "block") {
        slideUp(subMenu, 200);
      }
    });

    const wasActive = expand.classList.contains("active");

    sidebarDropdownLink.forEach((link) => {
      link.classList.remove("active");
    });

    if (!wasActive) {
      expand.classList.add("active");
    }

    let nextSibling = header.nextElementSibling;

    while (nextSibling && !nextSibling.classList.contains("sidebar-submenu")) {
      nextSibling = nextSibling.nextSibling;
    }
    slideDown(nextSibling, 200);
  };
});

window.onscroll = () => {
  scrollFunction();
};

if (scrollToTop) {
  scrollToTop.onclick = (event) => {
    event.preventDefault();
    topFunction();
  };
}

const scrollFunction = () => {
  if (scrollToTop) {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollToTop.style.display = "block";
    } else {
      scrollToTop.style.display = "none";
    }
  }
};

// When the user clicks on the button, scroll to the top of the document
const topFunction = () => {
  const pageContent = document.getElementsByClassName("page-content");
  if (pageContent && pageContent.length > 0) {
    pageContent[0].scrollTop = 0;
  } else {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
};

/* global bootstrap */
document.addEventListener("DOMContentLoaded", (event) => {
  const popovers = Array.from(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  const tooltips = Array.from(
    document.querySelectorAll('[data-bs-toggle="toolip"]')
  );

  popovers.map((elm) => new bootstrap.Popover(elm));
  tooltips.map((elm) => new bootstrap.Tooltip(elm));
});
