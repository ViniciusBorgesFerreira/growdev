const recuperarLocalStorage = () => JSON.parse(localStorage.getItem("bd_cadastro") || "[]"); 
const botaoSubmit = document.getElementById('btn-signIn')
const botaoCreate = document.getElementById('btn-createAccount')

const formularioLogin= document.getElementById('form_login')
formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    let login = document.getElementById('email_login').value;
    let senha = document.getElementById('senha_login').value; 
    let usuarios = recuperarLocalStorage(); 
    const foundLogin = usuarios.find((dado) => {
        return dado.email === login
    })

    if(foundLogin){
        if(foundLogin.senha == senha){             
            
            localStorage.setItem('usuarioLogado', JSON.stringify(foundLogin))
                       
            location.replace("./recados.html") 
        }else{
            const alerta = document.getElementById('div_alert')
            alerta.setAttribute('style','display:inline-block')
            return

        }
    }else{
        const alerta = document.getElementById('div_alert')
        alerta.setAttribute('style','display:inline-block')
        return
    }
   
})

botaoCreate.addEventListener('click', ()=>{
    location.replace("./cadastro.html")
})