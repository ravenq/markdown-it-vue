<template>
  <div class="container">
    <textarea class="md-text" rows="10" v-model="content"/>
    <markdown-it-vue class="md-body" :content="content" :options="options" />
  </div>
</template>

<script>
import MarkdownText from './example'
import MarkdownItVue from '../../src'
export default {
  components: {
    MarkdownItVue
  },
  data () {
    return {
      content: MarkdownText,
      options: {
        markdownIt: {
          linkify: true
        },
        linkAttributes: {
          target: '_blank',
          rel: 'noopener'
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: inline-flex;
  width: 100%;
}

.md-text {
 width: 47%;
}

.md-body {
  width: 50%;
  margin-left: 20px;
}
</style>
