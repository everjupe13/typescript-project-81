import { omit } from '../../utils'
import { Tag } from '../tag'

interface IFormGeneratorTemplate extends Record<string, string> {}

type IFormGeneratorOptions = {
  url?: string
  method?: 'post' | 'POST' | 'get' | 'GET'
  [x: string]: string | boolean | number | undefined
}

type IFormCallbackParameters = object
type IFormCallback = (f: IFormCallbackParameters) => void

export class FormGenerator {
  constructor() {}

  private static mapFormOptionsToAttributes(
    options: IFormGeneratorOptions
  ): object {
    return {
      action: options.url ?? '#',
      method: options.method ?? 'post',
      ...omit(options, ['url', 'method'])
    }
  }

  static formFor(
    template: IFormGeneratorTemplate,
    options: IFormGeneratorOptions = {},
    fn?: IFormCallback
  ): string {
    fn?.({ a: 1 })
    const form = new Tag('form', this.mapFormOptionsToAttributes(options))

    return form.toString()
  }
}
