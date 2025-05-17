const arrowbackBtn = document.querySelector('.arrowBack')

randomBtn.addEventListener('click', function() {

    main.classList.add('inative')
    animePage.classList.remove('inative')
    
})

arrowbackBtn.addEventListener('click', () => {
    main.classList.toggle('inative')
    animePage.classList.toggle('inative')
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('Service Worker registrado!'))
      .catch((error) => console.error('Erro ao registrar o SW:', error));
  }
  