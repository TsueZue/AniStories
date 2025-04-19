const animeUrl = await fetch('https://api.jikan.moe/v4/random/anime')
const animeJson = await animeUrl.json()
const animeData = animeJson.data

console.log(animeData)

const animeTitle = document.querySelector('.title')
const animePoster = document.querySelector('.animePoster')

const genre1 = document.querySelector('.g1')
const genre2 = document.querySelector('.g2')
const genre3 = document.querySelector('.g3')

const year = document.querySelector('.year')
const season = document.querySelector('.season')

animeTitle.textContent = animeData.title
animePoster.src = animeData.images.webp.image_url