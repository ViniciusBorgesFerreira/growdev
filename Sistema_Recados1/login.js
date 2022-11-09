const recuperarLocalStorage = () => JSON.parse(localStorage.getItem("bd_cadastro") || "[]"); 

function logar(){
    
    let login = document.getElementById('email_login').value;
    let senha = document.getElementById('senha_login').value; 
    let usuarios = recuperarLocalStorage(); 
    const foundLogin = usuarios.find((dado) => {
        return dado.email === login
    })

    if(foundLogin){
        if(foundLogin.senha == senha){             
                       
            localStorage.setItem('usuarioLogado', JSON.stringify(foundLogin))
            alert('Logado com sucesso')            
            location.replace("./recados.html") 
        }else{
            alert('Senha incorreta')
            return
        }
    }else{
        alert('Usuário não cadastrado')
        return
    }
    

}


