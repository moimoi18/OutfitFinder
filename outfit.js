document.addEventListener('DOMContentLoaded', function() {
  // Define outfitItems with your actual image filenames
  const outfitItems = {
    shirts: [
      'images/shirts/1.JPG',
      'images/shirts/2.JPG',
      'images/shirts/3.JPG',
      'images/shirts/4.JPG',
      'images/shirts/5.JPG',
      'images/shirts/6.JPG',
      'images/shirts/7.JPG',
      'images/shirts/Shirt1.JPG',
      'images/shirts/Shirt2.JPG',
    ],
    accessories: [
      'images/accessories/22.JPG',
      'images/accessories/23.JPG',
      'images/accessories/24.JPG',
      'images/accessories/25.JPG',
      'images/accessories/26.JPG',
      'images/accessories/27.JPG',
      'images/accessories/28.JPG',
      'images/accessories/29.JPG',
      'images/accessories/30.JPG',
      'images/accessories/31.JPG',
      'images/accessories/Acess1.JPG',
      'images/accessories/Acess2.JPG',
    ],
    pants: [
      'images/pants/8.JPG',
      'images/pants/9.JPG',
      'images/pants/10.JPG',
      'images/pants/11.JPG',
      'images/pants/12.JPG',
      'images/pants/13.JPG',
      'images/pants/14.JPG',
      'images/pants/Pants1.JPG',
      'images/pants/Pants2.JPG',
    ],
    shoes: [
      'images/shoes/15.JPG',
      'images/shoes/16.JPG',
      'images/shoes/17.JPG',
      'images/shoes/18.JPG',
      'images/shoes/19.JPG',
      'images/shoes/20.JPG',
      'images/shoes/21.JPG',
      'images/shoes/Shoes1.JPG',
    ],
  };

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
      shoes: shoesImg.src,
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
