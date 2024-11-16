document.addEventListener('DOMContentLoaded', function() {
  // Define outfitItems directly in the JavaScript
  const outfitItems = {
    shirts: generateImageList('images/shirts/', 'Shirt', 9),
    accessories: generateImageList('images/accessories/', 'Acess', 12),
    pants: generateImageList('images/pants/', 'Pants', 9),
    shoes: generateImageList('images/shoes/', 'Shoes', 8),
  };

  function generateImageList(path, baseName, count) {
    const list = [];
    for (let i = 1; i <= count; i++) {
      list.push(`${path}${baseName}${i}.JPG`);
    }
    return list;
  }

  // Function to get a random item from an array
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Function to update all images
  function generateNewOutfit() {
    updateItemImage('shirtImg', 'shirts');
    updateItemImage('accessoryImg', 'accessories');
    updateItemImage('pantsImg', 'pants');
    updateItemImage('shoesImg', 'shoes');
  }

  // Function to update a specific item's image
  function updateItemImage(imgId, category) {
    const imgElement = document.getElementById(imgId);
    const newSrc = getRandomItem(outfitItems[category]);

    // Avoid repeating the same image
    if (imgElement.src.includes(newSrc)) {
      updateItemImage(imgId, category); // Retry if the same image is selected
    } else {
      imgElement.src = newSrc;

      // Optional: Add transition effect
      imgElement.style.opacity = '0';
      setTimeout(() => {
        imgElement.style.opacity = '1';
      }, 50);
    }
  }

  // Generate the initial outfit when the page loads
  generateNewOutfit();

  // Get DOM elements
  const heartButton = document.querySelector('.heart');
  const thumbsDownButton = document.querySelector('.thumbs-down');

  // Add event listeners to buttons
  heartButton.addEventListener('click', function() {
    saveCurrentOutfit();
    generateNewOutfit();
  });

  thumbsDownButton.addEventListener('click', generateNewOutfit);

  // Add click event listeners to each clothing item image
  const shirtImg = document.getElementById('shirtImg');
  const accessoryImg = document.getElementById('accessoryImg');
  const pantsImg = document.getElementById('pantsImg');
  const shoesImg = document.getElementById('shoesImg');

  shirtImg.addEventListener('click', function() {
    updateItemImage('shirtImg', 'shirts');
  });

  accessoryImg.addEventListener('click', function() {
    updateItemImage('accessoryImg', 'accessories');
  });

  pantsImg.addEventListener('click', function() {
    updateItemImage('pantsImg', 'pants');
  });

  shoesImg.addEventListener('click', function() {
    updateItemImage('shoesImg', 'shoes');
  });

  // Function to save the current outfit
  function saveCurrentOutfit() {
    const outfit = {
      shirt: shirtImg.src,
      accessory: accessoryImg.src,
      pants: pantsImg.src,
      shoes: shoesImg.src
    };

    let savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || [];
    savedOutfits.push(outfit);
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));

    alert('Outfit saved to your closet!');
  }

  // Optional: Preload all images to improve performance
  preloadAllImages();

  function preloadAllImages() {
    Object.values(outfitItems).forEach(categoryArray => {
      categoryArray.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    });
  }
});
