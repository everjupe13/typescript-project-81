import { expect, test } from 'vitest'

import { FormGenerator } from './form-generator'

test('Form generating from FormGenerator class', () => {
  const template = { name: 'rob', job: 'hexlet', gender: 'm' }

  expect(FormGenerator.formFor(template, {}, () => {})).toBe(
    '<form action="#" method="post"></form>'
  )

  expect(FormGenerator.formFor(template, { url: '/users' }, () => {})).toBe(
    '<form action="/users" method="post"></form>'
  )
})
