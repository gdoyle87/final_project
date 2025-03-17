$letterList = $('.letter-list');
const word = "airplane";

$btnA = $("#btn_a");
$btnB = $("#btn_b");
$btnC = $("#btn_c");
$btnD = $("#btn_d");
$btnE = $("#btn_e");
$btnF = $("#btn_f");
$btnG = $("#btn_g");
$btnH = $("#btn_h");
$btnI = $("#btn_i");
$btnJ = $("#btn_j");
$btnK = $("#btn_k");
$btnL = $("#btn_l");
$btnM = $("#btn_m");
$btnN = $("#btn_n");
$btnO = $("#btn_o");
$btnP = $("#btn_p");
$btnQ = $("#btn_q");
$btnR = $("#btn_r");
$btnS = $("#btn_s");
$btnT = $("#btn_t");
$btnU = $("#btn_u");
$btnV = $("#btn_v");
$btnW = $("#btn_w");
$btnX = $("#btn_x");
$btnY = $("#btn_y");
$btnZ = $("#btn_z");





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

$btnA.on("click", () => {
    console.log("a clicked");
    $btnA.attr('disabled', 'disabled');
});
