const BASE = '/assets'

export const ASSETS = {
  backgrounds: {
    start:  `${BASE}/backgrounds/start-bg.png`,
    game:   `${BASE}/backgrounds/game-bg.png`,
    battle: `${BASE}/backgrounds/battle-bg.png`,
    ending: `${BASE}/backgrounds/ending-bg.png`,
  },
  icons: {
    treasury:        `${BASE}/icons/treasury.png`,
    food:            `${BASE}/icons/food.png`,
    military:        `${BASE}/icons/military.png`,
    popularSupport:  `${BASE}/icons/popular-support.png`,
    monarchPower:    `${BASE}/icons/monarch-power.png`,
    nobleResistance: `${BASE}/icons/noble-resistance.png`,
    scholarPrestige: `${BASE}/icons/scholar-prestige.png`,
    diplomaticCredit:`${BASE}/icons/diplomatic-credit.png`,
    terror:          `${BASE}/icons/terror.png`,
    socialVitality:  `${BASE}/icons/social-vitality.png`,
    qin:  `${BASE}/icons/qin.png`,
    zhao: `${BASE}/icons/zhao.png`,
    qi:   `${BASE}/icons/qi.png`,
  },
  advisors: (name: string) => `${BASE}/advisors/${name}.png`,
  mapNodes: {
    battle:    `${BASE}/map/node-battle.png`,
    diplomacy: `${BASE}/map/node-diplomacy.png`,
    talent:    `${BASE}/map/node-talent.png`,
    crisis:    `${BASE}/map/node-crisis.png`,
    campaign:  `${BASE}/map/node-campaign.png`,
  },
}
