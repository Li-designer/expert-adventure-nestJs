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