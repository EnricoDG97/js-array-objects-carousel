/*
Consegna:
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/

// creazione array di oggetti
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

const carouselContainerEl = document.getElementById("carousel-container");
const imagesContainerEl = document.getElementById("images-container")
const activeImageElement = document.getElementById("active-image");
const arrowUpElement = document.getElementById("arrow-up");
const arrowDownElement = document.getElementById("arrow-down");
const slideTitleElement = document.getElementById("slide-title");
const slideDescriptionEl = document.getElementById("slide-description");
const thumbnailsElement = document.getElementById("thumbnails");

const startStopButton = document.getElementById("start-stop");
const reverseButton = document.getElementById("reverse-showimage");

let carouselIndex = 0;

createThumbnails(thumbnailsElement, images);
const thumbnailsArray = document.querySelectorAll('.thumbnail');

showSlide(images, carouselIndex);

arrowDownElement.addEventListener("click", () => {

    carouselIndex =  updateIndex(carouselIndex, 'giu');

    showSlide(images, carouselIndex);

});


arrowDownElement.addEventListener("click", () => {
    // carouselIndex++;
    carouselIndex = updateIndex(carouselIndex, "giu");
    showSlide(images, carouselIndex);
    // updateIndex(carouselIndex);

});

arrowUpElement.addEventListener("click", () => {
    // carouselIndex--;
    carouselIndex = updateIndex(carouselIndex, "su");
    showSlide(images, carouselIndex);
    // updateIndex(carouselIndex);
});

// BOTTONE START/STOP
startStopButton.addEventListener("click", () => {
    if(isAutoPlayOn) {
      clearInterval(autoplayFunction);
      isAutoPlayOn = false;
      startStopButton.innerText = "START!";
    } else {
      autoplayFunction = setInterval(() => {
        slideIndex = updateIndex(slideIndex, autoPlayDirection);
        showSlide(images, slideIndex);
      }, 2000);
      isAutoPlayOn = true;
      startStopButton.innerText = "STOP!"
    }
  });

 













// FUNZIONI

// FUNZIONE MOSTRA IMMAGINE personalizzata che sostituisce per ogni oggetto
function showSlide(slideArray, actualIndex) {
    const slideObject = slideArray[actualIndex];
    console.log(slideObject);
    activeImageElement.src = slideObject.image;
    slideTitleElement.innerText = slideObject.title;
    slideDescriptionEl.innerText = slideObject.text;
    thumbnailsArray.forEach((actualThumbnail) => {
        actualThumbnail.classList.remove('active');
    })
    thumbnailsArray[actualIndex].classList.add('active');
}

// FUNZIONE INDICE che restituisce indice in base alla lunghezza dell'array images
function updateIndex(actualIndex, direction) {
    if(direction == "su") {
        if(actualIndex <= 0) {
                return images.length - 1;
            } else {
                return carouselIndex - 1;
            }
    } else {
        if(actualIndex >= images.length - 1) {
                return 0;
            } else {
                return carouselIndex + 1;
            }
    }
}

// FUNZIONE DI CREAZIONE THUMBNAILS
function createThumbnails(thumbnailsContainer, arraySlides) {
    arraySlides.forEach((actualSlide, actualIndex) => {
        const newThumbnail = document.createElement("img");
        newThumbnail.classList.add("thumbnail");
        newThumbnail.src = actualSlide.image;
        newThumbnail.addEventListener("click", function() {
            slideIndex = actualIndex;
            showSlide(arraySlides, actualIndex);
        });
        thumbnailsContainer.append(newThumbnail);
    });
}