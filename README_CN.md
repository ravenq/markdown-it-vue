# markdown-it-vue

[![Build Status](https://travis-ci.org/ravenq/markdown-it-vue.svg?branch=master)](https://travis-ci.org/ravenq/markdown-it-vue)

> Markdonw Vue 组件库.

markdown-it-vue 是一个丰富的 markdown Vue 组件，markdown-it-vue 使用 markdown-it 作为 Markdown 数据解析引擎，整合多种 markdown-it 插件，并内置了一些自己的功能性插件，支持 GFM TOC、GFM style、emoji等通用特性，还支持 mermaid charts、Echarts、flowchart.js 等多种图表，支持 AsciiMath、Latex 等数学公式渲染，支持 errro | warning | info 个性化提示。

## 在线示例

[http://www.aqcoder.com/markdown](http://www.aqcoder.com/markdown)

## 安装

```sh
npm install markdown-it-vue
```

## 特性

* Official markdown syntax.
* GFM TOC
* GFM style
* emoji
* [mermaid charts](http://knsv.github.io/mermaid/)
* [Echarts](http://echarts.baidu.com)
* Flowcharts.js
* Subscript/Superscript
* [AsciiMath](http://asciimath.org/)
* info | error | warning message tip

## 使用的插件

* markdown-it
* markdown-it-emoji
* markdown-it-sub
* markdown-it-sup
* markdown-it-footnote
* markdown-it-deflist
* markdown-it-abbr
* markdown-it-ins
* markdown-it-mark
* markdown-it-katex
* markdown-it-task-lists
* markdown-it-icons
* markdown-it-highlight
* markdown-it-latex
* markdown-it-container
* markdown-it-github-toc
* markdown-it-source-map

## 使用示例

```vue
<template>
  <div>
    <markdown-it-vue class="md-body" :content="content"/>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
  components: {
    MarkdownItVue
  },
  data () {
    return {
      content: '# your markdown content'
    }
  }
}
</script>
```

## 示例截图

![markdown-it-vue](https://github.com/ravenq/markdown-it-vue/blob/master/doc/markdown-it-vue.png?raw=true)

## License

[MIT](https://github.com/ravenq/markdown-it-vue/blob/master/LICENSE)
