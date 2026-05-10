import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Panel } from './ui/Panel'
import { GameButton } from './ui/GameButton'
import { SectionTitle } from './ui/SectionTitle'
import { Tag } from './ui/Tag'

export function GuidePage() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="min-h-screen p-6 md:p-10 relative"
      style={{ backgroundImage: 'url(/assets/backgrounds/start-bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-bg-main/80" />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6">
        {/* 标题 */}
        <div className="text-center py-4">
          <div className="text-text-muted tracking-widest mb-2">策问山河</div>
          <h1 className="font-serif text-4xl md:text-5xl text-accent-gold tracking-[0.3em] mb-2">游戏玩法</h1>
          <p className="text-text-muted text-sm md:text-base tracking-widest">一策可兴邦 · 一问定山河</p>
        </div>

        {/* 核心定位 */}
        <Panel>
          <SectionTitle>核心定位</SectionTitle>
          <p className="text-text-main leading-relaxed font-serif">
            这是一款战国策略卡牌游戏。你扮演战国末期（公元前 262 年）某一国的君主，
            通过 <span className="text-accent-gold">国策决定</span>、
            <span className="text-accent-gold">关键事件抉择</span>、
            <span className="text-accent-gold">人才招募</span>，
            与一个<span className="text-accent-red">活的敌国对手</span>博弈，引领国家走向不同结局。
          </p>
          <p className="text-sm text-text-muted mt-3 italic">
            通关解锁新士人、传奇卡与彩蛋，每次开局都有新期待。
          </p>
        </Panel>

        {/* 第一步：选择国家 */}
        <Panel>
          <SectionTitle>第一步 · 选择国家</SectionTitle>
          <p className="text-text-main mb-3">三国可选，各有不同路线与固定敌国：</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border border-border-main rounded p-3 bg-bg-card/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-serif text-3xl text-accent-gold">秦</span>
                <Tag color="red">虎狼之国</Tag>
              </div>
              <div className="text-xs text-text-muted mb-1">长平攻势线</div>
              <div className="text-sm text-text-main">军力 70、君权 75</div>
              <div className="text-xs text-accent-red mt-2">敌国：赵</div>
            </div>
            <div className="border border-border-main rounded p-3 bg-bg-card/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-serif text-3xl text-accent-gold">赵</span>
                <Tag color="bronze">胡服骑射</Tag>
              </div>
              <div className="text-xs text-text-muted mb-1">长平守势线</div>
              <div className="text-sm text-text-main">平衡发展</div>
              <div className="text-xs text-accent-red mt-2">敌国：秦</div>
            </div>
            <div className="border border-border-main rounded p-3 bg-bg-card/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-serif text-3xl text-accent-gold">齐</span>
                <Tag color="green">稷下繁华</Tag>
              </div>
              <div className="text-xs text-text-muted mb-1">稷下与借粮线</div>
              <div className="text-sm text-text-main">国库 80、士人声望 75</div>
              <div className="text-xs text-accent-red mt-2">敌国：秦</div>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3 italic">
            不同国家面对完全不同的事件链，长平之战的视角也截然不同
            —— 秦看"攻"、赵看"守"、齐看"是否介入"。
          </p>
        </Panel>

        {/* 第二步：敌国系统（新） */}
        <Panel>
          <SectionTitle>第二步 · 与敌国博弈</SectionTitle>
          <p className="text-text-main mb-3">
            顶部状态栏显示<span className="text-accent-red">敌国面板</span>，实时追踪敌国三项数值：
          </p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="border border-border-main rounded p-2 text-center bg-bg-card/40">
              <div className="text-accent-red font-serif">军力</div>
              <div className="text-xs text-text-muted mt-1">直接威胁你的国防</div>
            </div>
            <div className="border border-border-main rounded p-2 text-center bg-bg-card/40">
              <div className="text-accent-red font-serif">外交</div>
              <div className="text-xs text-text-muted mt-1">联盟能力与孤立程度</div>
            </div>
            <div className="border border-border-main rounded p-2 text-center bg-bg-card/40">
              <div className="text-accent-red font-serif">国势</div>
              <div className="text-xs text-text-muted mt-1">综合国力（结局关键）</div>
            </div>
          </div>
          <p className="text-sm text-text-main mb-2">
            <span className="text-accent-gold">敌国每回合自动变强</span>：军力 +2~4、外交波动、国势随之调整。不削弱它，它就会碾压你。
          </p>
          <div className="mt-3 border-l-2 border-accent-red pl-3 space-y-1 text-xs">
            <div className="text-accent-red font-serif">压力事件</div>
            <div className="text-text-main">· 若你的军力落后敌国 30 以上 → 触发<span className="text-accent-red">边境告急</span>（扣军力、粮草）</div>
            <div className="text-text-main">· 若敌国国势 ≥ 90 → 触发<span className="text-accent-red">敌势滔天</span>（民心大跌）</div>
          </div>
        </Panel>

        {/* 第三步：每回合三件事 */}
        <Panel>
          <SectionTitle>第三步 · 每回合做三件事</SectionTitle>

          <div className="mb-4">
            <div className="text-accent-gold font-serif mb-2">① 查看国势</div>
            <p className="text-sm text-text-main mb-2">左侧面板显示 10 个自身国势数值：</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-xs">
              <div className="text-text-main"><span className="text-accent-gold">国库</span> / 粮草 / 军力</div>
              <div className="text-text-main"><span className="text-accent-gold">民心</span> / 君权 / 贵族阻力</div>
              <div className="text-text-main"><span className="text-accent-gold">士人声望</span> / 外交信用</div>
              <div className="text-text-muted col-span-2 md:col-span-3 italic mt-1">· 恐怖值 / 社会活力（风险指标）</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-accent-gold font-serif mb-2">② 做事件抉择</div>
            <p className="text-sm text-text-main">
              中央弹窗显示当前历史阶段事件（如秦"商鞅余法"、赵"接收上党"、齐"是否借粮救赵"），
              选项会<span className="text-accent-green">改变双方数值</span>、
              记录<span className="text-accent-gold">关键标记</span>（影响后续结局）。
            </p>
          </div>

          <div>
            <div className="text-accent-gold font-serif mb-2">③ 打一张国策卡</div>
            <p className="text-sm text-text-main mb-2">底部 3 张手牌选 1 张执行。每张卡显示：</p>
            <ul className="text-sm text-text-main space-y-1 list-disc list-inside">
              <li><span className="text-text-muted">消耗</span>（如"需要国库 20"）</li>
              <li><span className="text-accent-green">主效果</span>（自身正向）</li>
              <li><span className="text-accent-red">副作用</span>（自身负向）</li>
              <li><span className="text-accent-red">对敌效果</span>（削弱敌国）</li>
              <li className="text-text-muted italic">消耗不够的卡会置灰</li>
            </ul>
          </div>
        </Panel>

        {/* 第四步：卡牌类型（新，带对敌卡） */}
        <Panel>
          <SectionTitle>第四步 · 卡牌策略</SectionTitle>
          <p className="text-sm text-text-main mb-3">
            卡池共 <span className="text-accent-gold">51 张</span>，分四类：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <div className="text-accent-gold font-serif text-sm">通用内政卡（12）</div>
              <div className="text-xs text-text-muted mt-1">募兵令 / 开仓赈粮 / 加征赋税 等，调节自身数值</div>
            </div>
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <div className="text-accent-red font-serif text-sm">对敌卡（6 · 新）</div>
              <div className="text-xs text-text-muted mt-1">斥候刺探 / 离间之策 / 散布谣言 等，直接削弱敌国</div>
            </div>
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <div className="text-accent-gold font-serif text-sm">专属卡（20）</div>
              <div className="text-xs text-text-muted mt-1">秦 8 + 赵 6 + 齐 6，强势但有明显副作用</div>
            </div>
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <div className="text-accent-gold font-serif text-sm">士人解锁卡（13）</div>
              <div className="text-xs text-text-muted mt-1">士人投奔后才能抽到的强力牌</div>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3 italic">
            部分军事卡（如白起出征、歼灭令）有额外对敌效果，一张牌两手收益。
          </p>
        </Panel>

        {/* 第五步：士人招募 */}
        <Panel>
          <SectionTitle>第五步 · 士人招募</SectionTitle>
          <p className="text-sm text-text-main mb-3">
            每回合有 <span className="text-accent-gold">20% 概率</span>某位士人来投奔。
            默认 12 位士人覆盖四个学派：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <Tag color="red">法家</Tag>
              <div className="text-sm text-text-main mt-1">商鞅、李斯 —— 强化君权、变法</div>
            </div>
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <Tag color="bronze">兵家</Tag>
              <div className="text-sm text-text-main mt-1">吴起、廉颇、白起、赵括、乐毅 —— 军力</div>
            </div>
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <Tag color="gold">纵横家</Tag>
              <div className="text-sm text-text-main mt-1">张仪、范雎、蔺相如 —— 外交</div>
            </div>
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <Tag color="green">儒家</Tag>
              <div className="text-sm text-text-main mt-1">孟子、荀子 —— 民心、士人声望</div>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3 italic">
            每位士人有立即效果、长期效果、解锁专属国策卡，以及风险提示（如白起会让恐怖值飙升）。
            另有 3 位<span className="text-accent-gold">解锁士人</span>通过通关获取（见第七节）。
          </p>
        </Panel>

        {/* 第六步：8 阶段历史进程 */}
        <Panel>
          <SectionTitle>第六步 · 8 阶段历史进程</SectionTitle>
          <p className="text-sm text-text-main mb-3">每国的故事是一条 8 节点的线性历史推进：</p>
          <div className="space-y-3">
            <div>
              <div className="text-accent-gold font-serif mb-1">秦国</div>
              <div className="text-xs text-text-main leading-relaxed">
                商鞅余法 → 远交近攻 → 河东推进 → 白起出阵 → 长平合围 → 天下震动 → 六国震惧 → 国命结算
              </div>
            </div>
            <div>
              <div className="text-accent-gold font-serif mb-1">赵国</div>
              <div className="text-xs text-text-main leading-relaxed">
                三家分晋 → 胡服骑射 → 接收上党 → 廉颇坚守 → 向齐借粮 → 换将之议 → 长平决战 → 国命结算
              </div>
            </div>
            <div>
              <div className="text-accent-gold font-serif mb-1">齐国</div>
              <div className="text-xs text-text-main leading-relaxed">
                稷下养士 → 富国通商 → 合纵观望 → 是否借粮救赵 → 坐观秦赵 → 士论纷争 → 齐国抉择 → 国命结算
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3 italic">
            点右上"山河图"查看当前阶段。地图无法自由选路线 —— 这是历史进程可视化。
          </p>
        </Panel>

        {/* 第七步：结局判定 */}
        <Panel>
          <SectionTitle>第七步 · 结局判定（三层）</SectionTitle>

          <div className="mb-4">
            <div className="text-accent-red font-serif mb-2">第 1 层 · 崩坏判定（随时触发）</div>
            <ul className="text-sm text-text-main space-y-1 list-disc list-inside">
              <li>贵族阻力 ≥ 90 → 贵族反扑崩坏</li>
              <li>恐怖值 ≥ 85 且 民心 ≤ 30 → 暴政崩坏</li>
              <li>国库或粮草 ≤ 0 → 国力枯竭</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="text-accent-gold font-serif mb-2">第 2 层 · 核心结局（走到第 8 阶段）</div>
            <p className="text-sm text-text-main">
              根据你的<span className="text-accent-gold">关键选择</span> + <span className="text-accent-gold">自身数值</span> +
              <span className="text-accent-red">敌国数值</span>共同决定结局。每国各有 4 个。
            </p>
            <p className="text-xs text-text-muted mt-2 italic">
              例：秦"天下归秦"需要<span className="text-accent-red"> 敌国军力 ≤ 30 </span>且自身军力 ≥ 80 —— 必须真正把赵打垮才能一统。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <div className="text-accent-gold font-serif mb-1">秦</div>
              <div className="text-text-main">天下归秦 / 惨胜长平</div>
              <div className="text-text-main">战略僵持 / 虎狼之末</div>
            </div>
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <div className="text-accent-gold font-serif mb-1">赵</div>
              <div className="text-text-main">邯郸存续 / 长平惨败</div>
              <div className="text-text-main">借粮续命 / 赵氏黄昏</div>
            </div>
            <div className="border border-border-main rounded p-2 bg-bg-card/40">
              <div className="text-accent-gold font-serif mb-1">齐</div>
              <div className="text-text-main">稷下盛世 / 富国称雄</div>
              <div className="text-text-main">坐观悔恨 / 东海黯落</div>
            </div>
          </div>

          <div className="mt-4 border-l-2 border-accent-gold pl-3">
            <div className="text-accent-gold font-serif mb-1">命运之因</div>
            <p className="text-xs text-text-main leading-relaxed">
              结局页会展示<span className="text-accent-gold">完整因果</span>：你命中了哪些关键选择、避开了哪些路线、
              数值条件和敌国态势是否达标 —— 让每次结局都可理解、可复盘。
            </p>
          </div>
        </Panel>

        {/* 第八步：战后解锁系统（新） */}
        <Panel>
          <SectionTitle>第八步 · 战后解锁系统</SectionTitle>
          <p className="text-sm text-text-main mb-3">
            游戏有跨局<span className="text-accent-gold">典藏阁</span>系统，通关会永久解锁新内容：
          </p>
          <div className="space-y-2 text-sm">
            <div className="border-l-2 border-accent-gold pl-3">
              <span className="text-accent-gold font-serif">首次通关某国</span>
              <span className="text-text-main"> → 解锁该国对应的额外士人（公孙衍 / 苏秦 / 邹忌）</span>
            </div>
            <div className="border-l-2 border-accent-gold pl-3">
              <span className="text-accent-gold font-serif">达成强势胜利结局</span>
              <span className="text-text-main"> → 解锁对应传奇卡</span>
              <div className="text-xs text-text-muted mt-1">
                秦"天下归秦" → 一统符诏 · 赵"邯郸存续" → 合纵死盟 · 齐"稷下盛世" → 百家齐鸣
              </div>
            </div>
            <div className="border-l-2 border-accent-red pl-3">
              <span className="text-accent-red font-serif">集齐全部 12 个结局</span>
              <span className="text-text-main"> → 解锁<span className="text-accent-red">太史公曰</span>彩蛋（史书式结语）</span>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3 italic">
            在主页点"典藏阁"按钮随时查看收集进度。解锁的士人和卡会自动进入下一局的池子。
          </p>
        </Panel>

        {/* 存档说明 */}
        <Panel>
          <SectionTitle>存档与重开</SectionTitle>
          <ul className="text-sm text-text-main space-y-2 list-disc list-inside">
            <li><span className="text-accent-gold">自动保存</span> —— 每步都写入浏览器本地，关掉再开可继续</li>
            <li><span className="text-accent-gold">重置存档</span> —— 只清当前进度，保留典藏阁解锁记录</li>
            <li><span className="text-accent-red">彻底重开</span> —— 清掉一切（含典藏阁），从零开始</li>
          </ul>
        </Panel>

        {/* 策略要点 */}
        <Panel>
          <SectionTitle>策略要点</SectionTitle>
          <ol className="text-sm text-text-main space-y-2 list-decimal list-inside">
            <li><span className="text-accent-gold">数值平衡很重要</span> —— 军力爆炸但民心崩盘，会直接触发崩坏结局</li>
            <li><span className="text-accent-gold">关键选择是隐形分支</span> —— 事件选择决定结局池，数值只决定池中选哪个</li>
            <li><span className="text-accent-red">不能忽视敌国</span> —— 敌国每回合都在变强，要主动用对敌卡或关键事件削弱</li>
            <li><span className="text-accent-gold">士人是放大器</span> —— 专属士人（秦之商鞅、赵之廉颇等）对本国路线有决定性影响</li>
            <li><span className="text-accent-gold">恐怖值是双刃剑</span> —— 秦国需要它震慑六国，但高恐怖 + 低民心会崩盘</li>
            <li><span className="text-accent-gold">多玩几局</span> —— 先通关一国解锁新内容，后续局的卡池和士人池会越来越丰富</li>
          </ol>
        </Panel>

        {/* 推荐第一局 */}
        <Panel>
          <SectionTitle>推荐第一局</SectionTitle>
          <p className="text-sm text-text-main leading-relaxed">
            <span className="text-accent-gold font-serif">选赵国走守势线</span>：
            胡服骑射 → 接收上党 → 支持廉颇坚守 → 向齐借粮 → 坚持不换将 → 冲"邯郸存续"结局。
            这是最能体会事件链机制 + 敌国压力的路线，通关后还能解锁苏秦与合纵死盟。
          </p>
          <p className="text-xs text-text-muted mt-3 italic">
            游戏节奏快，一局 10-15 分钟，失败后可以立刻"重返主页"开下一局。
          </p>
        </Panel>

        {/* 返回按钮 */}
        <div className="flex justify-center py-4">
          <GameButton onClick={() => navigate('/')}>返回主页</GameButton>
        </div>
      </div>
    </motion.div>
  )
}
