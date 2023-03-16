import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'AldotheApache';
        src: url('./fonts/AldotheApache.ttf');
      }

      @font-face {
        font-family: 'SpaceGrotesk';
        src: url('./fonts/SpaceGrotesk.ttf');
      }
      `}
  />
)

export default Fonts