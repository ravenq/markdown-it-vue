'use strict'

// Adapted from https://github.com/markdown-it/markdown-it/blob/fbc6b0fed563ba7c00557ab638fd19752f8e759d/docs/architecture.md

function findFirstMatchingConfig(link, configs) {
  var i, config
  if (!link.attrIndex) {
    return
  }
  var href = link.attrs[link.attrIndex('href')][1]

  for (i = 0; i < configs.length; ++i) {
    config = configs[i]

    // if there is no pattern, config matches for all links
    // otherwise, only return config if href matches the pattern set
    if (!config.pattern || new RegExp(config.pattern).test(href)) {
      return config
    }
  }
}

function applyAttributes(idx, tokens, attributes) {
  Object.keys(attributes).forEach(function(attr) {
    var attrIndex
    var value = attributes[attr]

    if (attr === 'className') {
      // when dealing with applying classes
      // programatically, some programmers
      // may prefer to use the className syntax
      attr = 'class'
    }

    attrIndex = tokens[idx].attrIndex(attr)

    if (attrIndex < 0) {
      // attr doesn't exist, add new attribute
      tokens[idx].attrPush([attr, value])
    } else {
      // attr already exists, overwrite it
      tokens[idx].attrs[attrIndex][1] = value // replace value of existing attr
    }
  })
}

function markdownitLinkAttributes(md, configs) {
  if (!configs) {
    configs = []
  } else {
    configs = Array.isArray(configs) ? configs : [configs]
  }

  Object.freeze(configs)

  var defaultRender = md.renderer.rules.link_open || this.defaultRender

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var config = findFirstMatchingConfig(tokens[idx], configs)
    var attributes = config && config.attrs

    if (attributes) {
      applyAttributes(idx, tokens, attributes)
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self)
  }
}

markdownitLinkAttributes.defaultRender = function(
  tokens,
  idx,
  options,
  env,
  self
) {
  return self.renderToken(tokens, idx, options)
}

export default markdownitLinkAttributes
