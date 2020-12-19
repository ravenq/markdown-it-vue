import 'highlight.js/styles/atom-one-light.css'
import hljs from 'highlight.js/lib/core'
import Htmlbars from 'highlight.js/lib/languages/htmlbars'
import Handlebars from 'highlight.js/lib/languages/handlebars'
import Css from 'highlight.js/lib/languages/css'
import Shell from 'highlight.js/lib/languages/shell'
import Bash from 'highlight.js/lib/languages/bash'
import C from 'highlight.js/lib/languages/c'
import Clike from 'highlight.js/lib/languages/c-like'
import Java from 'highlight.js/lib/languages/java'
import Python from 'highlight.js/lib/languages/python'
import Cpp from 'highlight.js/lib/languages/cpp'
import Csharp from 'highlight.js/lib/languages/csharp'
import Php from 'highlight.js/lib/languages/php'
import Sql from 'highlight.js/lib/languages/sql'
import R from 'highlight.js/lib/languages/r'
import Swift from 'highlight.js/lib/languages/swift'
import Go from 'highlight.js/lib/languages/go'
import Matlab from 'highlight.js/lib/languages/matlab'
import Ruby from 'highlight.js/lib/languages/ruby'
import Perl from 'highlight.js/lib/languages/perl'
import Objectivec from 'highlight.js/lib/languages/objectivec'
import Rust from 'highlight.js/lib/languages/rust'
import Dart from 'highlight.js/lib/languages/dart'
import Delphi from 'highlight.js/lib/languages/delphi'
import D from 'highlight.js/lib/languages/d'
import Kotlin from 'highlight.js/lib/languages/kotlin'
import Scala from 'highlight.js/lib/languages/scala'
import Sas from 'highlight.js/lib/languages/sas'
import Lisp from 'highlight.js/lib/languages/lisp'
import Lua from 'highlight.js/lib/languages/lua'
import Ada from 'highlight.js/lib/languages/ada'
import Fortran from 'highlight.js/lib/languages/fortran'
import Powershell from 'highlight.js/lib/languages/powershell'
import Vbscript from 'highlight.js/lib/languages/vbscript'
import VbscriptHtml from 'highlight.js/lib/languages/vbscript-html'
import Groovy from 'highlight.js/lib/languages/groovy'
import Julia from 'highlight.js/lib/languages/julia'
import JuliaRepl from 'highlight.js/lib/languages/julia-repl'
import Haskell from 'highlight.js/lib/languages/haskell'
import Actionscript from 'highlight.js/lib/languages/actionscript'
import Scheme from 'highlight.js/lib/languages/scheme'
import Typescript from 'highlight.js/lib/languages/typescript'
import Fsharp from 'highlight.js/lib/languages/fsharp'
import Prolog from 'highlight.js/lib/languages/prolog'
import Erlang from 'highlight.js/lib/languages/erlang'
import ErlangRepl from 'highlight.js/lib/languages/erlang-repl'
import Json from 'highlight.js/lib/languages/json'
import Ini from 'highlight.js/lib/languages/ini'

hljs.registerLanguage('json', Json)
hljs.registerLanguage('ini', Ini)
hljs.registerLanguage('handlebars', Handlebars)
hljs.registerLanguage('htmlbars', Htmlbars)
hljs.registerLanguage('css', Css)
hljs.registerLanguage('shell', Shell)
hljs.registerLanguage('bash', Bash)
hljs.registerLanguage('c-like', Clike)
hljs.registerLanguage('c', C)
hljs.registerLanguage('cpp', Cpp)
hljs.registerLanguage('java', Java)
hljs.registerLanguage('python', Python)
hljs.registerLanguage('csharp', Csharp)
hljs.registerLanguage('php', Php)
hljs.registerLanguage('sql', Sql)
hljs.registerLanguage('r', R)
hljs.registerLanguage('swift', Swift)
hljs.registerLanguage('go', Go)
hljs.registerLanguage('matlab', Matlab)
hljs.registerLanguage('ruby', Ruby)
hljs.registerLanguage('perl', Perl)
hljs.registerLanguage('objectivec', Objectivec)
hljs.registerLanguage('rust', Rust)
hljs.registerLanguage('dart', Dart)
hljs.registerLanguage('delphi', Delphi)
hljs.registerLanguage('d', D)
hljs.registerLanguage('kotlin', Kotlin)
hljs.registerLanguage('scala', Scala)
hljs.registerLanguage('sas', Sas)
hljs.registerLanguage('lisp', Lisp)
hljs.registerLanguage('lua', Lua)
hljs.registerLanguage('ada', Ada)
hljs.registerLanguage('fortran', Fortran)
hljs.registerLanguage('powershell', Powershell)
hljs.registerLanguage('vbscript', Vbscript)
hljs.registerLanguage('vbscript-html', VbscriptHtml)
hljs.registerLanguage('groovy', Groovy)
hljs.registerLanguage('julia', Julia)
hljs.registerLanguage('julia-repl', JuliaRepl)
hljs.registerLanguage('haskell', Haskell)
hljs.registerLanguage('actionscript', Actionscript)
hljs.registerLanguage('scheme', Scheme)
hljs.registerLanguage('typescript', Typescript)
hljs.registerLanguage('fsharp', Fsharp)
hljs.registerLanguage('prolog', Prolog)
hljs.registerLanguage('erlang', Erlang)
hljs.registerLanguage('erlang-repl', ErlangRepl)

const highlightPlugin = md => {
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const code = token.content
    const lang = token.info
    const langObj = hljs.getLanguage(lang)
    let cnt
    if (langObj) {
      cnt = hljs.highlight(lang, code).value
    } else {
      cnt = hljs.highlightAuto(code).value
    }
    
    return `<pre class="hljs"><code>${cnt}</code></pre>`
  }
}

export default highlightPlugin
