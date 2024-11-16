function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3; /* Border width */
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Hide the magnifier glass initially */
  glass.style.display = "none";

  /* Mouse events */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mouseenter", showMagnifier);
  img.addEventListener("mouseleave", hideMagnifier);

  /* Touch events */
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function showMagnifier() {
    glass.style.display = "block";
  }

  function hideMagnifier() {
    glass.style.display = "none";
  }

  function moveMagnifier(e) {
    var pos, x, y;
    e.preventDefault();

    /* Get the cursor's x and y positions */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

    /* Prevent the magnifier glass from being positioned outside the image */
    if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
    if (x < w / zoom) { x = w / zoom; }
    if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
    if (y < h / zoom) { y = h / zoom; }

    /* Set the position of the magnifier glass */
    glass.style.left = (x - w + img.offsetLeft) + "px";
    glass.style.top = (y - h + img.offsetTop) + "px";

    /* Display what the magnifier glass "sees" */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;

    /* Get the x and y positions of the image */
    a = img.getBoundingClientRect();

    /* Calculate the cursor's x and y coordinates relative to the image */
    x = e.pageX - a.left - window.pageXOffset;
    y = e.pageY - a.top - window.pageYOffset;
    return { x: x, y: y };
  }
}
