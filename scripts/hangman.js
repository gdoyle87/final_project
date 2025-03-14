







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
