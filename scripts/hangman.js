$letterList = $('.letter-list');
const word = "airplane";

$btn = $(".btn");


function loadMap() {
    fetch("/images/map.svg")  // Added leading slash for consistent path
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(svgData => {
            const mapContainer = document.getElementById("map");
            
            // Parse SVG
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
            const svgElement = svgDoc.documentElement;

            // Clear existing content
            mapContainer.innerHTML = "";
            
            // Set styling to ensure visibility (you can move this to CSS)
            svgElement.style.width = "100%";
            svgElement.style.height = "auto";
            
            // Append SVG
            mapContainer.appendChild(svgElement);

            // Verify it loaded and you can access province IDs
            const provinces = svgElement.querySelectorAll('[id]');
            console.log('Found province IDs:', provinces.length);
        })
        .catch(error => console.error("Error loading SVG:", error));
}

// loadMap();
function generateAnnexationOrder() {
    let provinces = ["AB", "SK", "MB", "ON", "QC", "NB", "NS", "PE", "NL", "YT", "NT", "NU"];
    return provinces.sort(() => Math.random() - 0.5); 
}

let annexationQueue = generateAnnexationOrder();

function startAnnexation() {
    let interval = setInterval(() => {
        if (annexationQueue.length === 0) {
            clearInterval(interval);
            return;
        }

        let nextProvince = annexationQueue.pop(); 
        let provinceElement = document.querySelector(`#${nextProvince}`);

        if (provinceElement) {
            provinceElement.classList.add("taken"); 
            console.log(`Annexed: ${nextProvince}`);
        }
    }, 1000); 
}

startAnnexation();


function startGame(word) {
    console.log(Array.from(word));
    letters = Array.from(word);
    let html =``;
    letters.forEach(letter => {
        html +=`<li class="letter">${letter}</li>`
    })
    $letterList.html(html); 
}

startGame(word);

$btn.on("click", function() {
    let button = this.id;
    console.log(button);
    $(`#${button}`).attr('disabled', 'disabled');

    // TODO: Add a comparison against array using .replace btn_ to get just the letter clicked.
    
    // TODO: Update the map and the news cycle or reveal the letter
});
