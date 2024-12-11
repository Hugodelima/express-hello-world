const request = require('supertest');
const app = require('./app'); // Certifique-se de exportar corretamente o 'app' de 'app.js'

describe('/test endpoints', () => {

  it('should return HTML from /', async () => {
    const data = await request(app).get('/');
    expect(data.statusCode).toBe(200);
    expect(data.type).toBe('html');
    expect(data.text).toContain('Hello Express API');
  });

  it('should return "Yo!" from /req', async () => {
    const data = await request(app).get('/req');
    expect(data.statusCode).toBe(200);
    expect(data.text).toBe('Yo!');
  });

  it('should return a message with name from /meunome', async () => {
    const data = await request(app).get('/meunome');
    expect(data.statusCode).toBe(200);
    expect(data.text).toBe('Meu nome é Hugo Rodrigues de Lima');
  });

  it('should return "teco" from /tico', async () => {
    const data = await request(app).get('/tico');
    expect(data.statusCode).toBe(200);
    expect(data.text).toBe('teco');
  });

  it('should return a list of pokemons from /pokemons', async () => {
    const data = await request(app).get('/pokemons');
    expect(data.statusCode).toBe(200);
    const pokemons = JSON.parse(data.text);
    expect(pokemons).toBeInstanceOf(Array);
    expect(pokemons.length).toBeGreaterThan(0);
    expect(pokemons[0]).toHaveProperty('nome');
  });

  it('should return a list of series from /series', async () => {
    const data = await request(app).post('/series');
    expect(data.statusCode).toBe(200);
    const series = JSON.parse(data.text);
    expect(series).toBeInstanceOf(Array);
    expect(series.length).toBeGreaterThan(0);
    expect(series[0]).toHaveProperty('nome');
  });

  it('should return a 404 error from /notfound', async () => {
    const data = await request(app).get('/notfound');
    expect(data.statusCode).toBe(404);
    expect(data.text).toBe('Not Found');
  });

  it('should return a 500 error from /servererror', async () => {
    const data = await request(app).get('/servererror');
    expect(data.statusCode).toBe(500);
    expect(data.text).toBe('Internal Server Error');
  });

});
