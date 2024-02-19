    /* Array's */

    let musicas = [
        {titulo:'Get Up', artista:'PlanetShakers', album:'One', src:'tracks/1.mp3', img:'imagem/capa.jpg'},
        {titulo:'No Compromise', artista:'PlanetShakers', album:'One', src:'tracks/2.mp3', img:'imagem/capa.jpg'},
        {titulo:'Rejoice In you', artista:'PlanetShakers', album:'One', src:'tracks/3.mp3', img:'imagem/capa.jpg'}
    ];

    /* Variáveis */
    let indexMusica = 0;
    const botaoPlayPause = document.getElementById('play-pause');
    const botaoNext = document.getElementById('next');
    const botaoBack = document.getElementById('back');
    const nomeFaixa = document.getElementById('track_name');
    const nomeArtista = document.getElementById('album');
    const audio = document.getElementById('audio_track');

    let duracaoAudio = document.querySelector('.fim');
    let imagem = document.querySelector('img');
    let nomeMusica = document.querySelector('#informacao_track h2');

    const numeroFaixas = 3;
    let reproduzindo = false;
    let faixaAtual = 1;

    renderizarMusica(indexMusica);

    /* Eventos */

    botaoPlayPause.addEventListener('click', reproduzirOuPausar);
    botaoNext.addEventListener('click', proximaFaixa);
    botaoBack.addEventListener('click', voltarFaixa);
    audio.addEventListener('ended',proximaFaixa);
    audio.addEventListener('timeupdate', atualizarBarra);
    duracaoAudio.textContent = segundosParaMinutos(Math.floor(audio.duration));
    document.querySelector('#back').addEventListener('click', () =>{
        renderizarMusica();
    });

    document.querySelector('#next').addEventListener('click', () =>{
        renderizarMusica();
    });

    document.querySelector('#back').addEventListener('click', () => {
        indexMusica--;
        if (indexMusica < 0) {
            indexMusica = 2;
        }
        renderizarMusica(indexMusica);
        tocarFaixa();
    });

    document.querySelector('#next').addEventListener('click', () => {
        indexMusica++;
        if (indexMusica > 2){
            indexMusica = 0;
        }
        renderizarMusica(indexMusica);
        tocarFaixa();
    });

    /* Funções */

    function renderizarMusica(index){
        audio.setAttribute('src', musicas[index].src);
        audio.addEventListener('loadeddata', () => {
            nomeFaixa.textContent = musicas[index].titulo;
            nomeArtista.textContent = musicas[index].artista + ' - ' + musicas[index].album;
            duracaoAudio.textContent = segundosParaMinutos(Math.floor(audio.duration));
        });
    }

    function tocarFaixa(){
        audio.play();
        reproduzindo = true;
        botaoPlayPause.classList.remove('bi-play-fill');
        botaoPlayPause.classList.add('bi-pause-fill');
    }

    function pausarFaixa(){
        audio.pause();
        reproduzindo = false;
        botaoPlayPause.classList.add('bi-play-fill');
        botaoPlayPause.classList.remove('bi-pause-fill');
    }

    function reproduzirOuPausar(){
        if (reproduzindo === true){
            pausarFaixa();
        }else{
            tocarFaixa();
        }
    }

    function atualizarBarra(){
        let barra = document.querySelector('progress');
        barra.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + '%';
        let tempoDecorrido = document.querySelector('.inicio');
        tempoDecorrido.textContent = segundosParaMinutos(Math.floor(audio.currentTime));
    }

    function segundosParaMinutos(segundos){
        let campoMinutos = Math.floor(segundos / 60);
        let campoSegundos = segundos % 60;
        if(campoSegundos < 10){
            campoSegundos = '0' + campoSegundos;
        }

        return campoMinutos + ":" + campoSegundos;
    }

  

    function proximaFaixa(){
        if(faixaAtual === numeroFaixas){
            faixaAtual = 1;
        } else{
            faixaAtual = faixaAtual + 1
        }

        audio.src = './tracks/' + faixaAtual + '.mp3';
        tocarFaixa();
        reproduzindo = 1;
        trocarnomeFaixa();
    }

    function voltarFaixa(){
        if(faixaAtual === 1){
            faixaAtual = numeroFaixas;
        } else{
            faixaAtual = faixaAtual - 1
        }

        audio.src = './tracks/' + faixaAtual + '.mp3';
        tocarFaixa();
        reproduzindo = 1;
        trocarnomeFaixa();
    }





