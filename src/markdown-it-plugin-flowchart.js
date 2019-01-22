export default (md) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (token.info === 'flowchart.js') {
      const code = token.content.trim()
      return `<div class="md-flowchart">${code}</div>`
    }
    return temp(tokens, idx, options, env, slf)
  }
}
