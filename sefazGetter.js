const puppeteer = require('puppeteer');
const SITE = "https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml?p=";

module.exports = {

    obterInformacao:async function (valor){
        resposta = {};
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(SITE+valor);
    
        let empresa = ".text-uppercase > h4:nth-child(1) > b:nth-child(1)";
        let cnpj = "table.table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)";
        let endereco = "table.table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(1)";
        let itens = "table.table:nth-child(5)";
        let dia = "table.table:nth-child(8) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(4)";
        let chave = "#collapseTwo > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)";
    
        resposta.empresa = await page.evaluate((sel) => {
            let element = document.querySelector(sel);
            return element? element.innerHTML: null;
          }, empresa);
    
        resposta.cnpj = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
        }, cnpj);
    
        resposta.endereco = await page.evaluate((sel) => {
            let element = document.querySelector(sel);
            return element? element.innerHTML: null;
        }, endereco);
    
        
    
        resposta.dia = await page.evaluate((sel) => {
            let element = document.querySelector(sel);
            return element? element.innerHTML: null;
        }, dia);
    
        resposta.chave = await page.evaluate((sel) => {
            let element = document.querySelector(sel);
            return element? element.innerHTML: null;
        }, chave);
    
        resposta.itens = await page.evaluate((sel) => {
            let element = document.querySelector(sel);
            return element? element.innerHTML: null;
        }, itens);
    
        
    
        
        await browser.close();
        return this.mastigarDados(resposta);
    },

    mastigarDados:async function (massa){
        let pedacos = massa.itens.split('<tr>');
        let osItens = [];
        for(let i = 0;i<pedacos.length;i++){
            if(i!=0){
                let micro = pedacos[i];
                micro = await this.replaceAll(micro,'\t');
                micro = await this.replaceAll(micro,'\n');
                // console.log("Palavra analisada",micro);
                osItens.push(
                    {
                        produto:await this.gDescricao(micro),
                        codigo:await this.gCodigo(micro),
                        quantidade:await this.gQuantidade(micro),
                        preco:await this.gValor(micro)
                    }
                );
            }
        }
        massa.itens = osItens;
        return massa;
    },

    replaceAll:async function(palavra,busca){
        let re = new RegExp(busca, 'g');
        return (palavra+'').replace(re, '');
    },
    
    replaceAllX:async function(palavra,busca,nova){
        let re = new RegExp(busca, 'g');
        return (palavra+'').replace(re, nova);
    },
    
    gDescricao:async function(palavra){
        let pe = palavra.split("h7>");
        pe = pe[1].replace(/<[^>]*>/g, '');
        return (pe.slice(0,-2)+'').trim();
    },
    
    gCodigo:async function(palavra){
        return ((palavra+'').substring(palavra.indexOf("Código:")+7,palavra.indexOf(")"))).trim();
    },
    
    gQuantidade:async function(palavra){
        return ((palavra+'').substring(palavra.indexOf("Qtde total de ítens:")+20,palavra.indexOf("</td><td>U"))).trim();
    },
    
    gValor:async function(palavra){
        let produto = (palavra+'').substring(palavra.indexOf("Valor total R$: R$")+18,palavra.indexOf("</td></tr>"));
        produto = await this.replaceAllX(produto,',','.');
        return produto.trim();
    }



}