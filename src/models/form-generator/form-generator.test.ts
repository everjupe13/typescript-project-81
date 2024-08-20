import { expect, test } from 'vitest'

import { HexletCode } from './form-generator'

test('Form generating from FormGenerator class', () => {
  const template = { name: 'rob', job: 'hexlet', gender: 'm' }

  expect(HexletCode.formFor(template, {}, () => {})).toBe(
    '<form action="#" method="post"></form>'
  )

  expect(HexletCode.formFor(template, { url: '/users' }, () => {})).toBe(
    '<form action="/users" method="post"></form>'
  )
})
