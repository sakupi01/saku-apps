import { extendTheme, UsageTheme } from "@yamada-ui/react";
import { semantics } from "./semantics";
import styles from "./styles";
import tokens from "./tokens";
// import styles from './styles'
// import components from './components'
// import tokens from './tokens'

const customTheme: UsageTheme = {
  styles,
  // components,
  ...tokens,
  semantics,
};

export default extendTheme(customTheme)();
