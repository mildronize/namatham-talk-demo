// nammatham@1.3.0
import { BaseFunction, binding } from 'nammatham';

const bindings = [
  binding.httpTrigger({ name: 'req' as const }),
  binding.http({ name: 'res' as const }),
] as const;

export class MyFunction extends BaseFunction<typeof bindings> {
  override execute() {
    const { req } = this.context.bindings;
    //       ^?
  }
}
