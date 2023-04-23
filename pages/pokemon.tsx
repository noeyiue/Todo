//learn zustand

import Head from "next/head";
import { useRouter } from "next/router";
import { useGameStore } from "./store";

import getRandomNumber from "./api/RandomNum";
import Image from "next/image";
import { useRef } from "react";

import { IoIosHeart, IoIosHeartEmpty, IoIosHeartDislike } from "react-icons/io";

export default function pokemon() {
  const router = useRouter();
  const handleBackTodo = () => {
    router.push("/");
  };

  // const FetchPokemon = () => {
  //   const fetchPokemons = usePokemonStore((state) => state.fetchPokemons);
  //   const isFetching = usePokemonStore((state) => state.isFetching);
  //   const isFetched = usePokemonStore((state) => state.isFetched);

  //   if (isFetching) {
  //     return <p>Loading...</p>;
  //   }

  //   if (!isFetched) {
  //     return <button onClick={() => fetchPokemons()}>Start</button>;
  //   }

  //   return null;
  // };

  // const Pokemon = () => {
  //   const pokemons = usePokemonStore((state) => state.pokemons);
  //   const pokeNum = getRandomNumber();
  //   const isFetched = usePokemonStore((state) => state.isFetched);

  //   if (!isFetched || pokemons.length === 0) {
  //     return null;
  //   }
  //   const pokemon = pokemons[pokeNum - 1];

  //   return <>{pokemon.name}</>;
  // };

  interface GameLifeProps {
    life: number;
    score: number;
  }

  const GameLife = ({ life, score }: GameLifeProps) => {
    const hearts = Array.from({ length: life }, (_, index) => (
      <IoIosHeart color="red" fontSize="25px" key={index} />
    ));
    const loss_hearts = Array.from({ length: 3 - life }, (_, index) => (
      <IoIosHeartDislike color="gray" fontSize="25px" key={index} />
    ));

    return (
      <div className="flex items-center mb-2">
        {hearts}
        {loss_hearts}
        <p className="ml-2">score : {score}</p>
      </div>
    );
  };

  const PokeQuestion = () => {
    const pokeNum = getRandomNumber();
    const isFetched = useGameStore((state) => state.isFetched);
    const fetchQuestion = useGameStore((state) => state.fetchQPokemon);
    const pokemon = useGameStore((state) => state.pokemon);
    const life = useGameStore((state) => state.life);
    const score = useGameStore((state) => state.score);
    const skip = useGameStore((state) => state.skip);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleStartClick = () => {
      fetchQuestion(pokeNum);
    };

    if (isFetched) {
      const handleSkip = () => {
        if (skip > 0) {
          useGameStore.getState().reduceSkip(1);
          fetchQuestion(getRandomNumber());
        }
      };
      const checkAnswer = () => {
        if (inputRef.current) {
          const userAns: string = inputRef.current?.value.toLowerCase();
          const realAns: string = pokemon.name;
          if (userAns === realAns) {
            useGameStore.getState().addScore(1);
            fetchQuestion(getRandomNumber());
          } else {
            useGameStore.getState().lossLife(1);
            if (life == 0) {
              useGameStore.getState().endGame();
            }
          }
          inputRef.current.value = "";
        }
      };
      console.log(pokemon.name);

      return (
        <>
          <div className="flex">
            <Image
              src={pokemon.sprites.front_default}
              alt="Pokemon"
              width="100"
              height="100"
            />
            <Image
              src={pokemon.sprites.back_default}
              alt="Pokemon"
              width="100"
              height="100"
            />
          </div>
          <GameLife life={life} score={score} />
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              className="border border-gray-400 px-2 py-1 mx-0.5 flex-grow rounded"
              placeholder="Enter Pokemon Name"
            />
            <button
              onClick={checkAnswer}
              className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 mr-0.5 rounded"
            >
              Answer
            </button>
            <button
              onClick={handleSkip}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded"
            >
              Skip ({skip})
            </button>
          </div>
        </>
      );
    } else {
      return (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
          onClick={handleStartClick}
        >
          Start
        </button>
      );
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col items-center justify-center">
      <Head>
        <title>Pokemon Game</title>
      </Head>
      <div className="mx-auto max-w-md max-h-md shadow-2xl place-items-center w-3/4  p-7 rounded-lg bg-white">
        <h1 className="font-bold text-2xl">Pokemon Game</h1>
        <PokeQuestion />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleBackTodo}
          className="mt-5 px-10 py-1 rounded-md bg-slate-50 text-indigo-500"
        >
          Back to Todo
        </button>
      </div>
    </div>
  );
}
