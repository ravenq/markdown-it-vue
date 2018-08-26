<template>
  <div class="markdown-body" ref="vue-markdown-it-container"></div>
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
import MarkdownItKatex from 'markdown-it-katex'
import MarkdownItTasklists from 'markdown-it-task-lists'
import MarkdownItIcons from 'markdown-it-icons'
import MarkdownItHighlight from 'markdown-it-highlight'
import MarkdownItLatex from 'markdown-it-latex'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItGithubToc from 'markdown-it-github-toc'
import MarkdownItSourceMap from 'markdown-it-source-map'
import MarkdownItEcharts from './markdown-it-plugin-echarts'
import MarkdownItMermaid from './markdown-it-plugin-mermaid'
import 'github-markdown-css'
import 'markdown-it-latex/dist/index.css'
import 'markdown-it-icons/dist/index.css'
import 'markdown-it-highlight/dist/index.css'

import echarts from 'echarts'
import mermaid from 'mermaid'

export default {
  name: 'vue-markdown-it',
  props: {
    content: {
      type: String
    }
  },
  watch: {
    content: {
      immediate: true,
      handler (val) {
        this.$nextTick(_ => {
          this.$refs['vue-markdown-it-container'].innerHTML = this.md.render(val)
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
        })
      }
    }
  },
  data () {
    let md = new MarkdownIt()
      .use(MarkdownItEmoji)
      .use(MarkdownItSubscript)
      .use(MarkdownItSuperscript)
      .use(MarkdownItFootnote)
      .use(MarkdownItDeflist)
      .use(MarkdownItAbbreviation)
      .use(MarkdownItInsert)
      .use(MarkdownItMark)
      .use(MarkdownItKatex, {throwOnError: false, errorColor: '#cc0000'})
      .use(MarkdownItTasklists, {enabled: this.taskLists})
      .use(MarkdownItIcons)
      .use(MarkdownItHighlight)
      .use(MarkdownItLatex)
      .use(MarkdownItContainer, 'success')
      .use(MarkdownItContainer, 'info')
      .use(MarkdownItContainer, 'warining')
      .use(MarkdownItContainer, 'danger')
      .use(MarkdownItGithubToc, {
        tocFirstLevel: 2,
        tocLastLevel: 3,
        tocClassName: 'toc',
        anchorLinkSymbol: '',
        anchorLinkSpace: false,
        anchorClassName: 'anchor',
        anchorLinkSymbolClassName: 'octicon octicon-link'
      })
      .use(MarkdownItSourceMap)
      .use(MarkdownItMermaid)
      .use(MarkdownItEcharts)
    return {
      md: md
    }
  }
}
</script>
