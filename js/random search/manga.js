const main = document.querySelector('main')
const animePage = document.querySelector('.animePage')

const manga = document.querySelector('.manga')
const arrowbackBtn = document.querySelector('.arrowBack')



manga.addEventListener('click', async function () {
    main.classList.add('inative')
    animePage.classList.remove('inative')

    try {
        const randomPage = Math.floor(Math.random() * 10) + 1
        const response = await fetch(`https://api.jikan.moe/v4/top/manga?page=${randomPage}`)
        const json = await response.json()
        const mangaData = json.data

        const randomIndex = Math.floor(Math.random() * mangaData.length)
        const selectedManga = mangaData[randomIndex]

        // Preencher título e poster
        const mangaTitle = document.querySelector('.title')
        const mangaPoster = document.querySelector('.animePoster')
        mangaTitle.textContent = selectedManga.title
        mangaPoster.src = selectedManga.images.webp.image_url

        // Preencher gêneros
        const genre1 = document.querySelector('.g1');
        const genre2 = document.querySelector('.g2');
        const genre3 = document.querySelector('.g3');
        const genreElements = [genre1, genre2, genre3];

        for (let i = 0; i < genreElements.length; i++) {
            if (i < selectedManga.genres.length) {
                genreElements[i].textContent = selectedManga.genres[i].name;
                genreElements[i].style.display = "inline";
            } else {
                genreElements[i].style.display = "none";
            }
        }

        // Ano e status
        const year = document.querySelector('.year')
        const season = document.querySelector('.seasons')
        if (selectedManga.year === null) {
            year.style.display = "none"
        } else {
            year.textContent = selectedManga.year
            year.style.display = "inline"
        }

        season.textContent = selectedManga.status

        // Trailer (muito raro em mangás, mas incluído por compatibilidade)
        const trailerBtn = document.querySelector('.trailerbtn')
        const trailer = document.querySelector('.trailer')
        if (selectedManga.trailer && selectedManga.trailer.url) {
            trailer.href = selectedManga.trailer.url
            trailerBtn.style.display = "inline"
        } else {
            trailer.href = "#"
            trailerBtn.style.display = "none"
        }

        // Sinopse
        const sinopse = document.querySelector('.description')
        sinopse.innerText = selectedManga.synopsis || "Sinopse não disponível."

    } catch (error) {
        console.error("Erro ao carregar o mangá:", error)
    }
})


arrowbackBtn.addEventListener('click', () => {
    main.classList.remove('inative')
    animePage.classList.add('inative')
})
