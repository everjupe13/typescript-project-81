import { COMMONG_TAGS } from '@/constants'

const TEMPLATE_STRING_TARGETS = {
  ATTRIBUTES: '{attributes}',
  CONTENT: '{content}'
}

export class Tag {
  public tag: string
  public attributes: Record<string, string>
  public content: string | undefined

  public htmlString: string
  protected attributesString: string

  constructor(
    tag: string,
    attributes?: Record<string, string>,
    content?: string
  ) {
    this.tag = tag
    this.attributes = attributes || {}
    this.content = content

    this.attributesString = this.buildAttributesString()
    this.htmlString = this.buildHtmlString()
  }

  private buildAttributesString(): string {
    return Object.entries(this.attributes)
      .map(attribute => [attribute[0], `"${attribute[1]}"`].join('='))
      .join(' ')
  }

  protected buildHtmlString(): string {
    if (!Object.hasOwnProperty.call(COMMONG_TAGS, this.tag)) {
      throw new Error("provided tag isn't supported yet")
    }

    const currentTag = this.tag.toLowerCase() as keyof typeof COMMONG_TAGS
    const currentTagData = COMMONG_TAGS[currentTag]

    const withAttributes = Boolean(this.attributesString)
    const withContent = Boolean(this.content)

    return currentTagData.paired
      ? `<${currentTag}${withAttributes ? TEMPLATE_STRING_TARGETS.ATTRIBUTES : ''}>${withContent ? TEMPLATE_STRING_TARGETS.CONTENT : ''}</${currentTag}>`
      : `<${currentTag}${withAttributes ? TEMPLATE_STRING_TARGETS.ATTRIBUTES : ''}>`
  }

  public toString(): string {
    return this.htmlString
      .replace(TEMPLATE_STRING_TARGETS.ATTRIBUTES, ` ${this.attributesString}`)
      .replace(TEMPLATE_STRING_TARGETS.CONTENT, this.content || '')
  }
}
