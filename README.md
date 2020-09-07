# sefazGetter
Obtenha as informações do site da Sefaz (Cupom Fiscal MG)


importe a biblioteca <br>
<code>let sefaz = require('./sefazGetter.js');</code>
<br>
forneça a chave do cupom fiscal, normalmente é o valor que segue após o endereço abaixo

<b>https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml?p=(A chave fica nesse pedaço da URL)</b>.<br>
A chave pode ser facilmente obtida dos cupons físicos, basta ler o QRCode que hoje é obrigatório no cupom fiscal.<br>

De posse da chave, basta chamar a biblioteca.<br>

<code>
let chave = "sua chave aqui";
sefaz.obterInformacao(chave).then(resposta=>{console.log("Resposta no formato JSON",resposta);});
</code>


A resposta consite em um JSON com os dados da empresa e a lista de itens comprados no cupom fiscal, com descrição, código, quantidade e preço.

