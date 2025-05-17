const main = document.querySelector('main')
const animePage = document.querySelector('.animePage')

const randomBtn = document.querySelector('.random')
const arrowbackBtn = document.querySelector('.arrowBack')

randomBtn.addEventListener('click', function() {

    main.classList.add('inative')
    animePage.classList.remove('inative')  
})

arrowbackBtn.addEventListener('click', () => {
    main.classList.toggle('inative')
    animePage.classList.toggle('inative')
})


const animeUrl = await fetch('https://api.jikan.moe/v4/random/anime')
const animeJson = await animeUrl.json()
const animeData = animeJson.data


const animeTitle = document.querySelector('.title')
const animePoster = document.querySelector('.animePoster')

animeTitle.textContent = animeData.title
animePoster.src = animeData.images.webp.image_url

const genre1 = document.querySelector('.g1');
const genre2 = document.querySelector('.g2');
const genre3 = document.querySelector('.g3');

const genreElements = [genre1, genre2, genre3];

for (let i = 0; i < genreElements.length; i++) {
  console.log(genreElements.length)
  if (i < animeData.genres.length) {
    genreElements[i].textContent = animeData.genres[i].name;
    genreElements[i].style.display = "inline";  // Exibe o gênero
  } else {
    genreElements[i].style.display = "none";  // Esconde as caixinhas extras
  }
}


const year = document.querySelector('.year')
const season = document.querySelector('.seasons')

 year.textContent = animeData.year

if(year.textContent = "null"){
    year.style.display = "none"
} else {
    year.textContent = animeData.year
}

season.textContent = animeData.status

const trailerBtn = document.querySelector('.trailerbtn')
const trailer = document.querySelector('.trailer')

trailer.href = animeData.trailer.url;
console.log(trailer)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker registrado!'))
    .catch((error) => console.error('Erro ao registrar o SW:', error));
}