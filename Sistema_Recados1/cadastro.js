const atualizarLocalStorage = (usuario) => {
    localStorage.setItem("bd_cadastro", JSON.stringify(usuario))
    
}

const recuperarLocalStorage = () => JSON.parse(localStorage.getItem("bd_cadastro") || "[]");   
        
        
function cadastrar(){  
    
    const email_cadastro = document.getElementById('email').value;
    const senha_cadastro = document.getElementById('senha').value;
    const confirma_senha_cadastro = document.getElementById('confirma_senha').value

    const usuarios = recuperarLocalStorage();   


    for(const usuario of usuarios){
        if(email_cadastro == usuario.email){
            alert("E-mail já cadastrado");
            return
        }
    }

    if(senha_cadastro != confirma_senha_cadastro){
        alert("Você digitou senhas diferentes!");
        return
    }

    usuarios.push({
        email: email_cadastro,
        senha: senha_cadastro,
        recados: []
    })
        
    if(email_cadastro && senha_cadastro && confirma_senha_cadastro){
       
        atualizarLocalStorage(usuarios)
        alert('Cadastrado com sucesso!')
        location.replace('login.html')
       
           
    }else{
        alert('Preencha todos os campos')
        
    }
    
    
    
    



}


