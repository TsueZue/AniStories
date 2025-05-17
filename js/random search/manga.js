const main = document.querySelector('main')
const animePage = document.querySelector('.animePage')

const manga = document.querySelector('.manga')
const arrowbackBtn = document.querySelector('.arrowBack')

manga.addEventListener('click', function() {

    main.classList.add('inative')
    animePage.classList.remove('inative')  
})

arrowbackBtn.addEventListener('click', () => {
    console.log('click')

    main.classList.add('inative')
    animePage.classList.remove('inative')
})

const MangaUrl = await fetch("https://api.jikan.moe/v4/random/manga")
const MangaJson = await MangaUrl.json()
const MangaData = MangaJson.data

const mangaTitle = document.querySelector('.title')
const mangaPoster = document.querySelector('.animePoster')

mangaTitle.textContent = mangaData.title
mangaPoster.src = mangaData.images.webp.image_url

const genre1 = document.querySelector('.g1');
const genre2 = document.querySelector('.g2');
const genre3 = document.querySelector('.g3');

const genreElements = [genre1, genre2, genre3];

for (let i = 0; i < genreElements.length; i++) {
  console.log(genreElements.length)
  if (i < animeData.genres.length) {
    genreElements[i].textContent = MangaData.genres[i].name;
    genreElements[i].style.display = "inline";  // Exibe o gênero
  } else {
    genreElements[i].style.display = "none";  // Esconde as caixinhas extras
  }
}


const year = document.querySelector('.year')
const season = document.querySelector('.seasons')

 year.textContent = MangaData.year

if(year.textContent = "null"){
    year.style.display = "none"
} else {
    year.textContent = MangaData.year
}

season.textContent = MangaData.status

const trailerBtn = document.querySelector('.trailerbtn')
const trailer = document.querySelector('.trailer')

trailer.href = MangaData.trailer.url;
console.log(trailer)


const sinopse = document.querySelector('.description')

sinopse.innerText = MangaData.synopsis