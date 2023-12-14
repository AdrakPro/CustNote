import type { Color } from '@milkdown/core';

const theme = {
  blue: '#2492f9',
  purple: '#A82FFC',
  gray: '#6272a4',
  white: '#fff',
  pink: '#ff79c6',
  dark1: '#484848',
  dark2: '#333'
};

export const color: Record<Color, string> = {
  primary: theme.blue,
  secondary: theme.purple,
  shadow: theme.gray,
  neutral: theme.white,
  solid: theme.blue,
  line: theme.blue,
  background: theme.dark1,
  surface: theme.dark2
};
