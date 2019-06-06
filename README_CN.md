# markdown-it-vue

[![Build Status](https://travis-ci.org/ravenq/markdown-it-vue.svg?branch=master)](https://travis-ci.org/ravenq/markdown-it-vue)

> Markdonw Vue 组件库.

markdown-it-vue 是一个丰富的 markdown Vue 组件，markdown-it-vue 使用 markdown-it 作为 Markdown 数据解析引擎，整合多种 markdown-it 插件，并内置了一些自己的功能性插件，支持 GFM TOC、GFM style、emoji等通用特性，还支持 mermaid charts、Echarts、flowchart.js 等多种图表，支持 AsciiMath、Latex 等数学公式渲染，支持 errro | warning | info 个性化提示。

## 在线示例

[http://www.aqcoder.com/markdown](http://www.aqcoder.com/markdown)

由于众所周知的原因，可能需要 fan qiang。

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
* markdown-it-link-attributes

内置插件：

* markdown-it-plugin-echarts
* markdown-it-plugin-mermaid
* markdown-it-plugin-flowchart

## markdown-it 及个插件选项

使用  `options` 指定 markdow-it 和个插件的选项。

```html
<markdown-it-vue class="md-body" :content="content" :options="options" />
```

```js
options: {
  markdownIt: {
    linkify: true
  },
  linkAttributes: {
    target: '_blank',
    rel: 'noopener'
  }
}
```

更多 markdown-it 选项见官方文档：<https://markdown-it.github.io/markdown-it/>。

插件默认选项如下：

```js
{
  linkAttributes: {
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
  },
  katex: {
    throwOnError: false,
    errorColor: '#cc0000'
  },
  icons: 'font-awesome',
  githubToc: {
    tocFirstLevel: 2,
    tocLastLevel: 3,
    tocClassName: 'toc',
    anchorLinkSymbol: '',
    anchorLinkSpace: false,
    anchorClassName: 'anchor',
    anchorLinkSymbolClassName: 'octicon octicon-link'
  }
}
```

个插件详细说明见个插件官方文档。

## More plugins

it can add your plugin to markdown-it-vue by the `use` method.

```js
this.$refs.myMarkdownItVue.use(MyMarkdownItPlugin)
```

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
