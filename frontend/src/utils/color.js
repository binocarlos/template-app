import { hexToRgb } from '@material-ui/core/styles/colorManipulator'

const isRgb = string => /#?([0-9a-f]{6})/i.test(string)

// convert hex into rgba(r,g,b,alpha)
const getAlpha = (color, alpha) => {
  return hexToRgb(color)
    .replace(/^rgb/, 'rgba')
    .replace(/\)$/, `, ${alpha})`)
}

const utils = {
  isRgb,
  getAlpha,
}

export default utils