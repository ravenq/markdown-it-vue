import 'highlight.js/styles/atom-one-light.css'

import hljs from 'highlight.js'

const highlightPlugin = md => {
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const code = token.content.trim()
    const lang = token.info ? [token.info] : undefined
    return `<pre><code class="hljs">${
      hljs.highlightAuto(code, lang).value
    }</code></pre>`
  }
}

export default highlightPlugin
