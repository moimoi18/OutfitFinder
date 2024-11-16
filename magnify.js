function magnify(imgID, zoom) {
  var img, glass, magnifiedImg, w, h;
  img = document.getElementById(imgID);

  /* Create magnifier glass */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Create inner DIV for magnified image */
  magnifiedImg = document.createElement("DIV");
  magnifiedImg.setAttribute("class", "img-magnified");
  glass.appendChild(magnifiedImg);

  /* Insert magnifier glass */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnified image */
  magnifiedImg.style.backgroundImage = "url('" + img.src + "')";
  magnifiedImg.style.backgroundRepeat = "no-repeat";
  magnifiedImg.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

  /* Get half of the magnifier's width and height */
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Mouse and touch movement events */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    e.preventDefault();

    /* Get the cursor's x and y positions relative to the image */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

    /* Prevent the magnifier from moving outside the image */
    if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
    if (x < w / zoom) { x = w / zoom; }
    if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
    if (y < h / zoom) { y = h / zoom; }

    /* Set the position of the magnifier glass */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";

    /* Display what the magnifier glass "sees" */
    magnifiedImg.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";
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
