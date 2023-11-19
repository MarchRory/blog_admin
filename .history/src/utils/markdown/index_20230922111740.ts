export const mdEditorOpts = {
  height: 550,
  width: '90%',
  tab: '\t',
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
  },
}
