// nammatham@1.3.0
import { BaseFunction, binding } from 'nammatham';

const bindings = [
  {
    name: 'req',
    type: 'httpTrigger',
    direction: 'in',
  },
  {
    type: 'http',
    direction: 'out',
    name: 'res',
  },
] as const;

export class MyFunction extends BaseFunction<typeof bindings> {
  override execute() {
    this.context.res = {
      body: 'OK'
    }
  }
}
