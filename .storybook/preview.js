// import global css to be applied to all stories
import '../src/styles/global.scss'
import "szot-ui-experimental/src/styles/global.scss";

import customViewports from './viewports'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,
  },
  creevey: {
    skip: { kinds: /^((?![Pp]ages).)*$/ }
  }
}
