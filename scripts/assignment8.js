// Part One global variables
const $slide = $('#slide');
const $spin = $('#spin');
const $reverseSpin = $('#reverse_spin');
const $stop = $('#stop');

let bikeAnimationHandler;
let bikeTimeoutHandler;

let counter = 1;
const MAX_BIKE_IMG = 34; 

let animation_lock = false;

const DIRECTION = Object.freeze({
    FORWARD: 1,
    REVERSE: -1,
    HORIZONTAL: `X`,
    VERTICAL: `Y`
});
let currentDirection;

//Part Two global variables
const $pacman = $('#pac-man');
const $container = $('.pac-man-container');

let positionX;
let positionY;
let pacmanAnimationHandler;
let pacmanTimeoutHandler;
let pacmanDirection = {axis: DIRECTION.HORIZONTAL, direction: DIRECTION.FORWARD};

const SPEED = 0.05; // in percent
const DELAY = 100; //in ms

function changeSlide(direction = DIRECTION.FORWARD) {
    counter+=direction;
    if(counter > MAX_BIKE_IMG) {
        counter = 1;
    } else if (counter < 1) {
        counter = MAX_BIKE_IMG;
    }
    let src = `images/product/bike-${counter}.jpg`; 
    console.log(src);

    $slide.attr('src', src);            
    $slide.attr('alt', src);
    bikeTimeoutHandler = setTimeout(function() {
        bikeAnimationHandler = requestAnimationFrame(()=>changeSlide(direction));
    }, DELAY);
}
function startAnimation(newDirection) {
    if (!animation_lock) {
        animation_lock = true; 
        currentDirection = newDirection;
        bikeAnimationHandler = requestAnimationFrame(()=>changeSlide(currentDirection));
    } else if (currentDirection !== newDirection) {
        currentDirection = newDirection;

        stopAnimation();
        bikeAnimationHandler = requestAnimationFrame(()=>changeSlide(currentDirection));
    }
}

function stopAnimation() {
    cancelAnimationFrame(bikeAnimationHandler);
    clearTimeout(bikeTimeoutHandler);

}

$spin.click( function() {
    startAnimation(DIRECTION.FORWARD);
});

$reverseSpin.click( function() {
    startAnimation(DIRECTION.REVERSE);

});

$stop.click(function() {
    stopAnimation();
    animation_lock = false;
})


// Part Two
positionX = 0;
positionY = 0;
// started with mouse controls to test functionality.
// $('#btn-w').on('click', () => startPacman(DIRECTION.VERTICAL, DIRECTION.REVERSE));
// $('#btn-a').on('click', () => startPacman(DIRECTION.HORIZONTAL, DIRECTION.REVERSE));
// $('#btn-s').on('click', () => startPacman(DIRECTION.VERTICAL, DIRECTION.FORWARD));
// $('#btn-d').on('click', () => startPacman(DIRECTION.HORIZONTAL, DIRECTION.FORWARD));
// $('#btn-x').on('click', () => stopPacman());

$(document).on('keydown', function(event) {

    console.log(event.which, event.key);
    switch (event.which) {
        case 87: // w character
            {
                startPacman(DIRECTION.VERTICAL, DIRECTION.REVERSE);
                $('#btn-w').addClass('active');
                $('#btn-x').removeClass('active');
            }
            break;

        case 65: // a character
            {
                startPacman(DIRECTION.HORIZONTAL, DIRECTION.REVERSE);
                $('#btn-a').addClass('active');
                $('#btn-x').removeClass('active');
            }
            break;
        case 83: // s character
            {
                startPacman(DIRECTION.VERTICAL, DIRECTION.FORWARD);
                $('#btn-s').addClass('active');
                $('#btn-x').removeClass('active');
            }
            break;
        case 68: // d character
            {
                startPacman(DIRECTION.HORIZONTAL, DIRECTION.FORWARD);
                $('#btn-d').addClass('active');
                $('#btn-x').removeClass('active');
            }
            break;
        case 88: // x character
            {
                stopPacman();
            }
            break;
    }
})


$(document).on('keyup', function(event) {

    console.log(event.which, event.key);
    switch (event.which) {
        case 87: // w character
            {
                $('#btn-w').removeClass('active');
            }
            break;

        case 65: // a character
            {
                $('#btn-a').removeClass('active');
            }
            break;
        case 83: // s character
            {
                $('#btn-s').removeClass('active');
            }
            break;
        case 68: // d character
            {
                $('#btn-d').removeClass('active');
            }
            break;
        case 88: // x character
            {
                stopPacman();
            }
            break;
    }
})




function startPacman(axis, direction) {
    if (pacmanDirection.axis === axis && pacmanDirection.direction === direction && pacmanAnimationHandler) {
        return;
    }

    stopPacman();
    pacmanDirection = {axis, direction};

    updatePacmanTransform();
    pacmanAnimationHandler = requestAnimationFrame(movePacman);
};



function updatePacmanTransform() {
    let transform = "";

    if (pacmanDirection.axis === DIRECTION.HORIZONTAL) {
        transform = `scaleX(${pacmanDirection.direction})`; 
    } else if (pacmanDirection.axis === DIRECTION.VERTICAL) {
        transform = `rotate(${pacmanDirection.direction === DIRECTION.FORWARD ? 90 : -90}deg)`; 
    }

    $pacman.css('transform', transform);
}


function movePacman() {
    const containerWidth = $container.width();
    const containerHeight = $container.height();

    if (pacmanDirection.axis === DIRECTION.HORIZONTAL) {
        positionX += pacmanDirection.direction * SPEED * containerHeight;//using height for speed so that it is consistent in all directions and sizes
        if (positionX <= 0 || positionX >= containerWidth) {
            pacmanDirection.direction *= DIRECTION.REVERSE;
            updatePacmanTransform();
        }
        positionX = Math.max(0, Math.min(positionX, containerWidth));
    } else if (pacmanDirection.axis === DIRECTION.VERTICAL) {
        positionY += pacmanDirection.direction * SPEED * containerHeight; 
        if (positionY <= 0 || positionY >= containerHeight) {
            pacmanDirection.direction *= DIRECTION.REVERSE;
            updatePacmanTransform();
        }
        positionY = Math.max(0, Math.min(positionY, containerHeight));
    }

    $pacman.css({
        left: `${(positionX / containerWidth) * 100}%`,
        top: `${(positionY / containerHeight) * 100}%`
    });
    $pacman.attr('src', `images/pacman/pac-man-fast.gif`);

    pacmanTimeoutHandler = setTimeout(() => {
        pacmanAnimationHandler = requestAnimationFrame(movePacman);
    }, DELAY);
}



function stopPacman() {
    cancelAnimationFrame(pacmanAnimationHandler);
    clearTimeout(pacmanTimeoutHandler);
    $pacman.attr('src', `images/pacman/pac-man-static.gif`);
    pacmanAnimationHandler = null;
    $('#btn-x').addClass('active');

};

