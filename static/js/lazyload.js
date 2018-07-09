document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);

          if (lazyImage.tagName == "IMG") {
            lazyImage.src = lazyImage.dataset.src;
          }
        }
      })
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});