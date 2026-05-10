const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()
  await page.goto('http://localhost:5173/guide', { waitUntil: 'networkidle' })

  // 注入 CSS 提升截图可读性：纯深色底 + 提亮 muted 文字
  await page.addStyleTag({
    content: `
      /* 用纯深色背景替换带底图的半透明遮罩 */
      body, html { background-color: #1a1208 !important; }
      [style*="backgroundImage"] { background-image: none !important; }
      /* 遮罩层改为更纯的深色 */
      .bg-bg-main\\/80 { background-color: #0f0a05 !important; }
      /* 提亮 muted 文字（原 #9a8060 偏暗） */
      .text-text-muted { color: #c9b080 !important; }
      /* 面板边框加强 */
      .border-border-main { border-color: #6a5030 !important; }
      /* 面板背景加深对比 */
      .bg-bg-panel { background-color: #2a1f0e !important; }
      .bg-bg-card\\/40 { background-color: rgba(35, 26, 10, 0.85) !important; }
    `
  })
  await page.waitForTimeout(800)

  await page.screenshot({
    path: 'D:/tinaproject/SGame2/guide-fullpage.png',
    fullPage: true,
  })
  await browser.close()
  console.log('saved: D:/tinaproject/SGame2/guide-fullpage.png')
})()
