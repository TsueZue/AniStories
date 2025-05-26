const main = document.querySelector('main')
const animePage = document.querySelector('.animePage')

const randomBtn = document.querySelector('.random')
const arrowbackBtn = document.querySelector('.arrowBack')

const searchPage = document.querySelector('.search')
const searchButton = document.querySelector('.searchButton')
const searchback = document.querySelector('.searchback')

searchButton.addEventListener('click', () => {
  searchPage.classList.toggle('inative')
  main.classList.add('inative')
  animePage.classList.add('inative')
})

searchback.addEventListener('click', () => {
  searchPage.classList.add('inative')
  main.classList.remove('inative')
})

randomBtn.addEventListener('click', async function () {
  main.classList.add('inative')
  animePage.classList.remove('inative')

  try {
      // Sorteia uma página de 1 a 10 (top 500 animes, 50 por página)
      const randomPage = Math.floor(Math.random() * 20) + 1
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${randomPage}`)
      const json = await response.json()
      const results = json.data

      // Sorteia um anime da página (50 animes por página)
      const randomIndex = Math.floor(Math.random() * results.length)
      const animeData = results[randomIndex]

      // Título e imagem
      const animeTitle = document.querySelector('.title')
      const animePoster = document.querySelector('.animePoster')
      animeTitle.textContent = animeData.title
      animePoster.src = animeData.images.webp.image_url

      // Gêneros
      const genre1 = document.querySelector('.g1')
      const genre2 = document.querySelector('.g2')
      const genre3 = document.querySelector('.g3')
      const genreElements = [genre1, genre2, genre3]

      for (let i = 0; i < genreElements.length; i++) {
          if (i < animeData.genres.length) {
              genreElements[i].textContent = animeData.genres[i].name
              genreElements[i].style.display = "inline"
          } else {
              genreElements[i].style.display = "none"
          }
      }

      // Ano e status
      const year = document.querySelector('.year')
      const season = document.querySelector('.seasons')
      if (animeData.year === null) {
          year.style.display = "none"
      } else {
          year.textContent = animeData.year
          year.style.display = "inline"
      }

      season.textContent = animeData.status

      // Trailer
      const trailerBtn = document.querySelector('.trailerbtn')
      const trailer = document.querySelector('.trailer')
      if (animeData.trailer && animeData.trailer.url) {
          trailer.href = animeData.trailer.url
      } else {
          trailer.href = "#"
          trailerBtn.style.display = "none"
      }

      // Sinopse
      const sinopse = document.querySelector('.description')
      sinopse.innerText = animeData.synopsis || "Sinopse não disponível."

  } catch (error) {
      console.error("Erro ao carregar o anime:", error)
  }
})

arrowbackBtn.addEventListener('click', () => {
  main.classList.remove('inative')
  animePage.classList.add('inative')
})

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log('Service Worker registrado!'))
        .catch((error) => console.error('Erro ao registrar o SW:', error));
}



///////////////////////////////

const input = document.querySelector('.searchinput')

const imgsearch = document.querySelector('.imgcapa')
const textsearch = document.querySelector('.titles')
let animecont = document.querySelector('.containerr')

input.addEventListener('keydown', async (event) => {

  const valor = input.value 

  if (event.key === 'Enter') {
  
 

    try {
      let animeUrl = await fetch(`https://api.jikan.moe/v4/anime?q=${valor}`)
      let animeJson = await animeUrl.json()
      let animeDados = animeJson.data


      for(let i = 0; i < animeDados.length; i++) {

        let animeitem = document.createElement("div")
        animeitem.classList.add("animeitem")

        let animespan = document.createElement("span")
        let animecapa = document.createElement("img")

        animecapa.classList.add("capaanime")

        let animespan2 = document.createElement("span")
        animespan2.classList.add("animecontainer")

        let animetext = document.createElement("p")
        animetext.classList.add("titles")

        let animetext2 = document.createElement("p")
        animetext2.classList.add("sinopse")

        animecont.appendChild(animeitem)
        animeitem.appendChild(animespan)
        animespan.appendChild(animecapa)
        animeitem.appendChild(animespan2)
        animespan2.appendChild(animetext)
        animespan2.appendChild(animetext2)

        animecapa.src = animeDados[i].images.jpg.image_url
        animetext.textContent = animeDados[i].title
        animetext2.textContent = animeDados[i].synopsis.slice(0, 210)

      }

    } catch(error) {
      console.log(error)
    }



  } 
   
  })

