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

    //DOMParser har en funktion som hedder parseFromString, som tager en string og laver det om til et HTML element, så længe man giver den "text/html" som andet argument.
    // parseFromString retunerer et HTMLDocument, ligesom document som der normalt bruges til at manipulere DOM'en.
    // Elementerne (flere, da .wrapper og .modal ikke har en parent) gemmes i tempDocument, så elementerne kan bruges separat.
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
                <span>${show.rating.average}</span>
                </figcaption>
                </figure>
            </div>
        </div>
    `, "text/html");
    const card = tempDocument.body.children[0]; // Det første element er .wrapper
    const modal = tempDocument.body.children[1]; // Det andet element er .modal

    // trigger bliver fundet via card variablen, så javascript leder igennem card elementet for at finde .trigger.
    // Der ledes efter trigger i card variablen i stedet for document, fordi der kommer flere resultater i document, 
    //så vi undgår at tilføje flere eventlisteners til de samme elementer, som allerede har dem.
    const trigger = card.querySelector(".trigger");
    // Det samme gjort her, bare i modal elementet.
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

    // Find #content og append card og modal, i stedet for at tilføje til innerHTML.
    const content = document.getElementById('content');
    content.appendChild(card);
    content.appendChild(modal);
};





