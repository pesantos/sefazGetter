# sefazGetter
Obtenha as informações do site da Sefaz (Cupom Fiscal MG)


//importe a biblioteca
let sefaz = require('./sefazGetter.js');

//forneça a chave do cupom fiscal, normalmente é o valor que segue após o endereço abaixo

//https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml?p=(A chave fica nesse pedaço da URL).
//A chave pode ser facilmente obtida dos cupons físicos, basta ler o QRCode que hoje é obrigatório no cupom fiscal.

//De posse da chave, basta chamar a biblioteca.

let chave = "sua chave aqui";
sefaz.obterInformacao(chave).then(resposta=>{
    console.log("Resposta no formato JSON",resposta);
});

A resposta consite em um JSON com os dados da empresa e a lista de itens comprados no cupom fiscal, com descrição, código, quantidade e preço.

