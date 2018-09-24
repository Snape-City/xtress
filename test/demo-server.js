const express = require('express');
const app = express();
app.extress = require('../extress');
const dummyController1 = require('./controllers/dummyController1');
const dummyController2 = require('./controllers/dummyController2');
const dummyController3 = require('./controllers/dummyController3');
const dummyController4 = require('./controllers/dummyController4');
const PORT = 3333;

app.use(app.extress.routeTimer)


app.get('/', dummyController1.mw1, dummyController1.mw2, dummyController1.mw3, dummyController1.mwLast);
app.post('/', dummyController1.mw1, dummyController1.mw2, dummyController1.mw3, dummyController1.mwLast);
app.put('/', dummyController1.mw1, dummyController1.mw2, dummyController1.mw3, dummyController1.mwLast);
app.delete('/', dummyController1.mw1, dummyController1.mw2, dummyController1.mw3, dummyController1.mwLast);

app.get('/demo', dummyController2.mw1, dummyController2.mw2, dummyController2.mw3, dummyController2.mwLast);
app.post('/demo', dummyController2.mw1, dummyController2.mw2, dummyController2.mw3, dummyController2.mwLast);
app.put('/demo', dummyController2.mw1, dummyController2.mw2, dummyController2.mw3, dummyController2.mwLast);
app.delete('/demo', dummyController2.mw1, dummyController2.mw2, dummyController2.mw3, dummyController2.mwLast);

app.get('/demo/example/2', dummyController3.mw1, dummyController3.mw2, dummyController3.mw3, dummyController3.mw4, dummyController3.mw5, dummyController3.mwLast);
app.post('/demo/example/2', dummyController3.mw1, dummyController3.mw2, dummyController3.mw3, dummyController3.mw4, dummyController3.mw5, dummyController3.mwLast);
app.put('/demo/example/2', dummyController3.mw1, dummyController3.mw2, dummyController3.mw3, dummyController3.mw4, dummyController3.mw5, dummyController3.mwLast);
app.delete('/demo/example/2', dummyController3.mw1, dummyController3.mw2, dummyController3.mw3, dummyController3.mw4, dummyController3.mw5, dummyController3.mwLast);

app.get('/demo/example/randomMiddleware',  dummyController1.mw1, dummyController2.mw1, dummyController3.mw1, dummyController4.mw1, dummyController1.mw2, dummyController2.mw2, dummyController3.mw2, dummyController4.mw2, dummyController3.mwLast);
app.post('/demo/example/randomMiddleware', dummyController4.mw8, dummyController4.mw7, dummyController4.mw9, dummyController3.mw4, dummyController3.mw5, dummyController1.mwLast);
app.put('/demo/example/randomMiddleware', dummyController3.mw1, dummyController3.mw2, dummyController3.mw3, dummyController3.mw4, dummyController3.mw5, dummyController2.mwLast);
app.delete('/demo/example/randomMiddleware', dummyController3.mw4, dummyController2.mw2, dummyController1.mw1, dummyController4.mw1, dummyController3.mw5, dummyController4.mwLast);

app.get('/test', dummyController1.mw1, dummyController2.mw2, dummyController3.mw3, dummyController1.mw3, dummyController4.mw4, dummyController1.mwLast);
app.post('/test', dummyController1.mw1, dummyController2.mw2, dummyController3.mw3, dummyController2.mw3, dummyController4.mw4, dummyController4.mw5, dummyController2.mwLast);
app.put('/test', dummyController1.mw1, dummyController2.mw2, dummyController3.mw3, dummyController3.mw3, dummyController4.mw4, dummyController4.mw5, dummyController4.mw6, dummyController3.mwLast);
app.delete('/test', dummyController1.mw1, dummyController2.mw2, dummyController3.mw3, dummyController4.mw3, dummyController4.mw4, dummyController4.mw5, dummyController4.mw6, dummyController4.mw7, dummyController4.mwLast);

app.get('/test/example', dummyController1.mw1, dummyController4.mwLast);
app.post('/test/example', dummyController2.mw1, dummyController3.mwLast);
app.put('/test/example', dummyController3.mw1, dummyController2.mwLast);
app.delete('/test/example', dummyController4.mw1, dummyController1.mwLast);

app.get('/test/example/randomMiddleware',  dummyController1.mw1, dummyController2.mw1, dummyController3.mw1, dummyController4.mw1, dummyController1.mw2, dummyController2.mw2, dummyController3.mw2, dummyController4.mw2, dummyController3.mwLast);
app.post('/test/example/randomMiddleware', dummyController4.mw8, dummyController4.mw7, dummyController4.mw9, dummyController3.mw4, dummyController3.mw5, dummyController1.mwLast);
app.put('/test/example/randomMiddleware', dummyController3.mw1, dummyController3.mw2, dummyController3.mw3, dummyController3.mw4, dummyController3.mw5, dummyController2.mwLast);
app.delete('/test/example/randomMiddleware', dummyController3.mw4, dummyController2.mw2, dummyController1.mw1, dummyController4.mw1, dummyController3.mw5, dummyController4.mwLast);

app.get('/users', dummyController1.mw1, dummyController2.mw2, dummyController1.mw2, dummyController1.mwLast);
app.post('/users', dummyController1.mw1, dummyController2.mw2, dummyController1.mw3, dummyController1.mwLast);
app.put('/users', dummyController1.mw1, dummyController2.mw2, dummyController4.mw4, dummyController1.mwLast);
app.delete('/users', dummyController1.mw1, dummyController2.mw2, dummyController1.mw2, dummyController4.mwLast);

app.get('/api', dummyController4.mw1, dummyController1.mw2, dummyController4.mw3, dummyController1.mwLast);
app.post('/api', dummyController1.mw1, dummyController1.mw2, dummyController1.mw3, dummyController1.mwLast);
app.put('/api', dummyController4.mw5, dummyController1.mw2, dummyController4.mw7, dummyController1.mwLast);
app.delete('/api', dummyController1.mw1, dummyController4.mw5, dummyController4.mw3, dummyController1.mwLast);

app.get('/heavily/nexted/trash/routes', dummyController1.mw1, dummyController1.mwLast);
app.post('/heavily/nexted/trash/routes', dummyController2.mw1, dummyController1.mwLast);
app.put('/heavily/nexted/trash/routes', dummyController3.mw1, dummyController1.mwLast);
app.delete('/heavily/nexted/trash/routes', dummyController4.mw1, dummyController1.mwLast);

app.listen(PORT,
  app.extress.map(app), 
  console.log(`Listening on ${PORT}`)
)