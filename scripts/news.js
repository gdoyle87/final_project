const tickers = document.querySelectorAll(".ticker");

if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    tickers.forEach(ticker => {
        ticker.setAttribute("data-animated", true);

        const tickerInner = ticker.querySelector('.ticker__inner');
        const tickerContent = Array.from(tickerInner.children);

        tickerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            tickerInner.appendChild(duplicatedItem);
        });
    });
}


function parseJSONStories() {

}

    
