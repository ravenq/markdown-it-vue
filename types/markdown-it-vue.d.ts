import Vue from 'vue'
/**
 * The options of MarkdownIt.
 * https://markdown-it.github.io/markdown-it/#MarkdownIt.new
 */
export interface MarkdownItOptions {
  /** false.Set true to enable HTML tags in source.Be careful! 
   * That's not safe! You may need external sanitizer to protect output from XSS.
   * It's better to extend features via plugins, instead of enabling HTML.
   */
  html: boolean
  /**
   * false.Set true to add '/' when closing single tags(<br />). 
   * This is needed only for full CommonMark compatibility. 
   * In real world you will need HTML output.
   */
  xhtmlOut: boolean
  /**
   * false.Set true to convert \n in paragraphs into<br>.
   */
  breaks: boolean
  /**
   * language -.CSS language class prefix for fenced blocks.Can be useful for external highlighters.
   */
  langPrefix: string
  /**
   * false.Set true to autoconvert URL - like text to links.
   */
  linkify: boolean
  /**
   * false.Set true to enable some language - neutral replacement + quotes beautification(smartquotes).
   */
  typographer: boolean
  /**
   * “”‘’, String or Array.Double + single quotes replacement pairs,
   * when typographer enabled and smartquotes on.For example, you can use '«»„“'
   * for Russian, '„“‚‘' for German, and['«\xA0', '\xA0»', '‹\xA0', '\xA0›']
   * for French(including nbsp).
   */
  quotes: string | string[]
  /**
   * null.Highlighter function for fenced code blocks.
   * Highlighter function (str, lang) should return escaped HTML.
   * It can also return empty string if the source was not changed and should be escaped externaly.
   * If result starts with <pre...internal wrapper is skipped.
   */
  highlight: ((str: string, lang: string) => string)
}

export interface LinkAttributesOpionsAttrs {
  /**
   * The browser target like '_blank' etc.
   */
  target: string
  /**
   * Special the rel attribute like 'noopener' etc.
   */
  rel: string
  /**
   * Special the css class.
   */
  class: string
}

/**
 * The options of markdown-it-link-attributes
 * https://www.npmjs.com/package/markdown-it-link-attributes
 */
export interface LinkAttributesOpions {
  /**
   * You can also specify a pattern property.
   * The link's href property will be checked against the pattern RegExp provided
   * and only apply the attributes if it matches the pattern.
   */
  pattern: RegExp
  attrs: LinkAttributesOpionsAttrs
}

/**
 * The options of image.
 */
export interface ImageOptions {
  /**
   * The horizontal align of the images. 'left' or 'center' or 'right'.
   */
  hAlign: string
  /**
   * True if show the image viewer.
   */
  viewer: boolean
}

/**
 * The options of katex.
 * https://www.npmjs.com/package/markdown-it-katex
 */
export interface KatexOptions {
  /**
   * True if throw on error.
   */
  throwOnError: boolean
  /**
   * The error color default '#cc0000'
   */
  errorColor: string
}

/**
 * The options of tasklists.
 * https://www.npmjs.com/package/markdown-it-task-lists
 */
export interface TasklistsOptions {
  /**
   * The rendered checkboxes are disabled;
   * to change this, pass a truthy value into the enabled property of the plugin options.
   */
  enabled: boolean
  /**
   * If you'd like to wrap the rendered list items in a <label> element for UX purposes,
   *  pass a truthy value to the label property of the plugin options.
   */
  label: boolean
  /**
   * To add the label after the checkbox pass a truthy value to labelAfter property.
   */
  labelAfter: boolean
}

/**
 * The options of githubToc
 * https://www.npmjs.com/package/markdown-it-github-tocmarkdown-it-github-toc
 */
export interface GithubTocOptions {
  /**
   * Allow you to enable / disable the toc transformation of[toc]
   * (default : true)
   */
  toc: boolean
  /**
   * Option to customize html class of the < ul > wrapping the toc
   * (default : "markdownIt-TOC")
   */
  tocClassName: string
  /**
   * Allow you to skip some heading level.Example: use 2 if you want to skip < h1 > from the TOC.
   * (default : 1)
   */
  tocFirstLevel: number
  /**
   * Allow you to skip some heading level.Example: use 5 if you want to skip < h6 > from the TOC.
   * (default: 6)
   */
  tocLastLevel: number
  /**
   * Allow you to enable / disable the anchor link in the headings
   * (default: true)
   */
  anchorLink: boolean
  /**
   * Allow you to customize the anchor link symbol
   * (default: "#")
   */
  anchorLinkSymbol: string
  /**
   * Allow you to enable / disable inserting a space between the anchor link and heading.
   * (default: true)
   */
  anchorLinkSpace: boolean
  /**
   * Allow you to customize the anchor link symbol class name.If not null,
   * symbol will be rendered as <span class="anchorLinkSymbolClassName" > anchorLinkSymbol < /span>.
   * (default: null)
   */
  anchorLinkSymbolClassName: string
  /**
   * Allow you to prepend / append the anchor link in the headings
   * (default: true)
   */
  anchorLinkBefore: boolean
  /**
   * Allow you to customize the anchor link class
   * (default: "markdownIt-Anchor")
   */
  anchorClassName: string
  /**
   * Allow you to reset(or not) ids incrementation.Use it if you will have multiple documents on the same page.
   * (default: true)
   */
  resetIds: boolean
  /**
   * Allow you to customize indentation
   * (default: " ")
   */
  indentation: string
}


export interface MarkdownItVueOptions {
  /**
   * The options of MarkdownIt.
   */
  markdownIt: MarkdownItOptions
  /**
   * The options of markdown-it-link-attributes.
   * https://www.npmjs.com/package/markdown-it-link-attributes
   */
  linkAttributes: LinkAttributesOpions
  /**
   * The options of katex.
   * https://www.npmjs.com/package/markdown-it-katex
   */
  katex: KatexOptions
  /**
   * The options of tasklists.
   * https://www.npmjs.com/package/markdown-it-task-lists
   */
  tasklists: TasklistsOptions
  /**
   * The options of githubToc
   * https://www.npmjs.com/package/markdown-it-github-tocmarkdown-it-github-toc
   */
  githubToc: GithubTocOptions
  /**
   * The options of mermaid.
   * https://mermaid-js.github.io/mermaid/#/Setup?id=mermaidapi-configuration-defaults
   */
  mermaid: object,
  /**
   * The options of ImageViewer.
   */
  image: ImageOptions
}

export class MarkdownItVue extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void
  /** markdown plain text */
  content: string
  /** options for MarkdownItVue */
  options: MarkdownItVueOptions
}

export class MarkdownItVueLight extends MarkdownItVue { }
