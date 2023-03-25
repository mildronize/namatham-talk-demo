import { AzureFunction, Context, HttpResponse } from '@azure/functions';

const myFunction: AzureFunction = async function (context: Context, ...args: any[]): Promise<HttpResponse> {
  context.log('JavaScript HTTP trigger function processed a request.');

  const body = context.req?.body;

  return {
    body: 'OK',
  };
};

export default myFunction;
