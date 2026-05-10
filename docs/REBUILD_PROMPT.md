# 《策问山河》复刻开发提示词

> 本文档是一份**完整的复刻开发指引**，用于在 Claude Code 里从零重新构建《策问山河》SGame2 这款战国策略卡牌游戏。将整份文档作为 prompt 贴给 Claude Code 即可启动开发流程。

---

## 一、项目定位

**名称**：策问山河（Strategy Over Mountains and Rivers）

**类型**：战国题材网页策略卡牌游戏 · 原创"战国竹简纸卷风"roguelike 策略界面

**目标体验**：参考《杀戮尖塔》的信息架构、卡牌交互感、节点地图推进感，但视觉完全原创（竹简、帛书、铜器、墨色纹理）。游戏时长每局 10-15 分钟，3 国可选，每国有独立事件链、独立结局池。

**核心玩法循环**：
```
回合开始 → 看国势数值 → 看敌国压力 → 打国策卡 → 做事件抉择 → 可能招募士人 → 敌国自动推进 → 推进事件链 → 结局判定 ...
```

---

## 二、技术栈（已验证可行）

- **React 18** + **TypeScript** + **Vite**（脚手架）
- **Zustand**（状态管理，单一 store + 可选的 meta store）
- **TailwindCSS 3**（样式，不要用 4，配置复杂）
- **React Router DOM**（页面路由）
- **Framer Motion**（轻量动画）
- **localStorage**（存档 + 跨局元进程，无后端）

---

## 三、给 Claude Code 的启动指令

完整对话开头用这段话启动：

> 我想从零构建一个叫《策问山河》的战国题材 React 网页策略卡牌游戏。
> 技术栈：Vite + React + TypeScript + Zustand + TailwindCSS + Framer Motion + React Router。
> 不需要后端，localStorage 存档。
> 请严格按下面的"需求文档"分阶段实施，每个阶段完成后告诉我并等待确认。
> 
> 开发工作流：
> 1. 先调用 brainstorming 技能，和我确认需求细节与设计决策
> 2. 写 spec 到 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
> 3. 调用 writing-plans 技能，写详细实施计划到 `docs/superpowers/plans/`
> 4. 用 subagent-driven-development 执行，每个 Task 派发 subagent，两阶段审查
> 5. 每次修改代码后立即 git add + git commit
> 6. 所有代码注释、数据内容、UI 文本用中文
> 
> 需求文档见下方。

---

## 四、需求文档（核心）

### 4.1 游戏架构（方案 A：扁平扩展）

单一 Zustand store + 数据驱动。三国事件链按 factionId 分组存于统一数据文件。引擎层纯函数，store 负责状态协调。

```
src/
  types/game.ts          # 全部类型定义
  data/
    countries.ts         # 三国起始数值
    advisors.ts          # 15 位士人
    cards.ts             # 51 张国策卡
    events.ts            # 三国事件链（24 节点）
    mapNodes.ts          # 地图节点（24 个）
    endings.ts           # 12 个结局
    enemies.ts           # 敌国初始数据
    flagLabels.ts        # flag 中文翻译
    statLabels.ts        # 数值中文翻译
    metaContent.ts       # 彩蛋史评
    assets.ts            # 资源路径常量
  engine/
    applyEffects.ts      # 数值变更
    applyEnemyEffects.ts # 敌国数值变更
    cardResolver.ts      # 卡牌执行
    eventResolver.ts     # 事件链节点查找
    enemyAI.ts           # 敌国每回合自动推进
    endingResolver.ts    # 两层结局判定
    endingReasoner.ts    # 命运之因叙事
    metaProgress.ts      # 元进程读写
    utils.ts             # shuffle / clamp / randomFrom
  store/
    gameStore.ts         # 主 store
    metaStore.ts         # 元进程 store
  components/
    ui/                  # Panel / StatRow / GameButton / Tag / CardFrame / SectionTitle / Tooltip / Modal
    StartPage.tsx
    GamePage.tsx
    GuidePage.tsx
    MetaProgressPage.tsx
    EndingPage.tsx
    CountryPanel.tsx
    AdvisorPanel.tsx
    EnemyPanel.tsx
    CardHand.tsx
    Card.tsx
    EventModal.tsx
    MapView.tsx
    BattleView.tsx
    LogPanel.tsx
    EndingReasonPanel.tsx
public/assets/
  backgrounds/  icons/  advisors/  map/  endings/  cards/
```

### 4.2 核心类型

```typescript
type FactionId = 'qin' | 'zhao' | 'qi'
type CardRarity = 'common' | 'rare' | 'legendary'
type NodeType = 'battle' | 'diplomacy' | 'talent' | 'crisis' | 'campaign'

interface CountryStats {
  treasury: number        // 国库
  food: number            // 粮草
  military: number        // 军力
  popularSupport: number  // 民心
  monarchPower: number    // 君权
  nobleResistance: number // 贵族阻力
  scholarPrestige: number // 士人声望
  diplomaticCredit: number // 外交信用
  terror: number          // 恐怖值
  socialVitality: number  // 社会活力
}

interface EnemyState {
  id: FactionId
  name: string
  military: number
  diplomacy: number
  vitality: number
}

interface Effect { stat: keyof CountryStats; delta: number }
interface EnemyEffect { stat: 'military' | 'diplomacy' | 'vitality'; delta: number }

interface Card {
  id: string
  title: string
  type: '内政' | '军事' | '外交' | '变法' | '特殊'
  rarity: CardRarity
  faction?: FactionId           // 空=通用
  cost: Partial<CountryStats>
  effects: Effect[]
  sideEffects: Effect[]
  enemyEffects?: EnemyEffect[]
  unlockedByDefault?: boolean    // false=需元进程解锁
  description?: string
}

interface EventChoice {
  text: string
  effects: Effect[]
  enemyEffects?: EnemyEffect[]
  setsFlags?: string[]
  clearsFlags?: string[]
}

interface EventChainNode {
  id: string
  faction: FactionId
  stageIndex: number   // 0-7
  title: string
  narrative: string
  nodeType: NodeType
  choices: EventChoice[]
}

interface Ending {
  id: string
  faction: FactionId | 'any'
  priority: number     // 0=崩坏, 1=核心, 2=兜底
  title: string
  description: string
  requiredFlags?: string[]
  forbiddenFlags?: string[]
  statConditions?: Partial<Record<keyof CountryStats, { min?: number; max?: number }>>
  enemyConditions?: Partial<Record<'military' | 'diplomacy' | 'vitality', { min?: number; max?: number }>>
}

interface Advisor {
  id: string
  name: string
  faction?: FactionId
  tags: ('法家' | '兵家' | '纵横家' | '儒家')[]
  immediateEffect: Effect[]
  passiveEffect: Effect[]        // 每回合自动生效
  risk: string
  unlocksCards: string[]
  unlockedByDefault?: boolean
}

interface GameState {
  saveVersion: number
  phase: 'start' | 'game' | 'ending'
  country: CountryStats & { id: FactionId; name: string }
  enemy: EnemyState
  year: number
  turn: number
  advisors: Advisor[]
  hand: Card[]
  deck: Card[]
  log: LogEntry[]
  flags: Record<string, boolean>
  eventChainIndex: number
  currentChainNode: EventChainNode | null
  endingId: string | null
  pendingAdvisor: Advisor | null
  showMap: boolean
}

interface MetaProgress {
  version: number
  completedRuns: number
  endingsUnlocked: string[]
  factionsCompleted: FactionId[]
  strongVictories: FactionId[]
  unlockedAdvisors: string[]
  unlockedCards: string[]
  showSecretEpilogue: boolean
}
```

### 4.3 三国分化

**固定敌对关系**：秦↔赵、赵↔秦、齐→秦

| 国家 | 路线 | 初始特点 | 敌国 |
|------|------|---------|------|
| 秦 | 长平攻势线 | 军力 70、君权 75、粮草 55（偏低）、恐怖 50（偏高） | 赵 (65/50/60) |
| 赵 | 长平守势线 | 均衡，军力 65、民心 60 | 秦 (70/30/65) |
| 齐 | 稷下与借粮线 | 国库 80、士人声望 75、军力 40 | 秦 (75/40/70) |

### 4.4 事件链（每国 8 阶段）

秦：商鞅余法 → 远交近攻 → 河东推进 → 白起出阵 → 长平合围 → 天下震动 → 六国震惧 → 国命结算  
赵：三家分晋 → 胡服骑射 → 接收上党 → 廉颇坚守 → 向齐借粮 → 换将之议 → 长平决战 → 国命结算  
齐：稷下养士 → 富国通商 → 合纵观望 → 是否借粮救赵 → 坐观秦赵 → 士论纷争 → 齐国抉择 → 国命结算

每个节点含 2 个选择，至少设置 1 个关键 flag。flag 命名约定：`{faction}_{event_key}`（如 `zhao_accepted_shangdang`）。

### 4.5 结局系统（每国 4 个，共 12 个）

**三层判定**（按优先级）：
1. **崩坏优先**：`nobleResistance >= 90` / `terror >= 85 && popularSupport <= 30` / `treasury <= 0 || food <= 0` → 强制崩坏结局
2. **核心结局**：按 flags + statConditions + enemyConditions 筛选 priority=1 的候选，取第一个匹配
3. **兜底**：priority=2 的平衡存续结局

**强势胜利结局**（解锁传奇卡）：
- 秦：天下归秦（需 `qin_annihilation` + military>=80 + 敌军<=30）
- 赵：邯郸存续（需 `zhao_lianpo_defense` + forbid `zhao_replaced_lianpo` + 敌国势<=60）
- 齐：稷下盛世（需 `qi_jixia_invest` + 士人声望>=70）

### 4.6 卡牌分布（51 张）

- 通用卡 12 张
- 对敌卡 6 张（斥候刺探、离间之策、边境袭扰、散布谣言、绝使断交、挑拨贵族）
- 秦专属 8 张、赵专属 6 张、齐专属 6 张
- 士人解锁卡 8 张（默认解锁）
- 元进程解锁传奇卡 3 张：一统符诏、合纵死盟、百家齐鸣
- 解锁士人专属卡 2 张：六国合纵（苏秦）、进谏之言（邹忌）

### 4.7 士人系统（15 位）

- **默认 12 位**：商鞅、吴起、张仪、孟子、荀子、范雎、李斯、乐毅、廉颇、白起、赵括、蔺相如
- **元进程解锁 3 位**：公孙衍（通关秦解锁）、苏秦（通关赵解锁）、邹忌（通关齐解锁）

每位士人结构：立即效果 + 长期效果（每回合生效）+ 风险提示 + 解锁 1 张专属卡。

### 4.8 敌国 AI（三数值模型）

- **army/diplomacy/vitality** 三数值
- 每回合自动推进：military +2~4，diplomacy -1~+2，vitality = 0.6×当前 + 0.4×(military×0.4 + diplomacy×0.3 + 随机 0-30)
- 压力事件：
  - `player.military < enemy.military - 30` → "边境告急"（扣军力、粮草）
  - `enemy.vitality >= 90` → "敌势滔天"（扣民心）

### 4.9 卡池与手牌机制

**关键设计决策**：手牌 4 张，每回合**从完整 CARDS 池重抽**（不消耗 deck），**永远保底至少 1 张资源卡**（粮草/国库）。

资源卡白名单：劝课农桑 / 耕战令 / 开仓赈粮 / 鼓励商贸 / 加征赋税

这避免了"抽不到资源卡前期崩盘"的问题。

### 4.10 结局因果展示

结局页必须有"**命运之因**"面板：
- 命中的关键选择（flag 中文翻译）
- 有意避开的选择（forbidden flag）
- 数值条件 ✓/✗ 对比
- 敌国态势 ✓/✗ 对比
- 拼装出叙事句："你选择了 X、Y；并避开了 Z；最终秦国天下归秦。"

集齐 12 结局解锁"太史公曰"彩蛋面板。

### 4.11 元进程解锁规则

存 `cewenshanhe_meta_v1`（与游戏存档 `cewenshanhe_save_v2` 分离）：
- 首次通关 {秦/赵/齐} → 解锁 {公孙衍/苏秦/邹忌}
- 达成强势胜利 → 解锁对应传奇卡
- 通关赵 → 苏秦的"六国合纵"卡
- 通关齐 → 邹忌的"进谏之言"卡
- 集齐 12 结局 → `showSecretEpilogue = true`

典藏阁页面 `/meta` 展示解锁进度（未解锁显示 `???`）。

### 4.12 视觉风格

**设计 token**（Tailwind theme extend）：
```
bg-main      #1a1208   深褐黑
bg-panel     #2a1f0e   暗褐
bg-card      #231a0a   卡牌底色
text-main    #e8d5a3   米白
text-muted   #9a8060   暗金灰
accent-gold  #c9a84c   暗金
accent-red   #8b2020   赭红
accent-green #4a7c59   竹青
accent-bronze #7a5c2e  铜器色
border-main  #4a3820   边框褐
```

字体：宋体栈 `"Source Han Serif", "Noto Serif SC", SimSun, serif`。

### 4.13 页面清单

- `/` StartPage — 三国选择 + 开始/继续/玩法/典藏阁/重置/彻底重开
- `/game` GamePage — 顶部状态栏（国家/回合/年份/敌国面板/地图按钮）+ 左侧 CountryPanel + 中央主舞台（事件或地图）+ 右侧 AdvisorPanel + 底部 CardHand（4 张）+ 右下角 LogPanel
- `/guide` GuidePage — 游戏玩法说明（分节讲解）
- `/meta` MetaProgressPage — 典藏阁（进度总览、结局收集、士人收藏、传奇卡）
- `/ending` EndingPage — 结局插画 + 描述 + 命运之因 + 国势终局 + 朝堂士人 + 关键抉择 + 太史公曰（如解锁）

### 4.14 美术资源（34+ 张 PNG，均为占位可替换）

- `backgrounds/`：start-bg / game-bg / battle-bg / ending-bg（1536×1024 横版）
- `icons/`：10 个数值图标 + 3 个国家图标（1024×1024）
- `map/`：5 个节点类型图标（1024×1024）
- `advisors/`：15 位士人竖版肖像（1024×1536）
- `endings/`：12 张结局插画（1536×1024 横版 3:2）

风格关键词：**战国竹简纸卷风，深褐/暗金/竹青/赭红配色，古朴压迫谋略感，无现代元素、无英文字符**。

---

## 五、实施阶段建议

建议分 **3 个大阶段** 开发，每阶段一个 spec + 一个 plan + subagent-driven 执行：

### 阶段 1：MVP 单人版（不含 AI 敌国）
- 类型系统、基础 UI 组件
- 三国数据、卡牌、事件、结局
- 引擎层、store、StartPage/GamePage/EndingPage
- SVG 占位资源
- 目标：能玩完整一局

### 阶段 2：AI 敌国 + 对抗
- EnemyState 类型 + enemies 数据 + enemyAI
- 卡牌扩展 enemyEffects
- 结局加 enemyConditions
- EnemyPanel、压力事件
- 目标：每局有真实对手

### 阶段 3：元进程 + 结局因果
- MetaProgress + metaStore
- 3 位解锁士人、5 张解锁卡
- EndingReasonPanel（命运之因）
- MetaProgressPage（典藏阁）
- 太史公曰彩蛋
- 目标：跨局激励 + 结局可理解

---

## 六、开发过程中的重要经验教训

把这些教训告诉 Claude Code，可以少踩很多坑：

1. **localStorage 存档版本号**：每次改 GameState 结构就升 SAVE_VERSION 并清档，不要写迁移函数（MVP 成本太高）。但元进程 localStorage key 独立，保留解锁记录。

2. **手牌抽卡不能依赖 deck 状态**：deck 会消耗到空，保底逻辑失效。正确做法是每回合从完整 CARDS 池重抽。

3. **全局保底逻辑**：每回合手牌必须有至少 1 张粮草/国库卡（白名单 5 张）。这是让秦国难度不劝退的关键。

4. **事件节点的 flag 命名必须严格一致**：events.ts 里的 `setsFlags` 和 endings.ts 的 `requiredFlags`/`forbiddenFlags` 用同样的字符串，拼错就永远触发不到。建议在 `flagLabels.ts` 里集中维护，代码中引用常量。

5. **TailwindCSS 版本**：用 3.x，不要用 4.x。Vite 默认初始化的 tailwind 可能选错版本。

6. **Vite public/ 目录**：图片放在 `public/assets/` 下，代码中引用 `/assets/xxx.png`（绝对路径），不要 import。开发时改图需硬刷新（Ctrl+Shift+R）。

7. **文件名 .png 还是 .svg**：初版用 SVG 占位，正式美术用 PNG 时记得同步改 `assets.ts` 和组件里硬编码的扩展名。

8. **中文 UI 要有统一翻译层**：数值名（treasury→国库）、flag（zhao_accepted_shangdang→接收上党扩土）、节点类型（diplomacy→外交）都要有翻译表。不要在 JSX 里硬编码中英混用。

9. **subagent 审查盲点**：spec-reviewer 和 code-reviewer 都是 haiku/sonnet 级，有时会把"规格设计有意的重复"误判为重复代码。遇到审查意见不合理时要直接拒绝，不要机械接受。

10. **endingResolver 传参顺序**：`resolveEnding(country, flags, enemy)` 这个三参数签名在重构时容易漏传 enemy，导致 TS 通过但运行时报错。

---

## 七、复刻交付物验收清单

开发完成后应能：

- [ ] `npm install && npm run dev` 一键启动，访问 http://localhost:5173
- [ ] 选任意国家能走完 8 个事件节点
- [ ] 手牌永远 4 张，每张都能看到消耗/主效果/副作用/对敌效果
- [ ] 顶部能看到敌国三数值面板
- [ ] 走到第 8 阶段后进入结局页，显示插画 + 命运之因 + 国势终局
- [ ] 崩坏条件能正确触发（比如恐怖拉满）
- [ ] 通关后能在典藏阁看到解锁进度
- [ ] 达成强势胜利后下一局卡池里出现传奇卡
- [ ] 集齐 12 结局后结局页出现太史公曰
- [ ] 主页有"彻底重开"按钮，能清空一切重开

---

## 八、可选进阶（如果精力充足）

这些是这次 v2 改进中**没做但值得做**的：

- **过牌机制**：每回合可以弃 1 张手牌抽 1 张（主动洗牌）
- **卡牌组合技**：某些卡连续打有 combo 加成
- **分叉事件链**：关键选择解锁额外 2-3 回合子剧情
- **背景音乐 + 翻卷轴音效**：古琴乐 + SFX，体验飞跃
- **长平之战章节化 BattleView**：campaign 类型节点独立全屏战报
- **更多国家**：楚、魏、燕、韩，难度阶梯

---

## 九、总体估时参考

按每天 2-4 小时开发：
- 阶段 1（MVP）：3-5 天
- 阶段 2（AI 对抗）：1-2 天
- 阶段 3（元进程 + 结局因果）：1-2 天
- 美术生成 + 接入：1 天（用 GPT Image 或其他 AI 绘图工具）
- **总计约 1 周可出完整版本**

---

## 十、最终提醒

- 每个阶段严格走 **brainstorm → spec → plan → subagent 执行 → 审查** 流程，不要跳步
- 每次改代码立即 git commit，方便回滚
- 中文文案比机制本身更重要，事件叙事要有古意、抉择要有张力
- 美术占位阶段用 SVG 题签风（深色底 + 金色字），不要做成纯白盒子
- 先把**单人 + 单国家**跑通，再扩展三国、敌国、元进程，不要一口气做全

**这是一款小而美的游戏，核心是"策略选择 + 叙事沉浸"，不要做成大型 RPG。保持 MVP 纪律。**
