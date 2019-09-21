const times = require('./times')
const axios = require('axios')

const rodada_atual = 18
const base_url = 'https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab3a45b1/fase/fase-unica-seriea-2019/rodada/'

const consultarRodada = async (rodada) => {
    let url = `${base_url+rodada}/jogos/`
    return await axios.get(url)
        .then(res => res.data) 
}

    consultarRodada(1).then(res => {
            let mandante = {
                id: res[0].equipes.mandante.id,
                gols: res[0].placar_oficial_mandante
            }
        
            let visitante = {
                id: res[0].equipes.visitante.id,
                gols: res[0].placar_oficial_visitante
            }
        
            if(mandante.gols == visitante.gols) {
                times[indexMandante].pontos += 1
                times[indexMandante].empates.casa += 1
                times[indexVisitante].pontos += 1
                times[indexVisitante].empates.visitante += 1
            } else {
                indexMandante = encontrarTime(mandante.id)
                indexVisitante = encontrarTime(visitante.id)
                if(mandante.gols > visitante.gols) {
                    times[indexMandante].pontos += 3
                    times[indexMandante].vitorias.casa += 1
                    times[indexVisitante].derrotas.visitante += 1
                } else {
                    times[indexVisitante].pontos += 3
                    times[indexVisitante].vitorias.visitante += 1
                    times[indexMandante].derrotas.mandante += 1
                }
                
            }
            mostrarTabela()  
    })

const mostrarTabela = async () => {
    for(let t of times) {
        console.log(`${t.nome} tem ${t.pontos} pontos.`)
    }
}

function encontrarTime(id){
    for (let i = 0; i < times.length; i++) {
        if(times[i].id == id ) {
            return i
        }
    }
}
