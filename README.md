# markdown-it-vue
The vue lib for markdown-it.

## Install

```
npm install markdown-it-vue
```

## Supports

* Official markdown syntax.
* GFM TOC
* GFM style
* emoji
* [mermaid charts](http://knsv.github.io/mermaid/)
* [Echarts](http://echarts.baidu.com)
* Subscript/Superscript
* [AsciiMath](http://asciimath.org/)
* Custom Container

## Plugin list

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

## Usage

```vue
<template>
  <div>
    <markdown-it-vue class="md-body" :content="content"/>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
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

## ScreenShot

![markdown-it-vue](https://github.com/ravenq/markdown-it-vue/blob/master/doc/markdown-it-vue.png?raw=true)

## License

[MIT](https://github.com/ravenq/markdown-it-vue/blob/master/LICENSE)