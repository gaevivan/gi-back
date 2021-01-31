import getEqualFilter from '../functions/get-equal-filter.function.js';
import Storage from './storage.class.js';
import isEmpty from '../functions/is-empty.function.js';

export default class Api {
  constructor(client) {
    const database = client.db('test');
    this.storage = new Storage(database);
  }

  async currentUser(request, response) {
    try {
      const token = request.headers.token;
      if (!token) {
        return response.status(401).send('Invalid token');
      }
      const tokens = await this.storage.select('tokens', getEqualFilter('id', token));
      if (isEmpty(tokens)) {
        return response.status(400).send('Invalid token');
      }
      const tokenItem = tokens[0];
      const login = tokenItem.login;
      const users = await this.storage.select('users', getEqualFilter('login', login));
      if (isEmpty(users)) {
        return response.status(400).send('Invalid token');
      }
      return response.status(200).send(users[0]);
    } catch (error) {
      console.log(`signOut error`, error);
      return response.status(500).send(error);
    }
  }

  async checkToken(request, response, next) {
    try {
      const token = request.headers.token;
      if (!token) {
        return response.status(401).send('Invalid token');
      }
      const tokens = await this.storage.select('tokens', getEqualFilter('id', token));
      if (isEmpty(tokens)) {
        return response.status(401).send('Invalid token');
      }
      next();
    } catch (error) {
      console.log(`checkToken error`, error);
      return response.status(500).send(error);
    }
  }

  async signUp(request, response) {
    try {
      const login = request.body.login;
      if (!login) {
        return response.status(400).send('Required body-field: login');
      }
      const password = request.body.password;
      if (!password) {
        return response.status(400).send('Required body-field: password');
      }
      const users = await this.storage.create('users', [{ login, password }]);
      if (isEmpty(users)) {
        return response.status(500).send(`Create error: new user (${login})`);
      }
      const tokens = await this.storage.create('tokens', [{ login }]);
      if (isEmpty(tokens)) {
        return response.status(500).send(`Create error: new token for ${login}. Try sign-in.`);
      }
      const token = tokens[0];
      return response.status(200).send({token: token.id});
    } catch (error) {
      console.log(`signUp error`, error);
      return response.status(500).send(error);
    }
  }

  async signOut(request, response) {
    try {
      const token = request.headers.token;
      if (!token) {
        return response.status(401).send('Invalid token');
      }
      const tokens = await this.storage.select('tokens', getEqualFilter('id', token));
      if (isEmpty(tokens)) {
        return response.status(400).send('Invalid token');
      }
      return response.status(200).send();
    } catch (error) {
      console.log(`signOut error`, error);
      return response.status(500).send(error);
    }
  }

  async signIn(request, response) {
    try {
      const login = request.body.login;
      if (!login) {
        return response.status(400).send('Required body-field: login');
      }
      const loginFilter = getEqualFilter('login', login);
      const password = request.body.password;
      if (!password) {
        return response.status(400).send('Required body-field: password');
      }
      const passwordFilter = getEqualFilter('password', password);
      const filter = [loginFilter, 'and', passwordFilter];
      const usersWithLogin = await this.storage.select('users', loginFilter);
      if (isEmpty(usersWithLogin)) {
        return response.status(400).send('No user with such login');
      }
      const usersWithValidPassword = await this.storage.select('users', filter);
      if (isEmpty(usersWithValidPassword)) {
        return response.status(401).send('Auth error');
      }
      const tokens = await this.storage.create('tokens', [{ login }]);
      if (isEmpty(tokens)) {
        return response.status(500).send(`Create error: new token for ${login}. Try sign-in.`);
      }
      const token = tokens[0];
      return response.status(200).send({token: token.id});
    } catch (error) {
      console.log(`signIn error`, error);
      return response.status(500).send(error);
    }
  }

  async entity(request, response) {
    try {
      const entity = request.body.entity;
      if (!entity) {
        return response.status(400).send('Required body-field: entity');
      }
      const result = await this.storage.entity(entity);
      return response.status(200).send(result);
    } catch (error) {
      console.log(`entity error`, error);
      return response.status(500).send(error);
    }
  }

  async create(request, response) {
    try {
      const entity = request.body.entity;
      if (!entity) {
        return response.status(400).send('Required body-field: entity');
      }
      const data = request.body.data;
      if (!data) {
        return response.status(400).send('Required body-field: data');
      }
      const result = await this.storage.create(entity, data);
      return response.status(201).send(result);
    } catch (error) {
      console.log(`create error`, error);
      return response.status(500).send(error);
    }
  }

  async select(request, response) {
    try {
      const entity = request.body.entity;
      if (!entity) {
        return response.status(400).send('Required body-field: entity');
      }
      const filter = request.body.filter;
      const limit = request.body.limit < 0 ? null : request.body.limit;
      const offset = request.body.offset < 0 ? null : request.body.offset;
      const result = await this.storage.select(entity, filter, offset, limit);
      return response.status(200).send(result);
    } catch (error) {
      console.log(`select error`, error);
      return response.status(500).send(error);
    }
  }

  async update(request, response) {
    try {
      const entity = request.body.entity;
      if (!entity) {
        return response.status(400).send('Required body-field: entity');
      }
      const id = request.body.id;
      if (!id) {
        return response.status(400).send('Required body-field: id');
      }
      const data = request.body.data;
      if (!data) {
        return response.status(400).send('Required body-field: data');
      }
      const result = await this.storage.update(entity, id, data);
      return response.status(200).send(result);
    } catch (error) {
      console.log(`update error`, error);
      return response.status(500).send(error);
    }
  }

  async delete(request, response) {
    try {
      const entity = request.body.entity;
      if (!entity) {
        return response.status(400).send('Required body-field: entity');
      }
      const id = request.body.id;
      if (!id) {
        return response.status(400).send('Required body-field: id');
      }
      const result = await this.storage.delete(entity, id);
      return response.status(200).send(result);
    } catch (error) {
      console.log(`delete error`, error);
      return response.status(500).send(error);
    }
  }
}
