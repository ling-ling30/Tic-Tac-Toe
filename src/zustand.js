import { create } from "zustand";

const useSquareStore = create((set) => ({
  squares: Array(9).fill(null),
  updateSquares: (newSquares) => set((state) => ({ squares: newSquares })),
  resetSquares: () => set((state) => ({ squares: Array(9).fill(null) })),
}));

export default useSquareStore;
