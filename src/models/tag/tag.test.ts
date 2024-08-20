import { expect, test } from 'vitest'

import { Tag } from './tag'

test('Tag form output', () => {
  expect(new Tag('br').toString()).toBe('<br>')
  expect(new Tag('img', { src: 'path/to/image' }).toString()).toBe(
    '<img src="path/to/image">'
  )
  expect(new Tag('input', { type: 'submit', value: 'Save' }).toString()).toBe(
    '<input type="submit" value="Save">'
  )
  expect(new Tag('label', {}, 'Email').toString()).toBe('<label>Email</label>')
  expect(new Tag('label', { for: 'email' }, 'Email').toString()).toBe(
    '<label for="email">Email</label>'
  )
  expect(new Tag('div').toString()).toBe('<div></div>')
})
