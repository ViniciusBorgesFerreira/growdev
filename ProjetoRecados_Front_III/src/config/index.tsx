import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-family: 'Roboto', sans-serif;
    }

    body {
        width: 100vw;
        height: 100vh;
        background-color:#FFF;
        color: #ccc;
    }

    h1 {
        margin-bottom: 0.5em;
        font-size: 40px;
        color:#7e37ef;
    }

`


export { GlobalStyle }