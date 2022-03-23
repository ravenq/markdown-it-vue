import MarkdownItVueMinimal from './markdown-it-vue-minimal'

const install = function (Vue) {
  Vue.component(MarkdownItVueMinimal.name, MarkdownItVueMinimal)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

MarkdownItVueMinimal.install = install
export default MarkdownItVueMinimal
