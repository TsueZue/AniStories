const main = document.querySelector('main')
const animePage = document.querySelector('.animePage')

const manga = document.querySelector('.manga')
const arrowbackBtn = document.querySelector('.arrowBack')

manga.addEventListener('click', async function () {
    main.classList.add('inative')
    animePage.classList.remove('inative')

    // Chamada da API DENTRO do clique
    try {
        const randomPage = Math.floor(Math.random() * 10) + 1
        const response = await fetch(`https://api.jikan.moe/v4/top/manga?page=${randomPage}`)
        const json = await response.json()
        const mangaData = json.data

        // Preencher título e poster
        const mangaTitle = document.querySelector('.title')
        const mangaPoster = document.querySelector('.animePoster')
        mangaTitle.textContent = mangaData.title
        mangaPoster.src = mangaData.images.webp.image_url

        // Preencher gêneros
        const genre1 = document.querySelector('.g1');
        const genre2 = document.querySelector('.g2');
        const genre3 = document.querySelector('.g3');
        const genreElements = [genre1, genre2, genre3];

        for (let i = 0; i < genreElements.length; i++) {
            if (i < mangaData.genres.length) {
                genreElements[i].textContent = mangaData.genres[i].name;
                genreElements[i].style.display = "inline";
            } else {
                genreElements[i].style.display = "none";
            }
        }

        // Ano e status
        const year = document.querySelector('.year')
        const season = document.querySelector('.seasons')
        if (mangaData.year === null) {
            year.style.display = "none"
        } else {
            year.textContent = mangaData.year
            year.style.display = "inline"
        }

        season.textContent = mangaData.status

        // Trailer
        const trailerBtn = document.querySelector('.trailerbtn')
        const trailer = document.querySelector('.trailer')
        if (mangaData.trailer && mangaData.trailer.url) {
            trailer.href = mangaData.trailer.url
            trailerBtn.style.display = "inline"
        } else {
            trailer.href = "#"
            trailerBtn.style.display = "none"
        }

        // Sinopse
        const sinopse = document.querySelector('.description')
        sinopse.innerText = mangaData.synopsis || "Sinopse não disponível."

    } catch (error) {
        console.error("Erro ao carregar o mangá:", error)
    }
})

arrowbackBtn.addEventListener('click', () => {
    main.classList.remove('inative')
    animePage.classList.add('inative')
})
