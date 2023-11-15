
const containerVideos = document.querySelector('.videos__container')




// fetch() busca em uma API informações e retorna uma objeto Promise - função assíncrona.

// Promessa de quando os dados vierem, algo será feito com base neles

// keyword async serve para escrever codigo assíncrono de forma mais síncrona. Nesse caso o async determina que essa função se irá funcionar se o await for resolvido
async function buscarMontarVideos() {

    // Tratamento de erros
    try{

        // Await the permite que a função fique pausada até o codigo onde ele está atrelado se resolva -- AGUARDAR
        const busca = await fetch('http://localhost:3000/videos');
        const videos = await busca.json();
    
        // Quando a promise retorna "fulfilled" será necessário fazer algo com o operador .then 'Então...'
       
        videos.forEach((video) => {
    
            if (video.categoria == "") {

                throw new Error('Vídeo não tem categoria')

            }

            containerVideos.innerHTML += `
            <li class="videos__item">
                    <iframe src="${video.url}" title"=${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `
        })

    } catch(error) {

        containerVideos.innerHTML = `<p>Houver um erro ao carregar os vídeos: ${error}</p>`

    }

}

buscarMontarVideos()


const barraPesquisa = document.querySelector('.pesquisar__input')

barraPesquisa.addEventListener('input', filtrarPesquisa())


function filtrarPesquisa() {

    const videos = document.querySelectorAll('.videos__item')

    const valorFiltro = barraPesquisa.value.toLowerCase()

    if (barraPesquisa.value === "") {
        
        videos.forEach(video => video.style.display = 'block');

        return 
        

    }

    videos.forEach((video) => {

        const titulo = video.querySelector('.titulo-video')

        if (!titulo.includes(valorFiltro)) {
            
            video.computedStyleMap.display = 'none'

        } else {

            video.style.display = 'block'

        }

    })

    // for (let video of videos) {
            
    //     let titulo = video.querySelector('.titulo-video').textContent.toLowerCase()

    //     let valorFiltro = barraPesquisa.value.toLowerCase()

    //     if (!titulo.includes(valorFiltro)) {
            
    //         video.computedStyleMap.display = 'none'

    //     } else {

    //         video.style.display = 'block'

    //     }

    // }


}

const btnCategoria = document.querySelectorAll('.superior__item')

btnCategoria.forEach((botao) => {

    let nomeCategoria = botao.getAttribute('name')

    botao.addEventListener('click', filtrarCategoria(nomeCategoria))

})

function filtrarCategoria(filtro) {

    const videos = document.querySelectorAll('.videos__item')

    videos.forEach((video) => {

        const categoria = document.querySelector('.categoria').textContent.toLowerCase()

        let valorFiltro = filtro.toLowerCase()

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            
            video.style.display = 'none'
            
        } else {
            
            video.style.display = 'block'

        }
        
    })


}