let textoEntrada = document.getElementById('textoEntrada');
let textoSaida = document.getElementById('textoSaida');
let mensagemNaoEncontrada = document.getElementById('mensagemNaoEncontrada');
let copiarBotao = document.getElementById('copiar');

let pairs = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

copiarBotao.style.display = 'none';
textoSaida.style.display = 'none';

function validar(str) {
    let letraUnicode = str.charCodeAt(0);

    if (letraUnicode >= 97 && letraUnicode <= 122) {
        return true;
    }
    else {
        return false;
    };
};

function verificarCripto(textoCriptografado, posicao, key, i) {
    let letra = textoCriptografado[posicao];

    if (letra == key[i]) {
        if (i == key.length-1)
        {
            return true;
        }
        else if (i < key.length - 1 && posicao + 1 < textoCriptografado.length) {
            return verificarCripto(textoCriptografado, posicao+=1, key, i+=1);
        };
    };
    return false;
};

function criptografar() {
    let textoDescriptografado = textoEntrada.value;
    let textoCriptografado = '';
    let strLength = textoDescriptografado.length;
    textoSaida.innerHTML = '';

    if (strLength == 0) {
        mensagemNaoEncontrada.style.display = 'inherit';
        copiarBotao.style.display = 'none';
        textoSaida.style.display = 'none';
        return;
    };

    for (let i = 0; i < strLength; i++) {
        let letra = textoDescriptografado[i];
        
        if (letra != ' ' && !validar(letra)) {
            mensagemNaoEncontrada.style.display = 'inherit';
            alert('Texto inválido!\nUse apenas letras minúsculas e sem acento.\nNão utilize caracteres especiais.');
            copiarBotao.style.display = 'none';
            textoSaida.style.display = 'none';
            return;
        };
      
        if (letra in pairs) {
            textoCriptografado += pairs[letra];
        }
        else {
            textoCriptografado += letra;
        };
    };

    textoSaida.style.display = 'initial';
    textoSaida.innerHTML = textoCriptografado;
    mensagemNaoEncontrada.style.display = 'none';
    copiarBotao.style.display = 'initial';
};

function descriptografar() {
    let textoCriptografado = textoEntrada.value;
    let textoDescriptografado = '';
    let strLength = textoCriptografado.length;
    textoSaida.innerHTML = '';

    if (strLength == 0) {
        mensagemNaoEncontrada.style.display = 'inherit';
        copiarBotao.style.display = 'none';
        textoSaida.style.display = 'none';
        return;
    };

    for (let i = 0; i < strLength; i++) {
        let letra = textoCriptografado[i];
        let keyNotFound = true;
        
        if (letra != ' ' && !validar(letra)) {
            mensagemNaoEncontrada.style.display = 'inherit';
            alert('Texto inválido!\nUse apenas letras minúsculas e sem acento.\nNão utilize caracteres especiais.');
            copiarBotao.style.display = 'none';
            textoSaida.style.display = 'none';
            return;
        };

        for (let key in pairs) {
            
            if (letra == pairs[key][0]) {
                
                if (pairs[key].length > 1) {
                    
                    if (verificarCripto(textoCriptografado, i+1, pairs[key], 1)) {

                        textoDescriptografado += key;
                        i += pairs[key].length - 1;
                        keyNotFound = false;
                        
                        break;
                    };
                }
                else {
                    textoDescriptografado += key;
                    i += pairs[key].length - 1;
                    keyNotFound = false;
                    break;
                };
            };
        };

        if (keyNotFound) {
            textoDescriptografado += letra;
        };
    };

    textoSaida.style.display = 'initial';
    textoSaida.innerHTML = textoDescriptografado;
    mensagemNaoEncontrada.style.display = 'none';
    copiarBotao.style.display = 'initial';
};

function copiar() {
    let texto = textoSaida.innerHTML;
    navigator.clipboard.writeText(texto);
};