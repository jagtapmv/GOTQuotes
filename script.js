const quoteContainer = document.getElementById('quote-container');
const quotetext = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');

//Get quote from API
async function getQuote(){
    const apiUrl = "https://api.gameofthronesquotes.xyz/v1/random"
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'

    try{
        const Response = await fetch(proxyUrl + apiUrl);
        const data = await Response.json();
        if(data.character.name === ''){
            quoteAuthor = "Unknown";
        }else{
            quoteAuthor.innerText = data.character.name;
        }
        if(data.sentence.length > 50){
            quotetext.classList.add('long-text');
        }else{
            quotetext.classList.remove('long-text')
        }
        quotetext.innerText = data.sentence;
    } catch(error){
        getQuote();
    }
}

//tweet the current Quote
function tweetQuote(){
    const quote = quotetext.innerText;
    const author = quoteAuthor.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//Event listeners
newQuoteButton.addEventListener('click',getQuote);
twitterButton.addEventListener('click',tweetQuote);

getQuote();