import type { MapNode } from '../types/game'

export const MAP_NODES: MapNode[] = [
  // 秦
  { id: 'qin-m-0', faction: 'qin', stageIndex: 0, name: '商鞅余法', nodeType: 'crisis', description: '变法存续之争' },
  { id: 'qin-m-1', faction: 'qin', stageIndex: 1, name: '远交近攻', nodeType: 'diplomacy', description: '外交战略抉择' },
  { id: 'qin-m-2', faction: 'qin', stageIndex: 2, name: '河东推进', nodeType: 'battle', description: '军事扩张' },
  { id: 'qin-m-3', faction: 'qin', stageIndex: 3, name: '白起出阵', nodeType: 'talent', description: '名将启用' },
  { id: 'qin-m-4', faction: 'qin', stageIndex: 4, name: '长平合围', nodeType: 'campaign', description: '大战定局' },
  { id: 'qin-m-5', faction: 'qin', stageIndex: 5, name: '天下震动', nodeType: 'diplomacy', description: '战后外交' },
  { id: 'qin-m-6', faction: 'qin', stageIndex: 6, name: '六国震惧', nodeType: 'crisis', description: '合纵再起' },
  { id: 'qin-m-7', faction: 'qin', stageIndex: 7, name: '国命结算', nodeType: 'campaign', description: '国运终章' },

  // 赵
  { id: 'zhao-m-0', faction: 'zhao', stageIndex: 0, name: '三家分晋', nodeType: 'crisis', description: '立国之初' },
  { id: 'zhao-m-1', faction: 'zhao', stageIndex: 1, name: '胡服骑射', nodeType: 'talent', description: '军事改革' },
  { id: 'zhao-m-2', faction: 'zhao', stageIndex: 2, name: '接收上党', nodeType: 'diplomacy', description: '关键抉择' },
  { id: 'zhao-m-3', faction: 'zhao', stageIndex: 3, name: '廉颇坚守', nodeType: 'battle', description: '守势对峙' },
  { id: 'zhao-m-4', faction: 'zhao', stageIndex: 4, name: '向齐借粮', nodeType: 'diplomacy', description: '粮草危机' },
  { id: 'zhao-m-5', faction: 'zhao', stageIndex: 5, name: '换将之议', nodeType: 'crisis', description: '将领更迭' },
  { id: 'zhao-m-6', faction: 'zhao', stageIndex: 6, name: '长平决战', nodeType: 'campaign', description: '命运决战' },
  { id: 'zhao-m-7', faction: 'zhao', stageIndex: 7, name: '国命结算', nodeType: 'campaign', description: '国运终章' },

  // 齐
  { id: 'qi-m-0', faction: 'qi', stageIndex: 0, name: '稷下养士', nodeType: 'talent', description: '文化立国' },
  { id: 'qi-m-1', faction: 'qi', stageIndex: 1, name: '富国通商', nodeType: 'diplomacy', description: '经济路线' },
  { id: 'qi-m-2', faction: 'qi', stageIndex: 2, name: '合纵观望', nodeType: 'diplomacy', description: '外交立场' },
  { id: 'qi-m-3', faction: 'qi', stageIndex: 3, name: '是否借粮', nodeType: 'crisis', description: '援赵抉择' },
  { id: 'qi-m-4', faction: 'qi', stageIndex: 4, name: '坐观秦赵', nodeType: 'diplomacy', description: '是否介入' },
  { id: 'qi-m-5', faction: 'qi', stageIndex: 5, name: '士论纷争', nodeType: 'crisis', description: '内部分歧' },
  { id: 'qi-m-6', faction: 'qi', stageIndex: 6, name: '齐国抉择', nodeType: 'campaign', description: '最终定位' },
  { id: 'qi-m-7', faction: 'qi', stageIndex: 7, name: '国命结算', nodeType: 'campaign', description: '国运终章' },
]
