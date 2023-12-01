const express = require('express'),
      settings = require('./settings.json'),
      { Liquid } = require('liquidjs');

  var app = express()

  app.use(express.json({ limit: '2MB'}))
  app.use(express.urlencoded())

  const engine = new Liquid({
      root: './views/',
      extname: '.liquid',
      globals: {
        settings: settings,
      }
  });

  app.get("/engineRender", (req, res, next) => {
    engine.renderFile('index.liquid')
      .then((result) => {
        res.send(result)
      });
  })

  app.get("/resRender", (req, res, next) => {
    res.render('index.liquid');
  })

  // register liquid engine
  app.engine('liquid', engine.express());
  app.set('view engine', 'liquid');       // set liquid to default

  app.listen(3000, () => console.log('app listening on port 3000!'))