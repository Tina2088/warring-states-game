import { create } from 'zustand'
import type { MetaProgress, FactionId } from '../types/game'
import { loadMeta, saveMeta, applyEndingToMeta, getDefaultMeta } from '../engine/metaProgress'

interface MetaStoreState {
  meta: MetaProgress
  reload: () => void
  applyEnding: (endingId: string, faction: FactionId) => void
  reset: () => void
}

export const useMetaStore = create<MetaStoreState>((set, get) => ({
  meta: loadMeta(),

  reload: () => set({ meta: loadMeta() }),

  applyEnding: (endingId, faction) => {
    const next = applyEndingToMeta(get().meta, endingId, faction)
    saveMeta(next)
    set({ meta: next })
  },

  reset: () => {
    const fresh = getDefaultMeta()
    saveMeta(fresh)
    set({ meta: fresh })
  },
}))
