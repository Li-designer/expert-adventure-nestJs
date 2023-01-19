# nestJS环境搭建基础模板

## 静态资源部署配置

```shell
    http://localhost:3000/ant-pro/
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
      database: 'antpro',
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

## 打包静态资源路径

     `dist/ant-pro`

## 本地静态资源路径

    `ant-nest/ant-pro`

## 生成一个CRUD

```bash
  # 执行命令选择`REST API`
$ nest g resource menu
```
