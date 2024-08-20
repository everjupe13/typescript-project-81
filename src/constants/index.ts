/* eslint-disable import/prefer-default-export */
import { IAttributes } from '../types';

export const COMMONG_TAGS: Record<
string,
{
  paired: boolean
  defaultAttrs?: IAttributes
  attrsOrder?: (keyof IAttributes)[]
}
> = {
  div: {
    paired: true,
  },
  img: {
    paired: false,
  },
  br: {
    paired: false,
  },
  label: {
    paired: true,
  },
  input: {
    paired: false,
    defaultAttrs: {
      type: 'text',
    },
    attrsOrder: ['name', 'type', 'value'],
  },
  form: {
    paired: true,
    defaultAttrs: {
      action: '#',
      method: 'post',
    },
    attrsOrder: ['action', 'method'],
  },
  textarea: {
    paired: true,
    defaultAttrs: {
      cols: 20,
      rows: 40,
    },
    attrsOrder: ['cols', 'rows', 'name'],
  },
};
