import getEqualFilter from '../functions/get-equal-filter.function.js';
import Storage from './storage.class.js';
import isEmpty from '../functions/is-empty.function.js';

export default class Api {
  constructor(client) {
    const database = client.db('test');
    this.storage = new Storage(database);
  }

  async checkToken(request, response, next) {
    try {
      const token = request.headers.token;
      if (!token) {
        return response.status(401).send('invalid token');
      }
      const tokens = await this.storage.select('tokens', getEqualFilter('id', token));
      if (isEmpty(tokens)) {
        return response.status(401).send('invalid token');
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
        return response.status(400).send('Необходимо поле: login');
      }
      const password = request.body.password;
      if (!password) {
        return response.status(400).send('Необходимо поле: password');
      }
      const user = await this.storage.create('users', [{ login, password }]);
      const result = await this.storage.create('tokens', [{ login }]);
      return response.status(200).send({token: result.id, ...user});
    } catch (error) {
      console.log(`signUp error`, error);
      return response.status(500).send(error);
    }
  }

  async signOut(request, response) {
    try {
      const token = request.body.token;
      if (!token) {
        return response.status(400).send('Необходимо поле: token');
      }
      const tokens = await this.storage.select('tokens', getEqualFilter('id', token));
      if (isEmpty(tokens)) {
        return response.status(400).send('Нет пользователя с таким кодом авторизации');
      }
      const signedOutItem = tokens[0];
      return response.status(200).send({login: signedOutItem.login});
    } catch (error) {
      console.log(`signOut error`, error);
      return response.status(500).send(error);
    }
  }

  async signIn(request, response) {
    try {
      const login = request.body.login;
      if (!login) {
        return response.status(400).send('Необходимо поле: login');
      }
      const loginFilter = getEqualFilter('login', login);
      const password = request.body.password;
      if (!password) {
        return response.status(400).send('Необходимо поле: password');
      }
      const passwordFilter = getEqualFilter('password', password);
      const filter = [loginFilter, 'and', passwordFilter];
      const usersWithLogin = await this.storage.select('users', loginFilter);
      const usersWithValidPassword = await this.storage.select('users', filter);
      if (isEmpty(usersWithLogin)) {
        return response.status(400).send('Нет пользователя с таким паролем');
      }
      if (isEmpty(usersWithValidPassword)) {
        return response.status(400).send('Неправильный пароль');
      }
      const user = usersWithValidPassword[0];
      const results = await this.storage.create('tokens', [{ login }]);
      const token = results[0];
      return response.status(200).send({token: token.id, ...user});
    } catch (error) {
      console.log(`signIn error`, error);
      return response.status(500).send(error);
    }
  }

  async entity(request, response) {
    try {
      const entity = request.body.entity;
      if (!entity) {
        return response.status(400).send('Необходимо поле: entity');
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
        return response.status(400).send('Необходимо поле: entity');
      }
      const data = request.body.data;
      if (!data) {
        return response.status(400).send('Необходимо поле: data');
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
        return response.status(400).send('Необходимо поле: entity');
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
        return response.status(400).send('Необходимо поле: entity');
      }
      const id = request.body.id;
      if (!id) {
        return response.status(400).send('Необходимо поле: id');
      }
      const data = request.body.data;
      if (!data) {
        return response.status(400).send('Необходимо поле: data');
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
        return response.status(400).send('Необходимо поле: entity');
      }
      const id = request.body.id;
      if (!id) {
        return response.status(400).send('Необходимо поле: id');
      }
      const result = await this.storage.delete(entity, id);
      return response.status(200).send(result);
    } catch (error) {
      console.log(`delete error`, error);
      return response.status(500).send(error);
    }
  }
}
