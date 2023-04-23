import { create } from "zustand";

// interface PokemonState {
//   pokemons: {
//     name: string;
//     url: string;
//   }[];
//   isFetching: boolean;
//   isFetched: boolean;
//   fetchPokemons: () => Promise<void>;
// }

// export const usePokemonStore = create<PokemonState>((set) => ({
//   pokemons: [],
//   isFetching: false,
//   isFetched: false,
//   fetchPokemons: async () => {
//     set({ isFetching: true });
//     const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
//     const data = await response.json();
//     set({ pokemons: data.results, isFetching: false, isFetched: true }); // set isFetched to true when fetching ends
//   },
// }));

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
}

interface PokemonGame {
  pokemon: Pokemon;
  isFetched: boolean;
  score: number;
  life: number;
  skip: number;
  fetchQPokemon: (number: number) => Promise<void>;
  addScore: (by: number) => void;
  lossLife: (by: number) => void;
  reduceSkip: (by: number) => void;
  endGame: () => void;

}

export const useGameStore = create<PokemonGame>((set) => ({
  pokemon: {
    name: "",
    sprites: {
      front_default: "",
      back_default: "",
    },
  },
  score: 0,
  life: 3,
  skip: 3,
  isFetched: false,
  fetchQPokemon: async (number: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const data = await response.json();
    set({ pokemon: data, isFetched: true });
  },
  addScore: (by) => set((state) => ({ score: state.score + by })),
  lossLife: (by) => set((state) => ({ life: state.life - by })),
  reduceSkip: (by) => set((state) => ({ skip: state.skip - by})),
  endGame: () => set(() => ({ isFetched: false, score: 0, life: 3, skip: 3}))
}));
