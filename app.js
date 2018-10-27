const apiKey = '94c129cda9a24fd9b81868108a1f561f';
const newsSourcesList = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'google-news-in';

window.addEventListener('load', async () => {
    updateNews();
    await updateSources(defaultSource);
    setDefaultSource();
    onChangeUpdateNewsContent();
    registerServiceWorker();
});

const updateNews = async function(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
    const newResponse = await res.json();
    const articles = newResponse.articles;
    main.innerHTML = articles.map(createArticle).join('\n');
}

const createArticle = function(article){
    const topHeaderTemplate = `
        <div class='article'>
            <a href = '${article.url}'>
                <h2>${article.title}</h2>
                <img src = '${article.urlToImage || ''}'>
                <p>${article.description}</p>
            </a>
        </div>
    `;
    return topHeaderTemplate;
}

const updateSources = async function() {
    const response = await fetch(newsSourcesList);
    const sroucesRes = await response.json();
    const sourcesList = sroucesRes.sources;
    sourceSelector.innerHTML = sourcesList.map((src) => {
        return `<option value='${src.id}'>${src.name}</option>`
    }).join('\n');
}

const setDefaultSource = function(){
    sourceSelector.value = defaultSource;
}

const onChangeUpdateNewsContent = function() {
    sourceSelector.addEventListener('change', (event) => {
        updateNews(event.target.value);
    });
}

const registerServiceWorker = function(){
    if('serviceWorker' in navigator) {
        try{
            navigator.serviceWorker.register('./pwa-sw.js');
            console.log('SW Registered');
        }catch(error){
            console.log('SW Reg Error');
        }
    }
}