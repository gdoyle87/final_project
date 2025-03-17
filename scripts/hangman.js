$letterList = $('.letter-list');
let word;
let hint;

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

loadMap();
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

//startAnnexation();


function getWords() {
    fetch("/data/word_list.json")
    .then(response => response.json())
    .then(data => {
            let words = data.words;
            let chosen_word = words[Math.floor(Math.random() * words.length)];
            console.log(chosen_word);
            word = chosen_word.word.toLowerCase();
            hint = chosen_word.hint;

            $("#hint").html(`<p><small>Hint: ${hint}</small></p>`);
            startGame(word);
        })
    .catch(error => console.error("Error loading data", error))
}
getWords();

function startGame(word) {
    letters = Array.from(word);
    console.log(letters);
    let html =``;
    letters.forEach(letter => {
        html +=`<li class="letter">${letter}</li>`
    })
    $letterList.html(html); 
}


$btn.on("click", function() {
    let button = this.id;
    console.log(button);
    $(`#${button}`).attr('disabled', 'disabled');

    // TODO: Add a comparison against array using .replace btn_ to get just the letter clicked.
    let letter = button.replace("btn_", "").toLowerCase();
    let place = word.indexOf(letter);
    console.log(place);
    if (place >= 0) {
            $(".letter").filter(function() {
                match = $(this).text() === letter;
                console.log(match);
                return match;
            }).addClass("guessed");
        }
     
    // TODO: Update the map and the news cycle or reveal the letter

});
