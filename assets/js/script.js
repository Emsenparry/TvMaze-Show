let ApiData = [];

fetch('https://api.tvmaze.com/shows')

.then((response) => {
    return response.json();
})
.then((shows) => {
    console.log(shows);
    ApiData = shows.slice(0, 12)
    
})
.catch((error) => {
    console.error(error);
})
.finally(() => {
    for(let i = 0; i < ApiData.length; i++){
        let show = ApiData[i];
        createElm(show);
    }
})


const createElm = (show) => {
    document.getElementById('content').innerHTML += `
    <div class="grid-container">
    <img src="${show.image.original}">
    <h1>${show.name}</h1>
    </div>
    `
}

