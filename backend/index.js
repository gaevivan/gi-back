
import express from 'express';
import cors from 'cors';
import Api from './src/classes/api.class.js';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
const { MongoClient } = mongodb;

MongoClient.connect('mongodb+srv://ghub-1-dbuser:Meph1stopheles@cluster0.iczte.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Database: connected');
    const api = new Api(client);
    app.use(cors({ origin: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.post('/api/entity', api.checkToken.bind(api), (request, response) => api.entity(request, response));
    app.post('/api/select', api.checkToken.bind(api), (request, response) => api.select(request, response));
    app.post('/api/update', api.checkToken.bind(api), (request, response) => api.update(request, response));
    app.post('/api/remove', api.checkToken.bind(api), (request, response) => api.remove(request, response));
    app.post('/api/create', api.checkToken.bind(api), (request, response) => api.create(request, response));
    app.post('/api/signUp', (request, response) => api.signUp(request, response));
    app.post('/api/signIn', (request, response) => api.signIn(request, response));
    app.post('/api/signOut', api.checkToken.bind(api), (request, response) => api.signOut(request, response));
    app.post('/api/currentUser', api.checkToken.bind(api), (request, response) => api.currentUser(request, response));
    app.listen(3000, function () {
      console.log('Port: 3000');
      console.log('Server: started');
    });
  })
  .catch(() => client.close())


// app.post('/select', jwt.jwtMiddleware, (req, res) => api.select(req, res, db));
// app.post('/update', jwt.jwtMiddleware, (req, res) => api.update(req, res, db));
// app.post('/remove', jwt.jwtMiddleware, (req, res) => api.remove(req, res, db));
// app.post('/create', jwt.jwtMiddleware, (req, res) => api.create(req, res, db));

