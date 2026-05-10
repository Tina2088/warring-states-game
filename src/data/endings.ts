import type { Ending } from '../types/game'

export const ENDINGS: Ending[] = [
  // 秦国
  { id: 'qin-hegemony', faction: 'qin', priority: 1,
    title: '天下归秦', description: '长平一战，六国震惧。秦人以铁血征服，一统之势已成。',
    requiredFlags: ['qin_annihilation'], statConditions: { military: { min: 80 } },
    enemyConditions: { military: { max: 30 } } },
  { id: 'qin-pyrrhic', faction: 'qin', priority: 1,
    title: '惨胜长平', description: '虽胜而损，秦军元气大伤。白起功高，朝堂生隙。',
    requiredFlags: ['qin_used_baiqi'], forbiddenFlags: ['qin_annihilation'],
    statConditions: { military: { min: 40, max: 79 } },
    enemyConditions: { military: { max: 60 } } },
  { id: 'qin-stalemate', faction: 'qin', priority: 1,
    title: '战略僵持', description: '未行歼灭之策，秦赵陷入长期对峙。霸业之路曲折漫长。',
    forbiddenFlags: ['qin_annihilation'] },
  { id: 'qin-collapse', faction: 'qin', priority: 2,
    title: '虎狼之末', description: '变法失据，内外交困。秦国虽强，终未竟天下之业。' },

  // 赵国
  { id: 'zhao-heroic-defense', faction: 'zhao', priority: 1,
    title: '邯郸存续', description: '廉颇坚守有功，赵国得以保全。虽失上党，国祚延续。',
    requiredFlags: ['zhao_lianpo_defense'], forbiddenFlags: ['zhao_replaced_lianpo'],
    enemyConditions: { vitality: { max: 60 } } },
  { id: 'zhao-tragic-defeat', faction: 'zhao', priority: 1,
    title: '长平惨败', description: '赵括纸上谈兵，四十万赵军血染长平。赵国从此一蹶不振。',
    requiredFlags: ['zhao_replaced_lianpo'],
    enemyConditions: { military: { min: 70 } } },
  { id: 'zhao-diplomatic-survival', faction: 'zhao', priority: 1,
    title: '借粮续命', description: '齐粮解困，赵国勉强维系。虽失锋芒，尚存国本。',
    requiredFlags: ['zhao_borrowed_grain'] },
  { id: 'zhao-collapse', faction: 'zhao', priority: 2,
    title: '赵氏黄昏', description: '国力枯竭，内忧外患。赵之社稷，已临倾覆之危。' },

  // 齐国
  { id: 'qi-cultural-flourish', faction: 'qi', priority: 1,
    title: '稷下盛世', description: '百家争鸣，齐国文华冠绝诸侯。以礼乐而非刀兵称雄。',
    requiredFlags: ['qi_jixia_invest'], statConditions: { scholarPrestige: { min: 70 } } },
  { id: 'qi-merchant-power', faction: 'qi', priority: 1,
    title: '富国称雄', description: '临淄之富甲天下，商路通达四方。齐以商立国，独树一帜。',
    requiredFlags: ['qi_commerce'], statConditions: { treasury: { min: 80 } } },
  { id: 'qi-bystander-regret', faction: 'qi', priority: 1,
    title: '坐观悔恨', description: '秦强赵弱之后，齐国独木难支。悔未早救赵，已成孤国。',
    forbiddenFlags: ['qi_intervened'],
    enemyConditions: { vitality: { min: 80 } } },
  { id: 'qi-collapse', faction: 'qi', priority: 2,
    title: '东海黯落', description: '稷下学者星散，齐国内外失据。繁华落尽，国运飘摇。' },
]
