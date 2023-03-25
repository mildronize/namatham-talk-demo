import 'reflect-metadata';
import { AzureFunction, Context } from '@azure/functions';

const myFunction: AzureFunction = async function (context: Context, ...args: any[]) {
  const { req } = context.bindings;
  const name = req.query.name;
  context.res = {
    body: `hello get user with ${name}}`,
  };
};

export default myFunction;
