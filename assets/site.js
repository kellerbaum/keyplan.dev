// Key plan: highlight the area of the page you're reading.
(function () {
  var plan = document.querySelector(".keyplan");
  var status = document.querySelector(".keyplan-status");
  if (!plan || !("IntersectionObserver" in window)) return;

  var links = {};
  plan.querySelectorAll("a[data-area]").forEach(function (a) {
    links[a.getAttribute("data-area")] = a;
  });
  var idle = status ? status.textContent : "";

  function show(id) {
    Object.keys(links).forEach(function (key) {
      if (key === id) links[key].setAttribute("aria-current", "true");
      else links[key].removeAttribute("aria-current");
    });
    if (status) {
      status.textContent = id && links[id] ? "You are here: " + links[id].getAttribute("data-label") : idle;
    }
  }

  var visible = {};
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      var current = null;
      Object.keys(links).forEach(function (key) {
        if (visible[key] && !current) current = key;
      });
      show(current);
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  Object.keys(links).forEach(function (key) {
    var section = document.getElementById(key);
    if (section) observer.observe(section);
  });
})();
