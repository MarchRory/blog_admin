export const mdEditorOpts = {
  height: 550,
  width: '90%',
  placeholder: 'Write Your Note Now!',
  toolbar: [
    'emoji',
    'headings',
    'bold',
    'italic',
    'strike',
    'line',
    'quote',
    'list',
    'ordered-list',
    'check',
    'outdent',
    'indent',
    'code',
    '|',
    'inline-code',
    'insert-after',
    'insert-before',
    'undo',
    'redo',
    'upload',
    'link',
    'table',
    'record',
    'edit-mode',
    'both',
    'preview',
    'fullscreen',
    'outline',
    'code-theme',
    'content-theme',
    'export',
    'devtools',
    'info',
    'help',
    'br',
  ],
  // 工具栏
  toolbarConfig: {
    pin: true,
  },
  // 字数统计
  counter: {
    enable: true,
    type: 'text', // 统计文本
  },
  // 大纲, 目录
  outline: {
    enable: true,
    position: 'right',
  },
  // 评论模式
  comment: {
    enable: true,
  },
  // 预览
  preview: {
    delay: 400,
    // 默认高亮语言
    hljs: {
      defaultLang: 'rrt',
      style: 'catppuccin-frappe',
    },
    markdown: {
      autoSpace: true,
      fixTermTypo: true,
      fixTermLink: true,
      paragraphBeginningSpace: true,
      mark: true,
    },
    theme: {
      current: 'WeChat',
    },
    // 数学公式配置
    math: {
      engine: 'KaTeX',
    },
    hint: {
      emojiPath: 'https://unpkg.com/vditor@1.8.3/dist/images/emoji',
      emojiTail: '<a href="https://ld246.com/settings/function" target="_blank">设置常用表情</a>',
      emoji: {
        sd: '💔',
        j: 'https://unpkg.com/vditor@1.3.1/dist/images/emoji/j.png',
      },
      parse: false,
      extend: [
        {
          key: '@',
          hint: (key) => {
            console.log(key)
            if ('vanessa'.indexOf(key.toLocaleLowerCase()) > -1) {
              return [
                {
                  value: '@Vanessa',
                  html: '<img src="https://avatars0.githubusercontent.com/u/970828?s=60&v=4"/> Vanessa',
                },
              ]
            }
            return []
          },
        },
        {
          key: '#',
          hint: (key) => {
            console.log(key)
            if ('vditor'.indexOf(key.toLocaleLowerCase()) > -1) {
              return [
                {
                  value: '#Vditor',
                  html: '<span style="color: #999;">#Vditor</span> ♏ 一款浏览器端的 Markdown 编辑器，支持所见即所得（富文本）、即时渲染（类似 Typora）和分屏预览模式。',
                },
              ]
            }
            return []
          },
        },
      ],
    },
  },
}
