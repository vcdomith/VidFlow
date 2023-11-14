
const containerVideos = document.querySelector('.videos__container')




// fetch() busca em uma API informações e retorna uma objeto Promise - função assíncrona.

// Promessa de quando os dados vierem, algo será feito com base neles


const api = fetch('http://localhost:3000/videos')

// Quando a promise retorna "fulfilled" será necessário fazer algo com o operador .then 'Então...'

    .then(res => res.json())

    .then((videos) => 
        videos.forEach((video) => {

            containerVideos.innerHTML += `
            <li class="videos__item">
                    <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    </div>
                </li>
            `

        })


    )

    // Tratamento de erros
    .catch((error) => {

        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`

    })