import { useCallback, useEffect, useState } from "react";
import styles from './Pokedex.module.scss';
import { Card } from '../Card';
import { fetchPokemonList, fetchPokemonData } from '@/src/api';

export default function Pokedex() {

  const [pokemonsList, setPokemonsList] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);

  function ReGetData({ a = 0, b = 20 }) {
    setOffset(a);
    setLimit(b);
  }

  function GetData() {
    const gridData = useCallback(async () => {
      setPokemonsList([]);
      setIsSuccess(true);
      await fetchPokemonList({offset: offset, limit: limit}).then(async (data) => {
        const lists: any[] = [];

        await Promise.all(data.results.map(async (pokemon: any) => {
          const name = pokemon.name.toString();
          const p = await fetchPokemonData({name: name});
          lists[p.id] = p;
        }));
        setPokemonsList(lists);
        setIsSuccess(false);
      });
    }, [offset, limit]);

    useEffect(() => {
      gridData();
    }, [offset, limit]);

    return {
      pokemons: pokemonsList,
      isLoading: isSuccess
    }

  }

  const { pokemons, isLoading } = GetData();

  // TODO: Loading 做個圖片呈現
  let pokemonData;
  if (isLoading) {
    pokemonData = 'Loading ...';
  } else {
    pokemonData = pokemons.map(function (pokemon) {
      return (
        <Card pokemon={pokemon} key={pokemon.id} />
      )
    });
  }

  return (
    <>
      <div className={styles.area}>
        <div>地區</div>
        <div className={styles.areaList}>
          {/* TODO: 改迴圈 & 增加圖鑑 icon */}
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 0, b: 151 })}>關東</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 151, b: 100 })}>城都</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 251, b: 135 })}>豐原</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 386, b: 107 })}>神奧</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 493, b: 156 })}>合眾</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 649, b: 72 })}>卡洛斯</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 721, b: 88 })}>阿羅拉</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 809, b: 89 })}>伽勒爾</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 898, b: 7 })}>洗翠</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 905, b: 105 })}>帕底亞</div>
        </div>
      </div>
      <div className={styles.cardArea}>
        {pokemonData}
      </div>
    </>
  )
}
