import styles from './PokemonModal.module.scss';

/**
 * 取得 Pokemon 圖鑑編號(補 0)
 * @param id 
 * @returns 圖鑑編號
 */
function GetPokemonId(id: number) {
  let idString = '';
  if (id >= 1000) {
    idString = id.toString();
  } else {
    idString = ('00' + id.toString()).substr(-3);
  }
  return `#${idString}`;
}

/**
 * 取得 Pokemon 圖片路徑
 * @param id 
 * @returns string 路徑
 */
function GetPokemonImg(id: number) {
  const isNewLasts = (id >= 650);
  const spriteSource = (isNewLasts ? 'official-artwork' : 'dream-world');
  const spriteType = (isNewLasts ? '.png' : '.svg');
  const srcUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/' + spriteSource + '/' + id + spriteType;
  return srcUrl;
}

export default function PokemonModal({ pokemon, showModal, closeModal }: any) {

  if (!showModal) {
    return null;
  }
  console.log(pokemon);
  const { name, id, types, stats, sprites } = pokemon;
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

  const hasFemale = sprites.front_female ? true : false;
  const normalName = hasFemale ? '男生' : '一般';
  const shinyName = hasFemale ? '男生色違' : '色違';

  // 普通圖片資料
  const normalImageData = (
    <>
      {sprites.front_default ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>{normalName}(前)</span>
          <img className={styles.image} src={sprites.front_default} />
        </div>
      </>) : (<></>)}

      {sprites.back_default ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>{normalName}(後)</span>
          <img className={styles.image} src={sprites.back_default} />
        </div>
      </>) : (<></>)}

      {sprites.front_shiny ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>{shinyName}(前)</span>
          <img className={styles.image} src={sprites.front_shiny} />
        </div>
      </>) : (<></>)}

      {sprites.back_shiny ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>{shinyName}(後)</span>
          <img className={styles.image} src={sprites.back_shiny} />
        </div>
      </>) : (<></>)}
    </>
  )

  // 女生圖片資料
  const femaleImageData = hasFemale ? (
    <>
      {sprites.front_female ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>女生(前)</span>
          <img className={styles.image} src={sprites.front_female} />
        </div>
      </>) : (<></>)}

      {sprites.back_female ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>女生(後)</span>
          <img className={styles.image} src={sprites.back_female} />
        </div>
      </>) : (<></>)}

      {sprites.front_shiny_female ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>女生色違(前)</span>
          <img className={styles.image} src={sprites.front_shiny_female} />
        </div>
      </>) : (<></>)}

      {sprites.back_shiny_female ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>女生色違(後)</span>
          <img className={styles.image} src={sprites.back_shiny_female} />
        </div>
      </>) : (<></>)}
    </>
  ) : (null);

  const homeImageData = (
    <>
      {sprites.other.home.front_default ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>Home</span>
          <img className={styles.image} src={sprites.other.home.front_default} />
        </div>
      </>) : (<></>)}

      {sprites.other.home.front_female ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>Home 女生</span>
          <img className={styles.image} src={sprites.other.home.front_female} />
        </div>
      </>) : (<></>)}

      {sprites.other.home.front_shiny ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>Home 色違</span>
          <img className={styles.image} src={sprites.other.home.front_shiny} />
        </div>
      </>) : (<></>)}

      {sprites.other.home.front_shiny_female ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>Home 女生色違</span>
          <img className={styles.image} src={sprites.other.home.front_shiny_female} />
        </div>
      </>) : (<></>)}
    </>
  )

  const officialArtwork = (
    <>
      {sprites.other['official-artwork'].front_default ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>官圖</span>
          <img className={styles.image} src={sprites.other['official-artwork'].front_default} />
        </div>
      </>) : (<></>)}

      {sprites.other['official-artwork'].front_shiny ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>官圖色違</span>
          <img className={styles.image} src={sprites.other['official-artwork'].front_shiny} />
        </div>
      </>) : (<></>)}
    </>
  )

  const dreamImageData = (
    <>
      {sprites.other.dream_world.front_default ? (<>
        <div className={styles.pokemonImage}>
          <span className={styles.title}>夢世界</span>
          <img className={styles.image} src={sprites.other.dream_world.front_default} />
        </div>
      </>) : (<></>)}
    </>
  )

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent} >
          <div className={styles.modalHeader} >
            <div className={styles.close} onClick={closeModal}>
              ⓧ {showModal}
            </div>
            <span>{GetPokemonId(id)} / {pokemonName}</span>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.pokemonMain}>
              <div className={styles.mainImage}>
                <img src={GetPokemonImg(id)} alt={pokemonName} />
              </div>
              <div className={styles.mainInfo}>
                <div>
                  屬性：{types.map(function (item: any) {
                    return (
                      <span key={id + '-' + item.type.name}>
                        {item.type.name}、
                      </span>
                    )
                  })}
                </div>
                <div>
                  種族值：
                  {stats.map(function (stat: any) {
                    return (
                      <div key={id + '-' + stat.stat.name}>{stat.base_stat} / 600</div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={styles.pokemonImages}>
              {normalImageData}
              {femaleImageData}
              {homeImageData}
              {officialArtwork}
              {dreamImageData}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}