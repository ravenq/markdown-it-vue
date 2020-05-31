import MarkdownItVueLight from './markdown-it-vue-light'

const install = function (Vue) {
  Vue.component(MarkdownItVueLight.name, MarkdownItVueLight)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

MarkdownItVueLight.install = install
export default MarkdownItVueLight
