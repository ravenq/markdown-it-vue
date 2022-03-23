<template>
  <div>
    <div
      class="markdown-body"
      ref="markdown-it-vue-container"
      @click="hdlClick"
    />
    <image-viewer
      v-if="showViewer"
      :url-list="urlList"
      :index.sync="index"
      :on-close="closeViewer"
    />
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import MarkdownItEmoji from 'markdown-it-emoji'
import MarkdownItSubscript from 'markdown-it-sub'
import MarkdownItSuperscript from 'markdown-it-sup'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItAbbreviation from 'markdown-it-abbr'
import MarkdownItInsert from 'markdown-it-ins'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItKatex from '@iktakahiro/markdown-it-katex'
import MarkdownItTasklists from 'markdown-it-task-lists'
import MarkdownItLatex from 'markdown-it-latex'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItGithubToc from 'markdown-it-github-toc'
import MarkdownItSourceMap from 'markdown-it-source-map'
import MarkdownItLinkAttributes from './markdown-it-link-attributes'
import MarkdownItEcharts from './markdown-it-plugin-echarts'
import MarkdownItMermaid from './markdown-it-plugin-mermaid'
import MarkdownItFlowchart from './markdown-it-plugin-flowchart'
import MarkdownItHighlight from './markdown-it-highlight'
import MarkdownItFontAwsome from './markdown-it-font-awsome'
import MarkdownItImage from './markdown-it-image'
import 'github-markdown-css'
import 'markdown-it-latex/dist/index.css'

import * as echarts from 'echarts/dist/echarts.simple.min'
import mermaid from 'mermaid'
import flowchart from 'flowchart.js'
import ImageViewer from './markdown-it-image/image-viewer.vue'

const DEFAULT_OPTIONS_LINK_ATTRIBUTES = {
  attrs: {
    target: '_blank',
    rel: 'noopener'
  }
}
const DEFAULT_OPTIONS_KATEX = { throwOnError: false, errorColor: '#cc0000' }
const DEFAULT_OPTIONS_TASKLISTS = null
const DEFAULT_OPTIONS_GITHUBTOC = {
  tocFirstLevel: 2,
  tocLastLevel: 3,
  tocClassName: 'toc',
  anchorLinkSymbol: '',
  anchorLinkSpace: false,
  anchorClassName: 'anchor',
  anchorLinkSymbolClassName: 'octicon octicon-link'
}
const DEFAULT_OPTIONS_MERMAID = {
  theme: 'default'
}
const DEFAULT_OPTIONS_IMAGE = {
  hAlign: 'left',
  viewer: true
}

export default {
  components: { ImageViewer },
  name: 'markdown-it-vue',
  props: {
    content: {
      type: String
    },
    options: {
      type: Object,
      default() {
        return {
          markdownIt: {
            linkify: true
          },
          linkAttributes: DEFAULT_OPTIONS_LINK_ATTRIBUTES,
          katex: DEFAULT_OPTIONS_KATEX,
          tasklists: DEFAULT_OPTIONS_TASKLISTS,
          githubToc: DEFAULT_OPTIONS_GITHUBTOC,
          mermaid: DEFAULT_OPTIONS_MERMAID
        }
      }
    }
  },
  watch: {
    content: {
      immediate: true,
      handler(val) {
        this.urlSet.clear()
        this.$nextTick(() => {
          this.$refs['markdown-it-vue-container'].innerHTML = this.md.render(
            val
          )
          // render echarts
          document.querySelectorAll('.md-echarts').forEach(element => {
            try {
              let options = JSON.parse(element.textContent)
              let chart = echarts.init(element)
              chart.setOption(options)
            } catch (e) {
              element.outerHTML = `<pre>echarts complains: ${e}</pre>`
            }
          })
          // render mermaid
          mermaid.init(undefined, document.querySelectorAll('.mermaid'))
          // render flowchart
          document.querySelectorAll('.md-flowchart').forEach(element => {
            try {
              let code = element.textContent
              let chart = flowchart.parse(code)
              element.textContent = ''
              chart.drawSVG(element)
            } catch (e) {
              element.outerHTML = `<pre>flowchart complains: ${e}</pre>`
            }
          })

          let list = []
          for (const i of this.urlSet) {
            list.push(i)
          }
          this.urlList = list
          // emit event
          this.$emit('render-complete')
        })
      }
    }
  },
  data() {
    const optMarkdownIt = this.options.markdownIt
    const linkAttributes = this.options.linkAttributes || DEFAULT_OPTIONS_LINK_ATTRIBUTES
    const optKatex = this.options.katex || DEFAULT_OPTIONS_KATEX
    const optTasklists = this.options.tasklists || DEFAULT_OPTIONS_TASKLISTS
    const optGithubToc = this.options.githubToc || DEFAULT_OPTIONS_GITHUBTOC
    const optMermaid = this.options.mermaid || DEFAULT_OPTIONS_MERMAID
    const optImage = this.options.image || DEFAULT_OPTIONS_IMAGE
    optImage.urlSet = new Set()

    let md = new MarkdownIt(optMarkdownIt)
      .use(MarkdownItEmoji)
      .use(MarkdownItSubscript)
      .use(MarkdownItSuperscript)
      .use(MarkdownItFootnote)
      .use(MarkdownItDeflist)
      .use(MarkdownItAbbreviation)
      .use(MarkdownItInsert)
      .use(MarkdownItMark)
      .use(MarkdownItHighlight)
      .use(MarkdownItLatex)
      .use(MarkdownItSourceMap)
      .use(MarkdownItMermaid, optMermaid)
      .use(MarkdownItEcharts)
      .use(MarkdownItFlowchart)
      .use(MarkdownItLinkAttributes, linkAttributes)
      .use(MarkdownItKatex, optKatex)
      .use(MarkdownItTasklists, optTasklists)
      .use(MarkdownItFontAwsome)
      .use(MarkdownItGithubToc, optGithubToc)
      .use(MarkdownItImage, optImage)
      .use(MarkdownItContainer, 'warning', {
        validate: function(params) {
          return params.trim() === 'warning'
        },
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon = `<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-warning"><svg viewBox="64 64 896 896" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i>`
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-warning">${icon}`
          } else {
            return '</div>'
          }
        }
      })
      .use(MarkdownItContainer, 'info', {
        validate: function(params) {
          return params.trim() === 'info'
        },
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon = `<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-info"><svg viewBox="64 64 896 896" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i>`
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-info">${icon}`
          } else {
            return '</div>'
          }
        }
      })
      .use(MarkdownItContainer, 'success', {
        validate: function(params) {
          return params.trim() === 'success'
        },
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon = `<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-success"><svg viewBox="64 64 896 896" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg></i>`
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-success">${icon}`
          } else {
            return '</div>'
          }
        }
      })
      .use(MarkdownItContainer, 'error', {
        validate: function(params) {
          return params.trim() === 'error'
        },
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon = `<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-error"><svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg></i>`
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-error">${icon}`
          } else {
            return '</div>'
          }
        }
      })
    return {
      md: md,
      urlSet: optImage.urlSet,
      viewer: optImage.viewer,
      showViewer: false,
      index: 0,
      urlList: []
    }
  },
  methods: {
    use(plugin, options) {
      this.md.use(plugin, options)
    },
    get() {
      return this.md
    },
    hdlClick(e) {
      if (this.viewer && e.target.tagName == 'IMG') {
        this.index = this.urlList.indexOf(e.target.src) || 0
        this.showViewer = true
      }
    },
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>

<style lange="scss">
.markdown-it-vue-alter-info {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
}
.markdown-it-vue-alert-icon-info {
  color: #1890ff;
}
.markdown-it-vue-alter-success {
  border: 1px solid #b7eb8f;
  background-color: #f6ffed;
}
.markdown-it-vue-alert-icon-success {
  color: #52c41a;
}
.markdown-it-vue-alter-error {
  border: 1px solid #f5222d;
  background-color: #fff1f0;
}
.markdown-it-vue-alert-icon-error {
  color: #f5222d;
}
.markdown-it-vue-alter-warning {
  border: 1px solid #ffe58f;
  background-color: #fffbe6;
}
.markdown-it-vue-alert-icon-warning {
  color: #faad14;
}
.markdown-it-vue-alter {
  border-radius: 0;
  border: 0;
  margin-bottom: 0;
  display: inline-flex;
  font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue',
    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  padding: 0;
  list-style: none;
  position: relative;
  padding: 8px 15px 8px 37px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px;
}
.markdown-it-vue-alter p {
  margin-bottom: 2px;
}

.markdown-it-vue-alert-icon {
  top: 11.5px;
  left: 16px;
  position: absolute;
}
</style>
