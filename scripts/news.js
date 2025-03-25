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


function getNews() {
    fetch('/data/headlines.json')
        .then(response => response.json())
        .then(data => {

            const maxLevel = 6;
            const level = `${Math.min(guesses, maxLevel)}`;

            const headlines = data[level].headlines;
            const tickerItems = data[level].ticker;

            const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];

            $('#headline').text(randomHeadline);

            $('.ticker').each(function() {
                const $ticker = $(this);
                const $inner = $ticker.find('.ticker__inner');

                $inner.empty();

                tickerItems.forEach(text => {
                    $('<li>').addClass('ticker__item').text(text).appendTo($inner);
                })
            })
        })

}



getNews();
