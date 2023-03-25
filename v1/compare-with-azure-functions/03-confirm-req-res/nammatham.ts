// nammatham@1.3.0
import { BaseFunction, binding } from 'nammatham';

const bindings = [
  // binding.timerTrigger({ name: 'myTimer' as const, schedule: '0 */5 * * * *' }),
  binding.httpTrigger({ name: 'req' as const }),
  binding.http({ name: 'res' as const }),
] as const;

export class MyFunction extends BaseFunction<typeof bindings> {
  override execute() {
    const body = this.context.req.body;
  }
}
