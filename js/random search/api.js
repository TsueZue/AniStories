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


const animeUrl = await fetch('https://api.jikan.moe/v4/anime/50738')
const animeJson = await animeUrl.json()
const animeData = animeJson.data

console.log(animeData)

const animeTitle = document.querySelector('.title')
const animePoster = document.querySelector('.animePoster')

const genre1 = document.querySelector('.g1')
const genre2 = document.querySelector('.g2')
const genre3 = document.querySelector('.g3')

const year = document.querySelector('.year')
const season = document.querySelector('.seasons')

animeTitle.textContent = animeData.title
animePoster.src = animeData.images.webp.image_url

genre1.textContent = animeData.genres[0]?.name || "Sem gênero";
genre2.textContent = animeData.genres[1]?.name || "Sem gênero";
genre3.textContent = animeData.genres[2]?.name || "Sem gênero";

if (genre1.textContent === "Sem gênero") {
  genre1.style.display = "none";
} else {
  genre1.textContent = animeData.genres[0]?.name;
}

if (genre2.textContent === "Sem gênero") {
    genre2.style.display = "none";
  } else {
    genre2.textContent = animeData.genres[1]?.name;
  }

  if (genre3.textContent === "Sem gênero") {
    genre3.style.display = "none";
  } else {
    genre3.textContent = animeData.genres[2]?.name;
  }

 year.textContent = animeData.year

if(year.textContent = "null"){
    year.style.display = "none"
} else {
    year.textContent = animeData.year
}

season.textContent = animeData.status


