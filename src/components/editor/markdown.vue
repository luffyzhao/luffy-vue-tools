<template>
    <div class="container">
        <codemirror :ref="uuid" v-model="data" :options="editor" class="input" :class="{open:!isPreview}"></codemirror>
        <div v-if="isPreview == true" class="preview">
            <div class="markdown-body" v-html="input"/>
        </div>
    </div>
</template>

<script>
  import {codemirror} from 'vue-codemirror'
  import { debounce } from 'lodash';
  import editor from '@/modules/editor.js';
  import {initMarkdown} from '@/modules/markdown.js'
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/addon/lint/lint.css';
  import 'prismjs/themes/prism.css';

  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  export default {
    name: 'markdown',
    components: {
      codemirror
    },
    data() {
      return {
        editor,
        data: '',
        input: '',
        markdown: initMarkdown(),
        isPreview: true,
        uuid: guid()
      }
    },
    watch: {
      isPreview(value){
        if (value) {
          this.input = this.markdown.render(this.code);
        }
      },
      data(value) {
        if (this.isPreview) {
          this.input = this.markdown.render(value);
        }
      },
      methods: {
      }
    },
  }
</script>

<style lang="scss" scoped>
    @import "../../style/markdown";
    .container {
        display: flex;
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .input,
    .preview {
        flex-basis: 50%;
        width: 50%;
    }

    .input {
        transition: all 0.2s;
        &.open {
            flex-basis: 100%;
            width: 100%;
        }
        /deep/ .vue-codemirror,
        /deep/ .CodeMirror {
            height: 100%;
            width: 100%;
        }
    }
</style>