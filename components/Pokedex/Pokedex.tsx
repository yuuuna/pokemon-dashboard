import { useCallback, useEffect, useState } from "react";
import styles from './Pokedex.module.scss';
import { Card } from '../Card';
import { fetchPokemonList, fetchPokemonData } from '@/src/api';

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

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);
  const { pokemons, isLoading } = GetPokemonList({ offset, limit });

  function ReGetPokemonList({ a = 0, b = 20 }) {
    setOffset(a);
    setLimit(b);
  }

  return (
    <>
      <div className={styles.area}>
        {/* <div>地區</div> */}
        <div className={styles.areaList}>
          {/* TODO: 改迴圈 & 增加圖鑑 icon */}
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 0, b: 151 })}>關東</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 151, b: 100 })}>城都</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 251, b: 135 })}>豐原</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 386, b: 107 })}>神奧</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 493, b: 156 })}>合眾</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 649, b: 72 })}>卡洛斯</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 721, b: 88 })}>阿羅拉</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 809, b: 89 })}>伽勒爾</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 898, b: 7 })}>洗翠</div>
          <div className={styles.areaItem} onClick={() => ReGetPokemonList({ a: 905, b: 105 })}>帕底亞</div>
        </div>
      </div>
      <div className={styles.cardArea}>
        {
          isLoading ?
            (`Loading ...`) :
            (pokemons.map(function (pokemon) {
              return (
                <Card pokemon={pokemon} key={pokemon.id} />
              )
            }))
        }
      </div>
    </>
  )
}
