/*API文件配置*/
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// ts项目不能导入.json的模块,在tsconfig.json中新增resolveJsonModule配置
import * as packageConfig from '../package.json';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .addServer('/expert-adventure') // swagger添加统一的baseURL
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/doc', app, document);
};
