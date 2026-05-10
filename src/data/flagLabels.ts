export const FLAG_LABELS: Record<string, string> = {
  // 秦
  qin_reform:              '坚持商鞅变法',
  qin_diplomacy_isolate:   '采纳远交近攻',
  qin_advance_hedong:      '全力推进河东',
  qin_used_baiqi:          '任用白起为将',
  qin_annihilation:        '坑杀降卒歼灭赵军',
  // 赵
  zhao_military_reform:    '全力推行胡服骑射',
  zhao_accepted_shangdang: '接收上党扩土',
  zhao_lianpo_defense:     '支持廉颇坚守',
  zhao_borrowed_grain:     '向齐借粮续命',
  zhao_replaced_lianpo:    '换赵括为将',
  // 齐
  qi_jixia_invest:         '大力投资稷下学宫',
  qi_commerce:             '全力发展商贸',
  qi_lent_grain:           '借粮救赵遏秦',
  qi_intervened:           '出兵介入秦赵',
}

export function flagLabel(key: string): string {
  return FLAG_LABELS[key] ?? key
}
