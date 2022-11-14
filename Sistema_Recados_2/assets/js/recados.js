const usuarioLogadoOn = JSON.parse(localStorage.getItem("usuarioLogado")|| "[]")
const recados = usuarioLogadoOn.recados;
const inputDescricao = document.getElementById('descricao')
const inputDetalhamento = document.getElementById('detalhamento')
const botaoSalvar = document.getElementById('botaoSalvar')
const botaoLogout = document.getElementById('botaoLogout')


const formularioRecados = document.getElementById('form_recados')
formularioRecados.addEventListener('submit', (e) =>{
    e.preventDefault()

   
    salvarRecados()     
        
})

function salvarRecados(){
   
        const recadoHTML = {
            id: Math.floor((Math.random()*1004.75)+ 7),
            descricao: inputDescricao.value,
            detalhamento: inputDetalhamento.value
        }
    
        usuarioLogadoOn.recados.push(recadoHTML)
    
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogadoOn))
        montarTabela(usuarioLogadoOn.recados)
    
        formularioRecados.reset()
        
    
}
    
    document.addEventListener('DOMContentLoaded', () => {
    
        montarTabela(recados)
    
    })
   
    


function montarTabela(recados){
    tbody.innerHTML = "";

    

    recados.forEach((recado, indice) => {
        montarNovaLinha(recado, indice, tbody)
    })

}

function montarNovaLinha(recado, indice, tbody){

    const tr = document.createElement('tr');
    tr.setAttribute('id', `recado-${indice}`);

    const tdIndice = document.createElement('td');
    tdIndice.innerHTML = indice + 1;

    const tdDescricao = document.createElement('td');
    tdDescricao.innerHTML = recado.descricao;

    const tdDetalhamento = document.createElement('td');
    tdDetalhamento.innerHTML = recado.detalhamento;


    const tdAcoes = document.createElement('td')
    const botaoEditar = document.createElement('button');
    botaoEditar.innerHTML = 'Editar'
    botaoEditar.setAttribute('class', 'btn btn-success mt-0 me-1 pt-0 pb-0')

    botaoEditar.addEventListener('click', () => {
        editarRecado(recado, indice)
    })

    const botaoApagar = document.createElement('button');
    const confirmaDel = document.getElementById('confirmaDel')
    botaoApagar.innerHTML = 'Apagar'
    botaoApagar.setAttribute('class', 'btn btn-danger mt-0 me-1 pt-0 pb-0')
    botaoApagar.setAttribute('data-bs-toggle','modal')
    botaoApagar.setAttribute('data-bs-target','#modalApagar')
    
    confirmaDel.addEventListener('click',() => {
        
        apagarRecado(indice)
    })

    

    tdAcoes.appendChild(botaoEditar)
    tdAcoes.appendChild(botaoApagar)
    tr.appendChild(tdIndice)
    tr.appendChild(tdDescricao)
    tr.appendChild(tdDetalhamento)
    tr.appendChild(tdAcoes)
    tbody.appendChild(tr) 
    
}

function editarRecado(recado, indice){    
    inputDescricao.value = recado.descricao
    inputDetalhamento.value = recado.detalhamento
    botaoAtualizar.setAttribute('style','display: inline-block')
    botaoSalvar.setAttribute('style', 'display:none')
    botaoCancelar.setAttribute('style', 'display: inline-block')

    botaoAtualizar.addEventListener('click', () => {
        
        const recadoAtualizado = {
            descricao: inputDescricao.value,
            detalhamento: inputDetalhamento.value
        
        }
        botaoAtualizar.setAttribute('style', 'display: none')
        botaoCancelar.setAttribute('style', 'display: none')

        usuarioLogadoOn.recados[indice] = recadoAtualizado        
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogadoOn))
        montarTabela(usuarioLogadoOn.recados)

        formularioRecados.reset()

        botaoAtualizar.setAttribute('style', 'display: none')
        botaoCancelar.setAttribute('style', 'display: none')
        botaoSalvar.setAttribute('style', 'display: inline-block')

        window.location.replace()
        

       
       
        
    })


    botaoCancelar.addEventListener('click', () => {
        botaoAtualizar.setAttribute('style', 'display: none')
        botaoCancelar.setAttribute('style', 'display: none')
        botaoSalvar.setAttribute('style', 'display: inline-block')
        formularioRecados.reset()
    })

    
    
    
}

function apagarRecado(indice){
    const confirma = document.getElementById('modalApagar')
    /*confirm(`Tem certeza que deseja excluir o registro Nº ${indice+1}?`) */
   
    
        
    if(confirma){
        usuarioLogadoOn.recados.splice(indice, 1)
        
        const linha = document.getElementById(`recado-${indice}`)
        linha.remove()

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogadoOn))
        
        window.location.reload()
        

        
    }
}


function sair(){
    const usuarios = JSON.parse(localStorage.getItem('bd_cadastro'))

    let indice = usuarios.findIndex((user) => user.email === usuarioLogadoOn.email)

    usuarios[indice]= usuarioLogadoOn

    localStorage.setItem('bd_cadastro', JSON.stringify(usuarios))
    localStorage.removeItem("usuarioLogado")

    location.replace("./login.html") 
}

