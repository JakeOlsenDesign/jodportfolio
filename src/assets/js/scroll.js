window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY; // Get the current vertical scroll position
  
    document.querySelectorAll('.blur').forEach(function(element) {
      var elementHeight = element.offsetHeight;
      var opacity = ((1 - (elementHeight - scrollTop) / elementHeight) * 0.8) + 0.2;
      element.style.opacity = opacity;
    });
  });