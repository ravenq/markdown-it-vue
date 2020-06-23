import './font-awsome/css/font-awesome.min.css'

import { rendererRule, coreRuler } from 'markdown-it-regex'
import { solid, regular, brands } from 'font-awesome-icon-chars'
const faIconChars = [...solid, ...regular, ...brands]

const iconsPlugin = (md) => {
  let options = null
  let faIcons = []
  faIconChars.forEach(char => {
    faIcons = faIcons.concat(char.name)
  })

  const faRegex = new RegExp(`(:fa-(?:${faIcons.join('|')}):)`)
  options = {
    name: 'font-awesome',
    regex: faRegex,
    replace: match => `<i class="fa ${match.slice(1, -1)}"></i>`
  }
  md.renderer.rules[options.name] = (tokens, idx) => {
    return rendererRule(tokens, idx, options)
  }
  md.core.ruler.push(options.name, state => {
    coreRuler(state, options)
  })
}

export default iconsPlugin
