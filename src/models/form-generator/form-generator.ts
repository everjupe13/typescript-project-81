import { COMMONG_TAGS } from '../../constants'
import { IAttributes } from '../../types'
import { capitalize, omit } from '../../utils'
import { Tag } from '../tag'

type IFormGeneratorTemplate = Record<string, string>

type IFormGeneratorOptions = IAttributes & {
  url?: string
  method?: 'post' | 'POST' | 'get' | 'GET'
}

type IFormCallbackParameters = {
  input: (
    name: keyof IFormGeneratorTemplate,
    additionalOptions?: IAttributes
  ) => void
  submit: (
    name?: keyof IFormGeneratorTemplate,
    additionalOptions?: IAttributes
  ) => void
}
type IFormCallback = (f: IFormCallbackParameters) => void

export class FormGenerator {
  private static readonly alwaysOmittedAttibutes: string[] = ['as']
  private static readonly valueAsContentTags: string[] = ['textarea']
  private static readonly discardSotringTags: string[] = ['form']

  private static buildAttributesByTag(
    tag: string,
    attributes: IAttributes = {}
  ): IAttributes {
    const defaultTag = Object.keys(COMMONG_TAGS).find(key => key === tag)
    const defaultAttributes =
      defaultTag && COMMONG_TAGS[defaultTag]?.defaultAttrs
        ? COMMONG_TAGS[defaultTag].defaultAttrs
        : ({} as IAttributes)

    const attributesOrdered =
      defaultTag && COMMONG_TAGS[defaultTag]?.attrsOrder
        ? COMMONG_TAGS[defaultTag].attrsOrder
        : undefined

    const defaultAttributesEntries = Object.entries(defaultAttributes)
    const outputAttributes = defaultAttributesEntries.reduce(
      (attrs, [defaultAttrKey, defaultAttrValue]) => {
        if (!(defaultAttrKey in attributes)) {
          attrs[defaultAttrKey] = defaultAttrValue
        }

        return attrs
      },
      { ...attributes }
    )

    const sortedOutputAttributes = Object.fromEntries(
      Object.entries(outputAttributes).sort((a, b) => {
        if (!attributesOrdered) {
          return 0
        }

        const aIndex = attributesOrdered.indexOf(a[0])
        const bIndex = attributesOrdered.indexOf(b[0])

        if (aIndex === -1 && bIndex === -1) {
          return 0
        }

        if (aIndex === -1) {
          return 1
        }
        if (bIndex === -1) {
          return -1
        }

        return aIndex - bIndex
      })
    )

    return omit(
      this.discardSotringTags.includes(tag)
        ? outputAttributes
        : sortedOutputAttributes,
      this.alwaysOmittedAttibutes
    )
  }

  private static mapFormAttributes(
    options: IFormGeneratorOptions
  ): IAttributes {
    const mappedAttributes = [
      ['url', 'action'],
      ['method', 'method']
    ]
    const outputAttributes = mappedAttributes.reduce(
      (attrs, [mappedAttr, truthyAttr]) => {
        if (mappedAttr in options) {
          attrs[truthyAttr] = options[mappedAttr]
        }

        return attrs
      },
      {} as IAttributes
    )

    return {
      ...outputAttributes,
      ...omit(
        options,
        mappedAttributes.flatMap(attr => attr[0])
      )
    }
  }

  private static tagBuilder(
    tag: string,
    attributes?: IAttributes,
    content?: string
  ): Tag {
    return new Tag(tag, this.buildAttributesByTag(tag, attributes), content)
  }

  static formFor(
    template: IFormGeneratorTemplate,
    options: IFormGeneratorOptions = {},
    fn?: IFormCallback
  ): string {
    const innerTags: Tag[] = []

    const inputFn: IFormCallbackParameters['input'] = (name, options) => {
      if (!(name in template)) {
        throw new Error(`Field ${name} does not exist in the template.`)
      }

      const tag = (options?.as || 'input') as string
      const valueAsContentMode = this.valueAsContentTags.includes(tag)

      const inputAttributes = {
        name,
        ...options,
        ...(valueAsContentMode ? {} : { value: template[name] })
      }
      const content = valueAsContentMode ? template[name] : undefined

      innerTags.push(
        this.tagBuilder('label', { for: name }, capitalize(name)),
        this.tagBuilder(tag, inputAttributes, content)
      )
    }
    const submitFn: IFormCallbackParameters['submit'] = (name, options) => {
      const tag = 'input'
      const inputAttributes = {
        type: 'submit',
        value: name || 'Save',
        ...options
      }

      innerTags.push(this.tagBuilder(tag, inputAttributes))
    }

    const f: IFormCallbackParameters = {
      input: inputFn,
      submit: submitFn
    }

    fn?.(f)

    const formTag = this.tagBuilder(
      'form',
      this.mapFormAttributes(options),
      innerTags.map(tag => tag.toString()).join('')
    )

    return formTag.toString()
  }
}
