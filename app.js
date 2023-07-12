const express = require('express');
const puppeteer = require('puppeteer');

let FinalUrl = '';
//Configure Puppeteer
(async () => {
  // Inicializar o Chromium
  const browser = await puppeteer.launch();

  // Abrir uma nova página
  const page = await browser.newPage();

  // Navegar para o website desconhecido
  const websiteUrl = 'https://www.threads.net/t/Cug7zq2AfVB/';
  await page.goto(websiteUrl);
  await page.waitForSelector('.x1xmf6yo img');

  const imgElements = await page.$$('img');
  if (imgElements.length >= 1) {
    const secondImgSrc = await page.evaluate((img) => img.src, imgElements[3]);
    console.log('Src do segundo elemento <img>: ', secondImgSrc);
    FinalUrl = secondImgSrc;
  } else {
    console.log('Não há segundo elemento <img> na página.');
  }
  

  // Fechar o Chromium
  await browser.close();
})();


//Configure express
const app = express();
app.get('/', (req, res) => {
    //res.send(secondImgSrc + ' Hello, World! ' + req.query.postid);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ url: FinalUrl }));
  });

//starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });