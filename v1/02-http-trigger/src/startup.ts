import 'reflect-metadata';
import { NammathamApp } from 'nammatham';
import { WithTypeUtilityFunction } from './functions/with-type-utility.controller';
import { CustomTypeFunction } from './functions/custom-type.function';
import { Service } from './functions/services';

const builder = NammathamApp.createBuilder(__filename);
builder.addFunctions(WithTypeUtilityFunction, CustomTypeFunction);
builder.container.bind(Service).toSelf().inSingletonScope();
builder.build();

export default builder.getApp();
