// Select DOM elements
const bodyElement = document.querySelector("body");
const navbarMenu = document.querySelector("#cs-navigation");
const hamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

// Function to toggle the aria-expanded attribute
function toggleAriaExpanded(element) {
    const isExpanded = element.getAttribute("aria-expanded");
    element.setAttribute("aria-expanded", isExpanded === "false" ? "true" : "false");
}

// Function to toggle the menu open or closed
function toggleMenu() {
    hamburgerMenu.classList.toggle("cs-active");
    navbarMenu.classList.toggle("cs-active");
    bodyElement.classList.toggle("cs-open");
    toggleAriaExpanded(hamburgerMenu);
}

// Add click event listener to the hamburger menu
hamburgerMenu.addEventListener("click", toggleMenu);

// Add click event listener to the navbar menu to handle clicks on the pseudo-element
navbarMenu.addEventListener("click", function (event) {
    if (event.target === navbarMenu && navbarMenu.classList.contains("cs-active")) {
        toggleMenu();
    }
});

// Function to handle dropdown toggle
function toggleDropdown(element) {
    element.classList.toggle("cs-active");
    const dropdownButton = element.querySelector(".cs-dropdown-button");
    if (dropdownButton) {
        toggleAriaExpanded(dropdownButton);
    }
}

// Add event listeners to each dropdown element for accessibility
const dropdownElements = document.querySelectorAll(".cs-dropdown");
dropdownElements.forEach(element => {
    let escapePressed = false;

    element.addEventListener("focusout", function (event) {
        // Skip the focusout logic if escape was pressed
        if (escapePressed) {
            escapePressed = false;
            return;
        }

        // If the focus has moved outside the dropdown, remove the active class from the dropdown 
        if (!element.contains(event.relatedTarget)) {
            element.classList.remove("cs-active");
            const dropdownButton = element.querySelector(".cs-dropdown-button");

            if (dropdownButton) {
                toggleAriaExpanded(dropdownButton);
            }
        }
    });

    element.addEventListener("keydown", function (event) {
        if (element.classList.contains("cs-active")) {
            event.stopPropagation();
        }

        // Pressing Enter or Space will toggle the dropdown and adjust the aria-expanded attribute
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleDropdown(element);
        }

        // Pressing Escape will remove the active class from the dropdown. The stopPropagation above will stop the hamburger menu from closing
        if (event.key === "Escape") {
            escapePressed = true;
            toggleDropdown(element);
        }
    });

    // Handles dropdown menus on mobile - the matching media query (max-width: 63.9375rem) is necessary so that clicking the dropdown button on desktop does not add the active class and thus interfere with the hover state
    const maxWidthMediaQuery = window.matchMedia("(max-width: 63.9375rem)");
    if (maxWidthMediaQuery.matches) {
        element.addEventListener("click", () => toggleDropdown(element));
    }
});

// Pressing Enter will redirect to the href
const dropdownLinks = document.querySelectorAll(".cs-drop-li > .cs-li-link");
dropdownLinks.forEach(link => {
    link.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            window.location.href = this.href;
        }
    });
});

// If you press Escape and the hamburger menu is open, close it
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && hamburgerMenu.classList.contains("cs-active")) {
        toggleMenu();
    }
});

// NAV FUNCTIONS

// Get the height of the navbar
var navbarHeight = document.getElementById('cs-navigation').offsetHeight;

// When the user scrolls down, resize the header's font size
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > navbarHeight || document.documentElement.scrollTop > navbarHeight) {
    document.getElementById('cs-navigation').classList.add('nav-shrink');
  } else {
    document.getElementById('cs-navigation').classList.remove('nav-shrink');
  }
}

// Adjust padding/margin for the title header
// document.getElementById('main').style.paddingTop = navbarHeight + 'px';

// BLUR ANIMATION
document.addEventListener('DOMContentLoaded', function () {
    const maxBlur = 25; // Maximum blur level (starting state)
    const blur = document.querySelector('.blur'); // Select the element to apply blur
  
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY; // Get current scroll position
  
      // Adjust the divisor to control the sensitivity (scroll speed)
      const sensitivity = 10; // Higher value = slower unblur, lower value = faster unblur
      const blurLevel = Math.max(maxBlur - scrollY / sensitivity, 0); // Ensure blur level doesn't go below 0
  
      // Apply the calculated blur level to the backdrop-filter dynamically
      blur.style.backdropFilter = `blur(${blurLevel}px)`;
    });
  });

//   TYPEWRITER
function typeWriterByWord(elementId, text, speed = 300) {
  const target = document.getElementById(elementId);
  const container = target.parentElement;
  const words = text.trim().split(' ');
  target.innerHTML = '';
  let index = 0;

  function addWord() {
    if (index < words.length) {
      target.innerHTML += (index === 0 ? '' : ' ') + words[index];
      index++;
      container.scrollTop = container.scrollHeight;
      setTimeout(addWord, speed);
    }
  }

  addWord();
}

// Attach hover listeners to your portfolio links
const typewriter = document.getElementById('typewriter');
const originalText = typewriter.innerText;

document.querySelectorAll('.portfolio-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    const desc = link.querySelector('.blog-desc');
    if (desc) {
      typeWriterByWord('typewriter', desc.innerText, 70);  // 100 ms per word speed
    }
  });

  // Optional: on mouse leave, clear the typewriter paragraph or reset text
  link.addEventListener('mouseleave', () => {
    const target = document.getElementById('typewriter');
    target.innerHTML = ''; // Clear chatbox or put default text here if you want
     typeWriterByWord('typewriter', originalText, 100);
  });
});


// // TOOLTIP
// document.addEventListener('DOMContentLoaded', () => {
//     const tooltip = document.getElementById('tooltip');

//     document.querySelectorAll('.portfolio-link').forEach(el => {
//         const contentEl = el.querySelector('.blog-h1');

//         el.addEventListener('mousemove', (e) => {
//             tooltip.textContent = contentEl.textContent;
//             tooltip.style.display = 'block';
//             tooltip.style.opacity = '1';
//             tooltip.style.left = `${e.clientX + 10}px`;
//             tooltip.style.top = `${e.clientY + 10}px`;
//         });

//         el.addEventListener('mouseleave', () => {
//             tooltip.style.display = 'none';
//             tooltip.style.opacity = '0';
//         });
//     });
// });

// console.log(contentEl.textContent); // See what it's outputting
// tooltip.textContent = contentEl.textContent;



document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('tooltip');
  if (!tooltip) return;

  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  if (!isDesktop) return;

  let fadeTimeout;

  document.querySelectorAll('.portfolio-link').forEach(el => {
    const contentEl = el.querySelector('.blog-h1');

        el.addEventListener('mousemove', (e) => {
    if (!contentEl) return;

    const newContent = contentEl.textContent.trim();

    if (tooltip.textContent !== newContent) {
        tooltip.classList.add('updating');

        setTimeout(() => {
        tooltip.textContent = newContent;
        tooltip.classList.remove('updating');
        }, 100);
    }

    clearTimeout(fadeTimeout);
    tooltip.classList.add('visible');

    // Tooltip dimensions
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const margin = 12; // space between cursor and tooltip

    // Calculate horizontal center
    let left = e.clientX - tooltipWidth / 2;

    // Calculate vertical position BELOW the cursor
    let top = e.clientY + margin;

    // Keep tooltip inside viewport horizontally
    if (left < margin) left = margin;
    else if (left + tooltipWidth > window.innerWidth - margin) {
    left = window.innerWidth - tooltipWidth - margin;
    }

    // If tooltip runs below viewport, you can optionally move it above cursor
    if (top + tooltipHeight > window.innerHeight - margin) {
    top = e.clientY - tooltipHeight - margin; // fallback above cursor
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    });


    el.addEventListener('mouseleave', () => {
      fadeTimeout = setTimeout(() => {
        tooltip.classList.remove('visible');
      }, 150);
    });
  });
});

