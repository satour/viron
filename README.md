# viron
Automatically generate a management console based on swagger data.

# Document

> access : [Viron Documentation](https://cam-inc.github.io/viron-doc/)

# Site

> access : [Viron](https://cam-inc.github.io/viron/)

> access : [Viron(stg)](https://cam-inc.github.io/viron/stg/)

> access : [Viron(dev)](https://cam-inc.github.io/viron/dev/)

> access : [Viron(v0)](https://cam-inc.github.io/viron/v0/)

# QuickStart

```
$ npm install .
$ npm start # web server listen:8080
```

> access : [http://localhost:8080](http://localhost:8080)

- [riot.js](http://riotjs.com/)
- [swagger](http://swagger.io/)
- [postcss](http://postcss.org/)

# Develpment


## swagger-client(swagger-js) ビルド手順

3.xのビルド済ファイルが存在しないので、手動でビルドしてdist/swagger-client.jsに配置する。

node.js v0.6で下記の作業はする必要がある


```
$ git clone https://github.com/swagger-api/swagger-js
$ swagger-js
$ npm install
$ npm run build-bundle
$ ls browser/swagger-client.js
```

> TODO もっといい組み込み方があるはず

# Release

```
$ npm version [major|minor|patch]
$ git push origin develop
$ npm run release
```
> access : [Viron](https://cam-inc.github.io/viron/)

> access : [Viron(stg)](https://cam-inc.github.io/viron/stg/)

> access : [Viron(dev)](https://cam-inc.github.io/viron/dev/)
