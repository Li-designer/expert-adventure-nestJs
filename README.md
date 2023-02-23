# nestJS环境搭建基础模板

## 运行

```shell
    http://localhost:3000/
```

## 接口文档`swagger`

```shell
    http://localhost:3000/api/doc
```

## 全局异常拦截

    `app.useGlobalInterceptors(new TransformInterceptor());`

## 设置统一响应体格式

    `app.useGlobalFilters(new AllExceptionsFilter());`

## `typeorm`和`mysql`数据库配置

```ts
// 数据库连接
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'XXX',
      autoLoadEntities: true,
      synchronize: true, //实体与数据表进行对应,不创建数据库也会自动生成
    })
```

## 本地运行项目开启热更新

```shell
 npm run start:hotdev
```

## 服务器部署运行

```shell
 npm run start:prod
```

## 本地静态资源路径

    `/expert-adventure`

## 生成一个CRUD

```bash
  # 执行命令选择`REST API`
$ nest g resource menu
```

## 本地`websocket`

`ws://localhost:3002`

## `websocket`版本

`@nestjs/platform-socket.io": "^8.0.2`
`@nestjs/websockets": "^8.0.2`

## 文件目录

```
🗂expert-adventure-nestJs
├─ 📄.env.production
├─ 📄.DS_Store
├─ 📄webpack-hmr.config.js
├─ 📄nest-cli.json
├─ 📄read.md
├─ 📄README.md
├─ 📄yarn.lock
├─ 📄.gitignore
├─ 📄package-lock.json
├─ 📄package.json
├─ 📄tsconfig.build.json
├─ 📄.prettierrc
├─ 📄.eslintrc.js
├─ 📄tsconfig.json
├─ 📄.env.development
├─ 🗂test
│  ├─ 📄app.e2e-spec.ts
│  └─ 📄jest-e2e.json
├─ 🗂dist
├─ 🗂.vscode
│  └─ 📄launch.json
├─ 🗂expert-adventure
│  ├─ 📄favicon.ico
│  ├─ 📄serverConfig.json
│  ├─ 📄index.html
│  └─ 🗂static
│     ├─ 🗂css
│     ├─ 🗂js
│     ├─ 🗂png
│     └─ 🗂ttf
├─ 🗂src
│  ├─ 📄.DS_Store
│  ├─ 📄main.ts
│  ├─ 📄app.service.ts
│  ├─ 📄doc.ts
│  ├─ 📄app.module.ts
│  ├─ 📄app.controller.spec.ts
│  ├─ 📄app.controller.ts
│  ├─ 🗂auth
│  │  ├─ 📄auth.controller.ts
│  │  ├─ 📄jwt.strategy.ts
│  │  ├─ 📄auth.service.ts
│  │  ├─ 📄jwt-auth.guard.ts
│  │  ├─ 📄local-auth.guard.ts
│  │  ├─ 📄constants.ts
│  │  ├─ 📄local.strategy.ts
│  │  └─ 📄auth.module.ts
│  ├─ 🗂type
│  │  ├─ 📄button.ts
│  │  ├─ 📄menu.ts
│  │  ├─ 📄user.ts
│  │  └─ 📄auth.ts
│  ├─ 🗂role
│  │  ├─ 📄role.controller.ts
│  │  ├─ 📄role.module.ts
│  │  ├─ 📄role.service.ts
│  │  ├─ 🗂dto
│  │  └─ 🗂entities
│  ├─ 🗂user
│  │  ├─ 📄user.module.ts
│  │  ├─ 📄.DS_Store
│  │  ├─ 📄user.controller.ts
│  │  ├─ 📄user.service.ts
│  │  ├─ 🗂dto
│  │  └─ 🗂entities
│  ├─ 🗂common
│  │  ├─ 🗂interceptors
│  │  └─ 🗂exception
│  ├─ 🗂button
│  │  ├─ 📄button.controller.ts
│  │  ├─ 📄button.service.ts
│  │  ├─ 📄button.module.ts
│  │  ├─ 🗂dto
│  │  └─ 🗂entities
│  ├─ 🗂menu
│  │  ├─ 📄menu.controller.ts
│  │  ├─ 📄menu.module.ts
│  │  ├─ 📄menu.service.ts
│  │  ├─ 🗂dto
│  │  └─ 🗂entities
│  └─ 🗂ws
│     ├─ 📄ws.module.ts
│     ├─ 📄ws.service.ts
│     ├─ 📄ws.gateway.ts
│     ├─ 📄ws.controller.ts
│     ├─ 📄ws.adapter.ts
│     ├─ 🗂dto
│     └─ 🗂entities
├─ 🗂.git
└─ 🗂node_modules
```
