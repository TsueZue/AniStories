const randomBtn = document.querySelector('.random')
const main = document.querySelector('main')
const animePage = document.querySelector('.animePage')

randomBtn.addEventListener('click', function() {

    main.classList.add('inative')
    animePage.classList.remove('inative')
    
})