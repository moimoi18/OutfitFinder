document.addEventListener('DOMContentLoaded', function() {
  let outfitItems = {};

  // Fetch the outfit items when the page loads
  fetch('/outfit-items')
    .then(response => response.json())
    .then(data => {
      outfitItems = data;
      generateNewOutfit(); // Generate the initial outfit
    })
    .catch(error => console.error('Error fetching outfit items:', error));

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
});

