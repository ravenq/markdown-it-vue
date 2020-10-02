# markdown-it-vue

[![Build Status](https://travis-ci.org/ravenq/markdown-it-vue.svg?branch=master)](https://travis-ci.org/ravenq/markdown-it-vue)

> Markdonw Vue 组件库.

markdown-it-vue 是一个丰富的 markdown Vue 组件，markdown-it-vue 使用 markdown-it 作为 Markdown 数据解析引擎，整合多种 markdown-it 插件，并内置了一些自己的功能性插件，支持 GFM TOC、GFM style、emoji 等通用特性，还支持 mermaid charts、Echarts、flowchart.js 等多种图表，支持 AsciiMath、Latex 等数学公式渲染，支持 errro | warning | info 个性化提示。

## 在线示例

[http://www.aqcoder.com/markdown](http://www.aqcoder.com/markdown)

由于众所周知的原因，可能需要 fan qiang。

## 安装

```sh
npm install markdown-it-vue
```

## 特性

- Official markdown syntax.
- GFM TOC
- GFM style
- emoji
- [mermaid charts](http://knsv.github.io/mermaid/)
- [Echarts](http://echarts.baidu.com)
- Flowcharts.js
- Subscript/Superscript
- [AsciiMath](http://asciimath.org/)
- info | error | warning message tip

## 使用的插件

- markdown-it
- markdown-it-emoji
- markdown-it-sub
- markdown-it-sup
- markdown-it-footnote
- markdown-it-deflist
- markdown-it-abbr
- markdown-it-ins
- markdown-it-mark
- markdown-it-katex
- markdown-it-task-lists
- markdown-it-icons
- markdown-it-highlight
- markdown-it-latex
- markdown-it-container
- markdown-it-github-toc
- markdown-it-source-map
- markdown-it-link-attributes

内置插件：

- markdown-it-font-awsome
- markdown-it-link-attributes
- markdown-it-highlight
- markdown-it-plugin-echarts
- markdown-it-plugin-mermaid
- markdown-it-plugin-flowchart

## markdown-it 及个插件选项

使用 `options` 指定 markdow-it 和个插件的选项。

```html
<markdown-it-vue class="md-body" :content="content" :options="options" />
```

```js
options: {
  markdownIt: {
    linkify: true
  },
  linkAttributes: {
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
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
  },
  mermaid: {
    theme: 'default'
  }
}
```

个插件详细说明见个插件官方文档。

## 自定义插件

it can add your plugin to markdown-it-vue by the `use` method.

```js
this.$refs.myMarkdownItVue.use(MyMarkdownItPlugin)
```

## 支持高亮的语言

语言高亮使用 hilight.js 打包过大，因此只引用了常用的语言。

如果这里没有你需要的语言，欢迎提 PR。

- html
- json
- css
- shell
- bash
- C
- Java
- Python
- C++
- C#
- PHP
- SQL
- R
- Swift
- Go
- MATLAB
- Ruby
- Perl
- Objective-C
- Rust
- Dart
- Delphi
- D
- Kotlin
- Scala
- SAS
- Lisp
- Lua
- Ada
- Fortran
- PowerShell
- VBScript
- VBscript-html
- Groovy
- Julia
- Julia-repl
- LabVIEW
- Haskell
- ActionScript
- Scheme
- TypeScript
- F#
- Prolog
- Erlang

## 关于 echarts

为了减少包的大小，只引用 echarts.simple。

## 精简版 markdown-it-vue-light

<https://github.com/ravenq/markdown-it-vue/issues/24>

为了进一步缩小打包的大小，移除了 mermaid chart。这包直接引用了整个 lodash, 他本身也很大。

如果平时用不到的话，就用精简版吧。

## 使用示例

```vue
<template>
  <div>
    <markdown-it-vue class="md-body" :content="content" />
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
  components: {
    MarkdownItVue
  },
  data() {
    return {
      content: '# your markdown content'
    }
  }
}
</script>
```

使用精简版

```vue
<template>
  <div>
    <markdown-it-vue-light class="md-body" :content="content" />
  </div>
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
export default {
  components: {
    MarkdownItVueLight
  },
  data() {
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
