import { createContext } from 'react';
import {
  color_primary,
  color_secondary,
  color_text,
  color_links,
} from './colors.module.scss';
export const themes = {
  palette: {
    primary: color_primary,
    secondary: color_secondary,
    text: color_text,
    links: color_links,
  },
};

export const ThemeContext = createContext(themes);
