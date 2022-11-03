let ApiData = []; //Let variable med et Empty array

fetch('https://api.tvmaze.com/shows') //Fetcher vores API 

.then((response) => {
    return response.json(); //Retunere vores response som et json format
})
.then((shows) => {
    console.log(shows); //Viser arrayet i vores console
    ApiData = shows.slice(0, 12) //Vi slicer vores array til 12 i BROWSEREN da der er 240 shows i vores array 
})
.catch((error) => {
    console.error(error); //Hvis vores promise fejler, så catcher den en error
})
.finally(() => { //Går ned til finally hvis der ikke er en error
    for(let i = 0; i < ApiData.length; i++){ //For loop
        let show = ApiData[i];
        createElm(show);    
    }
})

const createElm = (show) => { //Vi skaber innerhtml inde i vores sektion som hedder 'Content'.
    const tempDocument = new DOMParser().parseFromString(`
        <div class="wrapper">
            <img class="trigger" src="${show.image.original}">
            <h2>${show.name}</h2>
        </div>

        <div class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <figure class="figure-main">
                <img src="${show.image.original}">
                <figcaption>
                <h2>${show.name}</h2>
                <h3>${show.genres}</h3> 
                <p>${show.summary}</p>
                <p>${show.rating.average}</p>
                </figcaption>
                </figure>
            </div>
        </div>
    `, "text/html");
    const card = tempDocument.body.children[0]; 
    const modal = tempDocument.body.children[1]; 
    const trigger = card.querySelector(".trigger");
    const closeButton = modal.querySelector(".close-button");

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }
    
    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    trigger.addEventListener("click", toggleModal); //Trigger viser modalen når billedet bliver kliiket på
    closeButton.addEventListener("click", toggleModal); //Lukker modalet
    window.addEventListener("click", windowOnClick); //Klikker man på baggrunden, så lukker modalet også

    const content = document.getElementById('content');
    content.appendChild(card);
    content.appendChild(modal);
};





