import { expect, test } from 'vitest';

import { FormGenerator } from './form-generator';

test('Form generating from FormGenerator class', () => {
  const template = { name: 'rob', job: 'hexlet', gender: 'm' };

  expect(FormGenerator.formFor(template, {}, () => {})).toBe(
    '<form action="#" method="post"></form>',
  );

  expect(FormGenerator.formFor(template, { url: '/users' }, () => {})).toBe(
    '<form action="/users" method="post"></form>',
  );

  expect(
    FormGenerator.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit();
    }),
  ).toBe(
    '<form method="post" action="#">'
      + '<label for="name">Name</label><input name="name" type="text" value="rob">'
      + '<label for="job">Job</label><textarea cols="20" rows="40" name="job">hexlet</textarea>'
      + '<input type="submit" value="Save">'
      + '</form>',
  );
  expect(
    FormGenerator.formFor(template, {}, (f) => {
      f.input('name', { class: 'user-input' });
      f.input('job');
      f.submit('Wow');
    }),
  ).toBe(
    '<form action="#" method="post">'
      + '<label for="name">Name</label><input name="name" type="text" value="rob" class="user-input">'
      + '<label for="job">Job</label><input name="job" type="text" value="hexlet">'
      + '<input type="submit" value="Wow">'
      + '</form>',
  );
});
