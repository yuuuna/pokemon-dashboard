import styles from './Generations.module.scss';
import generations from '@/src/generations.json';

export default function Generations({ nowId, ReGetPokemonList }: any) {
  return (
    <div className={styles.area}>
      <div className={styles.areaList}>
        {(generations.map(function (generation) {
          return (
            <div className={styles.areaItem + ' ' + (nowId == generation.id ? styles.clicked : (''))} onClick={() => ReGetPokemonList({ offset: generation.offset, limit: generation.limit, generationId: generation.id })} key={generation.id}>{generation.name}</div>
          );
        }))}
      </div>
    </div>
  )
}