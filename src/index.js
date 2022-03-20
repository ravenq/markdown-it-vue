import MarkdownItVue from './markdown-it-vue'

const install = function (Vue) {
  Vue.component(MarkdownItVue.name, MarkdownItVue)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

MarkdownItVue.install = install
export default MarkdownItVue
