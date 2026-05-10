import type { CountryState } from '../types/game'

export const QIN_INITIAL: CountryState = {
  id: 'qin', name: '秦',
  treasury: 60, food: 55, military: 70,
  popularSupport: 45, monarchPower: 75,
  nobleResistance: 40, scholarPrestige: 35,
  diplomaticCredit: 30, terror: 50, socialVitality: 50,
}

export const ZHAO_INITIAL: CountryState = {
  id: 'zhao', name: '赵',
  treasury: 50, food: 50, military: 65,
  popularSupport: 60, monarchPower: 55,
  nobleResistance: 45, scholarPrestige: 50,
  diplomaticCredit: 50, terror: 30, socialVitality: 55,
}

export const QI_INITIAL: CountryState = {
  id: 'qi', name: '齐',
  treasury: 80, food: 65, military: 40,
  popularSupport: 65, monarchPower: 50,
  nobleResistance: 35, scholarPrestige: 75,
  diplomaticCredit: 65, terror: 15, socialVitality: 70,
}

export const COUNTRY_MAP = { qin: QIN_INITIAL, zhao: ZHAO_INITIAL, qi: QI_INITIAL }
