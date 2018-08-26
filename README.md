# vue-markdown-it
The vue lib for markdown-it.

## Install

```
npm install vue-markdown-it
```

## Usage

```vue
<template>
  <div>
    <vue-markdown-it class="md-body" :content="content"/>
  </div>
</template>

<script>
import VueMarkdownIt from 'vue-markdown-it'
export default {
  components: {
    VueMarkdownIt
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

![vue-markdown-it](https://github.com/ravenq/vue-markdown-it/blob/master/static/vue-markdown-it.png)

## License

[MIT](https://github.com/ravenq/vue-markdown-it/blob/master/LICENSE)