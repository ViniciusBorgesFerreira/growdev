const atualizarLocalStorage = (usuario) => {
    localStorage.setItem("bd_cadastro", JSON.stringify(usuario))
    
}

const recuperarLocalStorage = () => JSON.parse(localStorage.getItem("bd_cadastro") || "[]");   
const formularioCad = document.getElementById('form_cadastro');
formularioCad.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const email_cadastro = document.getElementById('email').value;
    const senha_cadastro = document.getElementById('senha').value;
    const confirma_senha_cadastro = document.getElementById('confirma_senha').value;
    const alert1 = document.getElementById('user_alert1')
    const alert2 = document.getElementById('user_alert2')
    const alert3 = document.getElementById('user_alert3')
    const alert4 = document.getElementById('user_alert4')

    const usuarios = recuperarLocalStorage();


    for(const usuario of usuarios){
        if(email_cadastro == usuario.email){
            alert1.setAttribute('style','display:inline-block')
            return
        }
    }

    if(senha_cadastro != confirma_senha_cadastro){        
        alert2.setAttribute('style','display:inline-block')
            return
    }

    usuarios.push({
        email: email_cadastro,
        senha: senha_cadastro,
        recados: []
    })
   
        
    if(email_cadastro && senha_cadastro && confirma_senha_cadastro){
        
       

        atualizarLocalStorage(usuarios)
        alert3.setAttribute('style','display:inline-block')        
        location.replace('./login.html')
       
           
    }


})

