<template>
    <div class="container" :ref="uuid+'-container'">
        <codemirror :ref="uuid" v-model="data" :options="editor" class="input" :class="{open:!isPreview}" @scroll="onScroll"></codemirror>
        <div v-if="isPreview == true" class="preview" :ref="uuid+'-markdown-body'">
            <div class="markdown-body" v-html="input"/>
        </div>
    </div>
</template>

<script>
  import {codemirror} from 'vue-codemirror'
  import { debounce } from 'lodash';
  import editor from '@/modules/editor.js';
  import {initMarkdown} from '@/modules/markdown.js'
  import StringMixin from '@/mixins/StringMixin'


  export default {
    name: 'markdown',
    components: {
      codemirror
    },
    mixins: [StringMixin],
    props: {
      value: {
        type: String,
        default: ''
      },
      preview: {
        type: Boolean,
        default: true
      },
      scroll: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        editor,
        data: this.value,
        input: '',
        markdown: initMarkdown(),
        isPreview: this.preview,
      }
    },
    methods: {
      onScroll(e){
        if(this.scroll && this.isPreview) {
          let ratio = (e.doc.scrollTop) / (e.doc.height - this.$refs[this.uuid + '-container'].clientHeight);
          let markdown = this.$refs[this.uuid + '-markdown-body'];
          markdown.scrollTop = markdown.clientHeight * ratio;
        }
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
      }
    },
  }
</script>

<style lang="scss">
    @import "../../style/markdown";
</style>
