# 策问山河 SGame2

战国题材网页策略游戏 MVP，原创"战国竹简纸卷风 roguelike 策略界面"。

🎮 **在线试玩**：https://warring-states-game.vercel.app  
📦 **GitHub**：https://github.com/Tina2088/warring-states-game

## 项目定位
- 单机网页策略游戏，不需联网、不需登录、不需后端
- localStorage 存档
- 三国可选（秦/赵/齐），各有独立事件链与结局

## 技术栈
React + TypeScript + Vite + Zustand + TailwindCSS + Framer Motion + React Router

## 如何运行
```bash
cd SGame2
npm install
npm run dev
```

访问 http://localhost:5173

## 已实现内容
- 三国起始数值与国策卡分化（通用12 + 秦8 + 赵6 + 齐6 + 士人解锁8）
- 三国独立事件链（各8阶段，共24节点）
- 12位士人系统（含立即/长期效果、风险、解锁卡）
- 两层结局判定（flags 候选池 + 数值阈值 + 崩坏优先）
- 12 个结局（每国 4 个）
- 历史阶段推进地图（8 节点，阶段高亮）
- localStorage 存档（新游戏 / 继续 / 重置）

## 资源目录
```
public/assets/
  backgrounds/   # 场景背景 SVG
  icons/         # 数值/国家/节点图标 SVG
  advisors/      # 士人题签头像 SVG
  map/           # 地图节点样式 SVG
  cards/         # 卡牌边框 SVG（可选）
  ui/            # 通用 UI 边框 SVG（可选）
```

## 替换正式美术资源
所有资源路径集中在 `src/data/assets.ts`，保持文件名不变替换 SVG/PNG 即可。
士人立绘替换 `public/assets/advisors/{id}.svg` 为 PNG 后，同步更新 `AdvisorPanel` 的 img 扩展名。

## 扩展新士人 / 新卡牌 / 新事件
- 新士人：在 `src/data/advisors.ts` 追加 Advisor 对象，补充题签 SVG
- 新卡牌：在 `src/data/cards.ts` 追加 Card 对象；如需士人解锁，补 advisor.unlocksCards
- 新事件：在 `src/data/events.ts` 追加 EventChainNode，stageIndex 对齐 mapNodes
- 新结局：在 `src/data/endings.ts` 追加 Ending（注意 priority 冲突）

## UI 风格说明
原创战国 roguelike，主题为竹简、帛书、铜器、印章、墨色纹理。仅借鉴《杀戮尖塔》的信息架构、卡牌交互感、节点地图推进感，不使用其任何原始美术资源、图标、卡牌版式或角色设计。
