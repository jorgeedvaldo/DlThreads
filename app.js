const express = require('express');
const puppeteer = require('puppeteer');


//Configure express
const app = express();
app.get('/', (req, res) => {

    let FinalUrl = '';
    //Configure Puppeteer
    (async () => {
      // Inicializar o Chromium
      const browser = await puppeteer.launch();
    
      // Abrir uma nova página
      const page = await browser.newPage();
    
      // Navegar para o website desconhecido
      const websiteUrl = 'https://www.threads.net/t/' + req.query.postid;
      await page.goto(websiteUrl);
      
      try {
        await page.waitForSelector('.x1xmf6yo img');
      } catch (error) {
        console.error(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
      }
      
    
      const imgElements = await page.$$('img');
      if (imgElements.length >= 1) {
        const secondImgSrc = await page.evaluate((img) => img.src, imgElements[3]);
        console.log('Src do segundo elemento <img>: ', secondImgSrc);
        FinalUrl = secondImgSrc;
        //res.send(secondImgSrc + ' Hello, World! ' + req.query.postid);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          url: FinalUrl,
          status: true
        }));
      } else {
        console.log('Não há segundo elemento <img> na página.');
      }
      
    
      // Fechar o Chromium
      await browser.close();
    })();


    //LOCAL DO RETORNO DO JSON
    //res.send(secondImgSrc + ' Hello, World! ' + req.query.postid);
    //res.setHeader('Content-Type', 'application/json');
    //res.end(JSON.stringify({ url: FinalUrl }));
  });

//starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
