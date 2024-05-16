const dropArea=document.getElementById("drop-area");
const inputFile=document.getElementById("input-file");
const imageView=document.getElementById("img-view");
const bg=document.getElementById("hero");
const progressBar = document.getElementById("progress");
const accessories = document.getElementById("accessories");
const sizeBtn = document.getElementById("resize-buttons");
const increaseSizeBtn = document.getElementById('increase-size');
const decreaseSizeBtn = document.getElementById('decrease-size');
const accBtn = document.getElementById("accessories-buttons");
const saveButton = document.getElementById('save-button');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');



inputFile.addEventListener("change", uploadImage);

function uploadImage(){
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage=`url(${imgLink})`;
    imageView.textContent="";
    

}

dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});
inputFile.addEventListener("change", function() {
    const file = this.files[0];
    bg.style.background = "linear-gradient(lightblue, #c2b6d9)";
    imageView.style.border = '2px dotted red';

  
    shoe();
    //face recognition

});
dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    imageView.style.border = '2px dotted red';
    dropArea.style.backgroundColor = ""; // Reset background color
    bg.style.background = "linear-gradient(lightblue, #c2b6d9)";


    const file = e.dataTransfer.files[0];
    const fileType = file.type ? file.type.toLowerCase() : '';

    if (fileType !== "image/jpeg") {
        alert("Please upload a JPG file.");
        bg.style.background = "";

        return;
    }

    if (file.size > 300 * 1024) {
        alert("File size exceeds 300 Kb limit.");
        bg.style.background = "";

        return;
    }

  // Display the image or handle the file as needed
  const imgLink = URL.createObjectURL(file);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.textContent = "";

  // Show the accessories
   // Simulate upload progress
shoe();
//face recognition

});

function shoe(){
    let progress = 0;
    const interval = setInterval(function() {
        progress += 10;
        progressBar.style.width = progress + "%";
    
        if (progress >= 100) {
            clearInterval(interval);
            // accessories.style.display = "block";
            // sizeBtn.style.display = "block";
            // accBtn.style.display = "block";
            // saveButton.style.display = "block";
        }
    }, 500);

}

// Event listeners for size buttons
// Event listener for increasing the size of the selected accessory
increaseSizeBtn.addEventListener('click', () => {
    if (selectedAccessory) {
        const currentWidth = parseInt(selectedAccessory.getAttribute("data-width"));
        selectedAccessory.style.width = `${currentWidth + 10}px`;
        selectedAccessory.setAttribute("data-width", currentWidth + 10);
    }
});

// Event listener for decreasing the size of the selected accessory
decreaseSizeBtn.addEventListener('click', () => {
    if (selectedAccessory) {
        const currentWidth = parseInt(selectedAccessory.getAttribute("data-width"));
        selectedAccessory.style.width = `${Math.max(currentWidth - 10, 0)}px`;
        selectedAccessory.setAttribute("data-width", Math.max(currentWidth - 10, 0));
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        if (imageView) {
            const currentWidth = imageView.offsetWidth;
            imageView.style.width = `${currentWidth + 10}px`;
            // Adjust other elements if needed
        }
    } else if (event.key === 's') {
        if (imageView) {
            const currentWidth = imageView.offsetWidth;
            imageView.style.width = `${Math.max(currentWidth - 10, 0)}px`;
            // Adjust other elements if needed
        }
    }
});

// hats// Function to deselect all accessories
// Object to store the selected accessories for each category
let selectedAccessory = null;

let selectedAccessories = {
    hats: null,
    glasses: null,
    beard: null
};

function deselectAllAccessories() {
    const allAccessories = document.querySelectorAll(".accessory");
    allAccessories.forEach(accessory => {
        if (accessory !== selectedAccessory) {
            accessory.style.border = "none";
        }
    });
}

// Event listener for clicking on an accessory
accessories.addEventListener("click", (event) => {
    const clickedAccessory = event.target;
    const category = clickedAccessory.getAttribute("id");

    // Remove the old accessory from the same category
    if (selectedAccessories[category]) {
        selectedAccessories[category].remove();
        selectedAccessories[category] = null;
    }

    // Deselect all accessories in other categories
    Object.keys(selectedAccessories).forEach((cat) => {
        if (cat !== category && selectedAccessories[cat]) {
            selectedAccessories[cat].style.border = "none";
            selectedAccessories[cat] = null;
        }
    });

    // Select the clicked accessory
    selectedAccessory = clickedAccessory;
    selectedAccessory.style.border = "2px dotted red";
    imageView.style.border = 'none';

    // Set initial width
    selectedAccessory.setAttribute("data-width", selectedAccessory.offsetWidth);
});



// Event listener for clicking on the face image to deselect the accessory
imageView.addEventListener("click", (event) => {
    // Deselect the selected accessory
    if (selectedAccessory) {
        selectedAccessory.style.border = "none";
        selectedAccessory = null;
    }
});
// Variables to store the initial mouse position and the offset of the accessory



// Event listeners for moving the selected accessory
imageView.addEventListener("dragover", (event) => {
    event.preventDefault();
});imageView.addEventListener("drop", (event) => {
    event.preventDefault();
    if (selectedAccessory && event.target.id === "img-view" && !event.target.contains(selectedAccessory)) {
        event.target.appendChild(selectedAccessory);
        selectedAccessory.style.position = 'absolute'; // Make the accessory movable

        // Add event listeners for moving the selected accessory
        selectedAccessory.addEventListener('mousedown', startMovingAccessory);
        selectedAccessory.addEventListener('touchstart', startMovingAccessory);

        selectedAccessory = null;
    }
});

function startMovingAccessory(event) {
    selectedAccessory = event.target;
    const initialX = event.clientX || event.touches[0].clientX;
    const initialY = event.clientY || event.touches[0].clientY;
    const initialLeft = selectedAccessory.offsetLeft;
    const initialTop = selectedAccessory.offsetTop;

    function moveAccessory(event) {
        const currentX = event.clientX || event.touches[0].clientX;
        const currentY = event.clientY || event.touches[0].clientY;
        const deltaX = currentX - initialX;
        const deltaY = currentY - initialY;

        selectedAccessory.style.left = `${initialLeft + deltaX}px`;
        selectedAccessory.style.top = `${initialTop + deltaY}px`;
    }

    function stopMovingAccessory() {
        document.removeEventListener("mousemove", moveAccessory);
        document.removeEventListener("mouseup", stopMovingAccessory);
        document.removeEventListener("touchmove", moveAccessory);
        document.removeEventListener("touchend", stopMovingAccessory);
    }

    document.addEventListener("mousemove", moveAccessory);
    document.addEventListener("mouseup", stopMovingAccessory);
    document.addEventListener("touchmove", moveAccessory);
    document.addEventListener("touchend", stopMovingAccessory);
}


function selectAccessory(event) {
    const clickedAccessory = event.target;
    // Deselect all accessories
    document.querySelectorAll(".accessory").forEach(accessory => {
        accessory.style.border = "none";
    });

    // Select the clicked accessory
    selectedAccessory = clickedAccessory;
    selectedAccessory.style.border = "2px dotted red";
    imageView.style.border = 'none';

    // Set initial width
    selectedAccessory.setAttribute("data-width", selectedAccessory.offsetWidth);
}

// Event listener for moving the selected accessory to the left
leftBtn.addEventListener('click', () => {
    if (selectedAccessory) {
        const currentLeft = parseInt(selectedAccessory.style.left) || 0;
        selectedAccessory.style.marginRight = `${Math.max(currentLeft - 80, 0)}px`;
    }
});

// Event listener for moving the selected accessory to the right
rightBtn.addEventListener('click', () => {
    if (selectedAccessory) {
        const currentLeft = parseInt(selectedAccessory.style.left) || 0;
        selectedAccessory.style.marginLeft = `${currentLeft + 80}px`;
    }
});


function startMovingAccessory(event) {
    selectedAccessory = event.target;
    const initialMouseX = event.clientX;
    const initialMouseY = event.clientY;
    const accessoryOffsetX = selectedAccessory.offsetLeft;
    const accessoryOffsetY = selectedAccessory.offsetTop;

    function moveAccessory(event) {
        const offsetX = event.clientX - initialMouseX;
        const offsetY = event.clientY - initialMouseY;
        selectedAccessory.style.left = `${accessoryOffsetX + offsetX}px`;
        selectedAccessory.style.top = `${accessoryOffsetY + offsetY}px`;
    }

    function stopMovingAccessory() {
        document.removeEventListener("mousemove", moveAccessory);
        document.removeEventListener("mouseup", stopMovingAccessory);
    }

    document.addEventListener("mousemove", moveAccessory);
    document.addEventListener("mouseup", stopMovingAccessory);
}

// Event listener for moving the selected accessory to the left
leftBtn.addEventListener('click', () => {
    if (selectedAccessory) {
        const currentLeft = parseInt(selectedAccessory.style.left) || 0;
        selectedAccessory.style.marginRight = `${currentLeft - 50}px`;
    }
});

// Event listener for moving the selected accessory to the right
rightBtn.addEventListener('click', () => {
    if (selectedAccessory) {
        const currentLeft = parseInt(selectedAccessory.style.left) || 0;
        selectedAccessory.style.marginLeft = `${currentLeft + 50}px`;
    }
});
// Event listener for saving the final image
saveButton.addEventListener('click', () => {
    // Create a canvas element to draw the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageView.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Draw the selected accessory on the canvas
        if (selectedAccessory) {
            ctx.drawImage(selectedAccessory, selectedAccessory.offsetLeft, selectedAccessory.offsetTop, selectedAccessory.width, selectedAccessory.height);
        }

        // Convert the canvas to a data URL and download the image
        const dataURL = canvas.toDataURL('image/jpeg');
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'image.jpg';
        a.click();
    };
});
saveButton.addEventListener('click', () => {
    html2canvas(imageView, { allowTaint: true }).then(canvas => {
        const dataURL = canvas.toDataURL('image/jpeg');
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'image.jpg';
        a.click();
    });
});



