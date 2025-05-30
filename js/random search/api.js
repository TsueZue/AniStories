const main = document.querySelector('main')
const animePage = document.querySelector('.animePage')

const randomBtn = document.querySelector('.random')
const arrowbackBtn = document.querySelector('.arrowBack')

const searchPage = document.querySelector('.search')
const searchButton = document.querySelector('.searchButton')
const searchback = document.querySelector('.searchback')

const favbtn = document.querySelector('.heart')
let anime = null

searchButton.addEventListener('click', () => {
  searchPage.classList.toggle('inative')
  main.classList.add('inative')
  animePage.classList.add('inative')
})

searchback.addEventListener('click', () => {
  searchPage.classList.add('inative')
  main.classList.remove('inative')
  animecont.innerHTML = ""
})

const animePoster = document.querySelector('.animePoster')
const animeTitle = document.querySelector('.title')
const genre1 = document.querySelector('.g1')
const genre2 = document.querySelector('.g2')
const genre3 = document.querySelector('.g3')
const genreElements = [genre1, genre2, genre3]
const year = document.querySelector('.year')
const season = document.querySelector('.seasons')
const trailerBtn = document.querySelector('.trailerbtn')
const trailer = document.querySelector('.trailera')
const sinopse = document.querySelector('.description')



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
      var animeTitle = document.querySelector('.title')
      animeTitle.textContent = animeData.title
      animePoster.src = animeData.images.webp.image_url

      anime = {
        nome: animeData.title,
        src: animeData.images.webp.image_url,
        sinopse: animeData.synopsis,
        genero: animeData.genres.map(g => g.name),
        ano: animeData.year,
        status: animeData.status,
        trailer: animeData.trailer?.url
      }
      

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
      const trailer = document.querySelector('.trailera')
      if (animeData.trailer && animeData.trailer.url) {
          trailer.href = animeData.trailer.url
      } else {
          trailer.href = "#"
          trailerBtn.style.display = "none"
      }

      // Sinopse
      const sinopse = document.querySelector('.description')
      sinopse.innerText = animeData.synopsis || "Sinopse não disponível."

      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []




  } catch (error) {
      console.error("Erro ao carregar o anime:", error)
  }
})

let animeitems = document.querySelector('.anime-items')

favbtn.addEventListener('click', () => {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
  favoritos.push(anime)
  localStorage.setItem('favoritos', JSON.stringify(favoritos))
})

function exibirfav() {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

  favoritos.forEach(item => {
      
      const img = document.createElement('img')
      const p = document.createElement('p')

      img.src = item.src
      p.innerText = item.nome

      animeitems.appendChild(img)

      img.addEventListener('click', () => {
        main.classList.add('inative')
        animePage.classList.remove('inative')

        // Atualiza os dados da página com as informações completas
        animeTitle.textContent = item.nome
        animePoster.src = item.src

        // Gêneros (supondo que você tem 3 elementos .g1, .g2, .g3)
        const genreElements = [genre1, genre2, genre3]
        for (let i = 0; i < genreElements.length; i++) {
          if (item.genero && i < item.genero.length) {
            genreElements[i].textContent = item.genero[i]
            genreElements[i].style.display = "inline"
          } else {
            genreElements[i].style.display = "none"
          }
        }

        // Ano e status
        if (!item.ano) {
          year.style.display = "none"
        } else {
          year.textContent = item.ano
          year.style.display = "inline"
        }
        season.textContent = item.status || ""

        // Trailer
        if (item.trailer) {
          trailer.href = item.trailer
          trailerBtn.style.display = "inline"
        } else {
          trailer.href = "#"
          trailerBtn.style.display = "none"
        }

        // Sinopse
        sinopse.innerText = item.sinopse || "Sinopse não disponível."
      })
  })
}

exibirfav()



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

      animecont.innerHTML = ""


      for(let i = 0; i < animeDados.length; i++) {

        animecont.classList.remove('inactive')

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

        animeitem.addEventListener('click', () => {
          searchPage.classList.add('inative')
          animePage.classList.remove('inative')
        
          animeTitle.textContent = animeDados[i].title
          animePoster.src = animeDados[i].images.webp.image_url
          sinopse.innerText = animeDados[i].synopsis || "Sinopse não disponível."
        
          // Gêneros
          for (let j = 0; j < genreElements.length; j++) {
            if (j < animeDados[i].genres.length) {
              genreElements[j].textContent = animeDados[i].genres[j].name
              genreElements[j].style.display = "inline"
            } else {
              genreElements[j].style.display = "none"
            }
          }
        
          // Ano e status
          if (animeDados[i].year === null) {
            year.style.display = "none"
          } else {
            year.textContent = animeDados[i].year
            year.style.display = "inline"
          }
        
          season.textContent = animeDados[i].status
        
          // Trailer
          if (animeDados[i].trailer && animeDados[i].trailer.url) {
            trailer.href = animeDados[i].trailer.url
            trailerBtn.style.display = "inline"
          } else {
            trailer.href = "#"
            trailerBtn.style.display = "none"
          }
        
        })
        

      }




    } catch(error) {
      console.log(error)
    }


  } 
   
  })

