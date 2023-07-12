import { useCallback, useEffect, useState } from "react";
import styles from './Pokedex.module.scss';
import { Card } from '../Card';
import { fetchPokemonList, fetchPokemonData } from '@/src/api';
import { Generations } from "../Generations";
import { Loading } from "../Loading";

function GetPokemonList({ offset, limit }: any) {
  const [pokemonsList, setPokemonsList] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const pokemonList = useCallback(async () => {
    setPokemonsList([]);
    setIsSuccess(true);
    await fetchPokemonList({ offset: offset, limit: limit }).then(async (item) => {
      const list: any[] = [];

      await Promise.all(item.results.map(async (data: any) => {
        const name = data.name.toString();
        const pokemon = await fetchPokemonData({ name: name });
        list[pokemon.id] = pokemon;
      }));

      setPokemonsList(list);
      setIsSuccess(false);
    });
  }, [offset, limit]);

  useEffect(() => {
    pokemonList();
  }, [offset, limit]);

  return {
    pokemons: pokemonsList,
    isLoading: isSuccess
  }
}

export default function Pokedex() {

  const [generationId, setGenerationId] = useState<number>(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);
  const { pokemons, isLoading } = GetPokemonList({ offset, limit });

  function ReGetPokemonList({ offset, limit, generationId }: any) {
    setOffset(offset);
    setLimit(limit);
    setGenerationId(generationId);
  }

  return (
    <>
      <Generations nowId={generationId} ReGetPokemonList={ReGetPokemonList} />
      {
        isLoading ?
          (<Loading />) :
          (
            <div className={styles.cardArea}>
              {pokemons.map(function (pokemon) {
                return (
                  <Card pokemon={pokemon} key={pokemon.id} />
                )
              })}
            </div>
          )
      }
    </>
  )
}
