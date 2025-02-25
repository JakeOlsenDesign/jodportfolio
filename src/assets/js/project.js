// INTRO BLUR
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

// STICKY-CONTAINER OPACITY

// document.addEventListener("DOMContentLoaded", function () {
//     const targetElement = document.querySelector(".scroll-effect"); // Element that changes both opacity and blur
//     const stickyElements = document.querySelectorAll(".sticky-container"); // Elements that only change opacity

//     window.addEventListener("scroll", function () {
//         let scrollY = window.scrollY || document.documentElement.scrollTop;
//         let maxScroll = 500; // Adjust this value to control sensitivity
//         let opacity = Math.max(1 - scrollY / maxScroll, 0);
//         let blurAmount = Math.min((scrollY / maxScroll) * 25, 25); // Blur up to 25px

//         // Apply opacity and blur to the target element
//         if (targetElement) {
//             targetElement.style.opacity = opacity;
//             targetElement.style.backdropFilter = `blur(${blurAmount}px)`;
//         }

//         // Apply only opacity to sticky elements
//         stickyElements.forEach(element => {
//             element.style.opacity = opacity;
//         });
//     });
// });


// WRAP CATEGORIES
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
    document.getElementById('downArrow').classList.toggle("flip");
});

// OPACITY AND BLUR FOR TITLE INTRO CONTENT

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
    const elements = document.querySelectorAll(".down-arrow");

    elements.forEach(element => {
        console.log("Appending SVG to:", element.textContent);

        // Create a wrapper div *inside* the loop
        let wrapperDiv = document.createElement("div");
        wrapperDiv.id = 'downArrow';
        wrapperDiv.classList.add("svg-wrapper");

        // Create an SVG element
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 500 277.78");
        svg.classList.add("custom-svg");

        // Add SVG content
        svg.innerHTML = `
            <polygon fill="#231f20" points="444.44 0 388.89 0 333.33 0 277.78 0 222.22 0 166.67 0 111.11 0 55.56 0 0 0 0 55.56 55.56 55.56 55.56 111.11 111.11 111.11 111.11 166.67 166.67 166.67 166.67 222.22 222.22 222.22 222.22 277.78 277.78 277.78 277.78 222.22 333.33 222.22 333.33 166.67 388.89 166.67 388.89 111.11 444.44 111.11 444.44 55.56 500 55.56 500 0 444.44 0"/>
        `;

        // Append the SVG inside the wrapper div
        wrapperDiv.appendChild(svg);

        // Insert the wrapper div after the selected element
        element.parentNode.insertBefore(wrapperDiv, element.nextSibling);

        console.log("SVG inserted after:", element.textContent);
    });
});
