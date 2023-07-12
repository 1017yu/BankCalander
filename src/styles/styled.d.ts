import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      green: string;
      lightgreen: string;
      red: string;
      gray: string;
      blue: string;
    };
  }
}
