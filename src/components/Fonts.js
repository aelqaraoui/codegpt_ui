import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'AldotheApache';
        src: url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@1,100&display=swap');
      }

      @font-face {
        font-family: 'SpaceGrotesk';
        src: url('./fonts/SpaceGrotesk.ttf');
      }
      `}
  />
)

export default Fonts