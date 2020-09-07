let sefaz = require('./sefazGetter.js');
const val = "31200904641376009192650670000393111962826270|2|1|1|CB62BD1CE50B0386A86492DF2B2CDDCA645C89B5";

sefaz.obterInformacao(val).then(res=>{
    console.log("Resposta",res);
});

