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

// Adjust margin for the title header
// document.getElementById('main').style.paddingTop = navbarHeight + 'px';

// BLUR ANIMATION
// document.addEventListener('DOMContentLoaded', function () {
//     const maxBlur = 25; // Maximum blur level (starting state)
//     const blur = document.querySelector('.blur'); // Select the element to apply blur
  
//     window.addEventListener('scroll', function () {
//       const scrollY = window.scrollY; // Get current scroll position
  
//       // Adjust the divisor to control the sensitivity (scroll speed)
//       const sensitivity = 10; // Higher value = slower unblur, lower value = faster unblur
//       const blurLevel = Math.max(maxBlur - scrollY / sensitivity, 0); // Ensure blur level doesn't go below 0
  
//       // Apply the calculated blur level to the backdrop-filter dynamically
//       blur.style.backdropFilter = `blur(${blurLevel}px)`;
//     });
//   });


  document.addEventListener('DOMContentLoaded', function () {
    const maxBlur = 25; // Maximum blur level (starting state)
    const initialHeight = 100; // Initial height of the element
    const initialWidth = 100; // Initial width (percentage of parent container)
    const blur = document.querySelector('.blur'); // Select the element to apply blur
    const bgimage = document.querySelector('.bgimage'); // Select the element to apply height and width
  
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY; // Get current scroll position
  
      // Adjust the divisor to control the sensitivity (scroll speed)
      const sensitivity = 10; // Higher value = slower unblur, lower value = faster unblur
      const blurLevel = Math.max(maxBlur - scrollY / sensitivity, 0); // Ensure blur level doesn't go below 0
  
      // Adjust height and width based on scroll position (can add limits to avoid shrinking too much)
      const height = Math.max(initialHeight - scrollY / 50, 80); // Minimum height of 100px
      const width = Math.max(initialWidth - scrollY / 100, 95); // Minimum width of 50% of the parent container
  
      // Apply the calculated blur, height, and width dynamically
      blur.style.backdropFilter = `blur(${blurLevel}px)`;
    //   bgimage.style.height = `${height}vh`;
    //   bgimage.style.width = `${width}%`;
    });
  });

function wrapCommaSeparatedWordsWithDifferentClass(targetClass, spanClass) {
    // Select all <p> elements with the specific target class
    const paragraphs = document.querySelectorAll(`div.${targetClass}`);
  
    paragraphs.forEach((paragraph) => {
      // Get the text content of the paragraph and split it by commas
      const words = paragraph.textContent.split(',');
  
      // Wrap each word in a <span> tag with the specified spanClass
      const wrappedWords = words
        .map(word => `<span class="${spanClass}">${word.trim()}</span>`)
        .join(' '); // Join wrapped words with a space (no commas)
  
      // Replace the inner HTML of the <p> with the wrapped words
      paragraph.innerHTML = wrappedWords;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    wrapCommaSeparatedWordsWithDifferentClass('services', 'service');
  });

//   BUTTON

document.getElementById("caseStudyToggle").addEventListener("click", function() {
    document.getElementById("caseStudy").classList.toggle("expanded");
});

// OPACITY AND BLUR FOR INTRO CONTENT

window.addEventListener("scroll", function () {
    const target = document.getElementById("introContent"); // Target div
    const maxScroll = 500; // Adjust to control how much scroll is needed for full effect
    
    let scrollY = window.scrollY || window.pageYOffset;
    let progress = Math.min(scrollY / maxScroll, 1); // Normalize between 0 and 1

    let opacity = 1 - progress; // Opacity from 1 → 0
    let blur = progress * 25;   // Blur from 0 → 25px

    target.style.opacity = opacity;
    target.style.filter = `blur(${blur}px)`; // Applying blur effect
});

// INSERT SVG ARROW AFTER DOWN-ARROW CLASS

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".down-arrow"); // Select all elements with class "down-arrow"

    elements.forEach(element => {
        // Create an SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 500 277.78");
        svg.setAttribute("width", "50"); // Adjust size if needed
        svg.setAttribute("height", "50"); // Adjust size if needed

        // Add SVG content
        svg.innerHTML = `
            <g id="Layer_1-2" data-name="Layer 1-2">
                <polygon fill="#231f20" points="444.44 0 388.89 0 333.33 0 277.78 0 222.22 0 166.67 0 111.11 0 55.56 0 0 0 0 55.56 55.56 55.56 55.56 111.11 111.11 111.11 111.11 166.67 166.67 166.67 166.67 222.22 222.22 222.22 222.22 277.78 277.78 277.78 277.78 222.22 333.33 222.22 333.33 166.67 388.89 166.67 388.89 111.11 444.44 111.11 444.44 55.56 500 55.56 500 0 444.44 0"/>
            </g>
        `;

        // Insert the SVG immediately after the .down-arrow element
        element.insertAdjacentElement("afterend", svg);

        // Append the SVG inside the wrapper div
        wrapperDiv.appendChild(svg);

        // Insert the wrapper div after the selected element
        element.parentNode.insertBefore(wrapperDiv, element.nextSibling);
    });
});