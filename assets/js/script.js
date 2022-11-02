let ApiData = [];

fetch('https://api.tvmaze.com/shows')

.then((response) => {
    return response.json();
})
.then((shows) => {
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
    <h1>${show.name}</h1>
    
    `
}

