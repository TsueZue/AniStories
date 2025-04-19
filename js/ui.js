const randomBtn = document.querySelector('.random')
const main = document.querySelector('main')
const animePage = document.querySelector('.animePage')

const arrowbackBtn = document.querySelector('.arrowBack')

randomBtn.addEventListener('click', function() {

    main.classList.add('inative')
    animePage.classList.remove('inative')
    
})

arrowbackBtn.addEventListener('click', () => {
    main.classList.toggle('inative')
    animePage.classList.toggle('inative')
})