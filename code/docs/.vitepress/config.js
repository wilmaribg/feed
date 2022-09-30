export default {
  title: 'VitePress',
  description: 'Just playing around.',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: []
      },
      {
        text: 'Components',
        items: [
          { text: 'Avatar', link: '/ComponentAvatar' },
          { text: 'Bubble', link: '/ComponentBubble' },
          { text: 'Time Line', link: '/ComponentTimeline' },
          { text: 'Infinite Scroll', link: '/ComponentInfinitescroll' },
        ]
      }
    ]
  }
}