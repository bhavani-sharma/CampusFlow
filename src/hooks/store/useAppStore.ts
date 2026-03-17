import { create } from 'zustand';
import type { User, Event } from '../types';

interface AppStore {
  user: User | null;
  events: Event[];
  setUser: (user: User | null) => void;
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  events: [],
  setUser: (user) => set({ user }),
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({
    events: [...state.events, event]
      .sort((a, b) =>
        new Date(a.scheduled_at!).getTime() -
        new Date(b.scheduled_at!).getTime()
      )
  })),
}));