import create, { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

type GameState = {
  submitted: number[];
  initState: () => void;
  clear: () => void;
  addSubmitted: (index: number) => number;
};

const createState: StateCreator<GameState> = (set, get) => ({
  initState: () => set({}),
  clear: () => set({}),
  submitted: [],
  addSubmitted: (number) => get().submitted.push(number),
});

export const useGame = create(persist(createState, { name: 'ywreunion-2022' }));
