$letterList = $('.letter-list');
let word;
let hint;
let guess = "";
let guesses = 0;

$start = $("#start");
$btn = $(".btn");
$outcome = $("#outcome");
$guesses = $("#guesses");
$winMsg = $("#win_msg");
$loseMsg = $("#lose_msg");
$flag = $("#flag");
$playAgainBtn = $('#play-again');

const can_flag = "/images/can_flag.svg"
const us_flag = "/images/us_flag.svg"

function loadMap() {
    fetch("/final_project/images/map.svg")  
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(svgData => {
            const mapContainer = document.getElementById("map");
            
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
            const svgElement = svgDoc.documentElement;

            mapContainer.innerHTML = "";
            
            //svgElement.style.width = "100%";
            svgElement.style.width = "70%";
            svgElement.style.height = "auto";

            mapContainer.appendChild(svgElement);

            const provinces = svgElement.querySelectorAll('[id]');
            console.log('Found province IDs:', provinces.length);
            resetProvinceColours();
        })
        .catch(error => console.error("Error loading SVG:", error));
}


function resetProvinceColours() {
    const provinces = ["BC", "AB", "SK", "MB", "ON",
                       "QC", "NB", "NS", "PE",
                       "NL", "YT", "NT", "NU"] 
    provinces.forEach(province => {
        provinceElement = document.querySelector(`#${province}`);
        provinceElement.classList.add("untaken");
        provinceElement.classList.remove("taken");

    })
}

loadMap();

function generateAnnexationOrder() {
    // BC not included in the annexation order so that it can always be one of the final holdouts
    let provinces = ["AB", "SK", "MB", "ON",
                     "QC", "NB", "NS", "PE",
                     "NL", "YT", "NT", "NU"];

    return provinces.sort(() => Math.random() - 0.5); 
}

let annexationQueue = generateAnnexationOrder();

function annex() {
        if (!annexationQueue) {
        return;
    }
        let nextProvince = annexationQueue.pop(); 
        let provinceElement = document.querySelector(`#${nextProvince}`);

        if (provinceElement) {
            provinceElement.classList.add("taken"); 
            provinceElement.classList.remove("untaken");
            console.log(`Annexed: ${nextProvince}`);
        }
}


function getWords() {
    fetch("/final_project/data/word_list.json")
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
    guess = '';
    letters = Array.from(word);
    console.log(letters);
    let html =``;
    letters.forEach(letter => {
        if (letter===" ") {
            html +=`<li class="letter guessed">${letter}</li>`
        } else {
            html +=`<li class="letter">${letter}</li>`
        }
    $playAgainBtn.attr('hidden', 'true');
    })

    $letterList.html(html); 
}
function checkGuess() {
    let sortedGuess = Array.from(guess.replace(" ", "")).sort().join("");
    let sortedWord = Array.from(word.replace(" ", "")).sort().join("");
    if (sortedGuess === sortedWord) {
        console.log("You win!");
        $btn.attr('disabled', 'disabled');
        $winMsg.removeAttr('hidden');
        $playAgainBtn.removeAttr('hidden');
        load_flag(can_flag);
    }
    else{ console.log("Guess: ", sortedGuess, " Word: ", sortedWord)}
}
function loseGame() {
    console.log("You lose! Good day, sir!")
    $btn.attr("disabled", "disabled");
    load_flag(us_flag);
    $loseMsg.removeAttr('hidden');
    $playAgainBtn.removeAttr('hidden');

}

function load_flag(flag) {
    // Note: I didn't want svg in the html so this function was used instead.
    fetch(flag)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(svgData => {
        const outcomeContainer = document.getElementById("flag");
        
        // Parse SVG
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Remove hardcoded width and height
        svgElement.removeAttribute("width");
        svgElement.removeAttribute("height");

        // Add a dynamic viewBox (based on original dimensions)
        if (flag === us_flag) {
                svgElement.setAttribute("viewBox", "0 0 1235 650");
            }

        // Ensure it scales properly
        svgElement.style.width = "100%";
        svgElement.style.height = "100px";
        svgElement.style.display = "block";  // Prevents inline whitespace issues

        // Append SVG
        outcomeContainer.innerHTML = "";
        outcomeContainer.appendChild(svgElement);
    })
    .catch(error => console.error("Error loading SVG:", error));

}
$start.on('click', function() {
    getWords();
    loadMap();
    annexationQueue = generateAnnexationOrder();
    $btn.each(function() {
        $(this).removeAttr('disabled');
    });
    $flag.html("");
    guesses = 0;
    $guesses.text(guesses);
    $winMsg.attr('hidden', true);
    $loseMsg.attr('hidden', true);
    getNews();

})

$playAgainBtn.on('click', function() {
    getWords();
    loadMap();
    annexationQueue = generateAnnexationOrder();
    $btn.each(function() {
        $(this).removeAttr('disabled');
    });
    $flag.html("");
    guesses = 0;
    $guesses.text(guesses);
    $winMsg.attr('hidden', true);
    $loseMsg.attr('hidden', true);
    getNews();

})

$btn.on("click", function() {
    let button = this.id;
    console.log(button);
    $(`#${button}`).attr('disabled', 'disabled');

    let letter = button.replace("btn_", "").toLowerCase();
    let place = word.indexOf(letter);
    console.log(place);
   
    // Process the guess
    if (place >= 0) {
        // Correct Guess
        $(".letter").filter(function() {
            match = $(this).text() === letter;
            console.log(match);
            if (match) {
                guess+=letter;
            }
            return match;
        }).addClass("guessed");
    
        checkGuess();
    } else {
        // Wrong Guess
        if (annexationQueue.length === 1) {
            // we are on the last province so take BC too
            annex();

            let provinceElement = document.querySelector(`#BC`);

            provinceElement.classList.add("taken"); 
            provinceElement.classList.remove("untaken"); 

            loseGame();

        }
        else { 
            if (annexationQueue.length === 12) {
                // for the first wrong guess, take an additional province
                annex();
            } 

            annex();
            annex();
        }
        guesses++;
        $guesses.text(guesses);
        getNews();

    }


});
