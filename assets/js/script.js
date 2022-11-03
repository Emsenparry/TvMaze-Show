let ApiData = [];

fetch('https://api.tvmaze.com/shows')

.then((response) => {
    return response.json();
})
.then((shows) => {
    // console.log(shows);
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
    <div class="wrapper">
    <img src="${show.image.original}">
    <h2>${show.name}</h2>
    </div>

    <div class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <figure class="figure-main">
        <img class="trigger" src="${show.image.original}">
        <figcaption>
        <h2>${show.name}</h2>
        <h3>${show.genres}</h3> 
        <p>${show.summary}</p>
        <p>${show.rating.average}</p>
        </figcaption>
        </figure>
    </div>
    `
    const modal = document.querySelector(".modal");
    const trigger = document.getElementsByClassName(".trigger");
    const closeButton = document.querySelector(".close-button");

};

function toggleModal() {
    modal.classList.toggle("show-modal");
    }

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

