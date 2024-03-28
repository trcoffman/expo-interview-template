import { UnistylesRegistry } from 'react-native-unistyles';

import { breakpoints } from './breakpoints';
import { lightTheme, darkTheme } from './theme';

type AppBreakpoints = typeof breakpoints;

// if you defined themes
export type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

// override library types
declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
  })
  .addConfig({
    experimentalCSSMediaQueries: false,
    adaptiveThemes: true,
    initialTheme: 'light',
  });
