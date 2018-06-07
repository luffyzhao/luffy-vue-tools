import MarkdownIt from 'markdown-it';
import MarkdownItCheckbox from 'markdown-it-checkbox';
import MarkdownItFootnote from 'markdown-it-footnote';

import Prism from 'prismjs';
import 'prismjs/plugins/remove-initial-line-feed/prism-remove-initial-line-feed.min.js';
import 'prismjs/components/prism-markup-templating.min'

export const initMarkdown = () => {
  let markdown = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: true,
    langPrefix: 'language-',
    linkify: true,
    typographer: true,
    highlight: function(str, lang) {
      const language = !lang || lang === 'html' ? 'markup' : lang;
      try {
        if (!Prism.languages[language]) {
          require(`prismjs/components/prism-${language}.min.js`);
        }
        if (Prism.languages[language]) {
          return Prism.highlight(str, Prism.languages[language]);
        }
      } catch (__) {
        console.warn(__.message);
        return '';
      }

      return '';
    },
  });

  markdown
    .use(MarkdownItCheckbox, {
      idPrefix: 'checkbox_',
    })
    .use(MarkdownItFootnote);

  return markdown;
};