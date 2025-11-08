novel-reader/
├── src/
│   ├── components/
│   │   ├── novel/
│   │   │   ├── NovelLayout.vue              # 主布局容器
│   │   │   ├── Sidebar.vue                  # 侧边导航栏
│   │   │   ├── ReadingSettings.vue          # 阅读设置面板
│   │   │   ├── ReadingProgress.vue          # 阅读进度组件
│   │   │   ├── BottomControls.vue           # 底部控制栏
│   │   │   ├── ShortcutsHelp.vue            # 快捷键帮助
│   │   │   └── CommentsSection.vue          # 评论互动组件
│   │   └── shared/
│   │       ├── MobileHeader.vue             # 移动端头部
│   │       ├── ErrorBoundary.vue            # 错误边界组件
│   │       ├── LoadingSpinner.vue           # 加载指示器
│   │       └── SkeletonLoader.vue           # 骨架屏
│   ├── views/
│   │   ├── ReaderView.vue                   # 阅读视图
│   │   ├── OutlineView.vue                  # 小说大纲视图
│   │   ├── CharactersView.vue               # 角色介绍视图
│   │   ├── StartPage.vue                    # 开始页面
│   │   └── WorldView.vue                    # 世界观视图
│   ├── composables/
│   │   ├── useReadingStats.js               # 阅读统计逻辑
│   │   ├── useKeyboardShortcuts.js          # 键盘快捷键
│   │   ├── useReadingSettings.js            # 阅读设置逻辑
│   │   ├── useBookmarks.js                  # 书签管理
│   │   ├── useMobileMenu.js                 # 移动端菜单
│   │   ├── useChapterNavigation.js          # 章节导航
│   │   ├── useErrorHandler.js               # 错误处理
│   │   ├── useAnimations.js                 # 动画效果
│   │   └── useComments.js                   # 评论管理
│   ├── data/
│   │   ├── novelInfo.js                     # 小说元信息
│   │   ├── chapters.js                      # 章节内容
│   │   └── characters.js                    # 角色数据
│   ├── utils/
│   │   ├── fonts.js                         # 字体配置管理
│   │   └── storage.js                       # 本地存储封装
│   ├── App.vue                              # 根组件
│   └── main.js                              # 应用入口
├── package.json                             # 项目依赖和脚本
├── vite.config.js                           # Vite构建配置
├── tailwind.config.js                       # Tailwind CSS配置
├── postcss.config.js                        # PostCSS配置
├── index.css                                # 全局样式
└── index.html                               # HTML入口文件
