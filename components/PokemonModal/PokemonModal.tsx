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

function GetPokemonTypeString(types: any) {
  let typeString = '';
  types.map((item: any) => {
    const typeName = GetPokemonTypeName(item.type.name);
    if (typeString === '') {
      typeString += typeName;
    } else {
      typeString += '、' + typeName;
    }
  });
  return typeString;
}

/**
 * 取得屬性名稱
 * @param typeId 
 * @returns 
 */
function GetPokemonTypeName(typeId: string) {
  let typeName = typeId;
  switch (typeId) {
    case 'normal':
      typeName = '一般';
      break;
    case 'fighting':
      typeName = '格鬥';
      break;
    case 'flying':
      typeName = '飛行';
      break;
    case 'poison':
      typeName = '毒';
      break;
    case 'ground':
      typeName = '地面';
      break;
    case 'rock':
      typeName = '岩石';
      break;
    case 'bug':
      typeName = '蟲';
      break;
    case 'ghost':
      typeName = '幽靈';
      break;
    case 'steel':
      typeName = '鋼';
      break;
    case 'fire':
      typeName = '火';
      break;
    case 'water':
      typeName = '水';
      break;
    case 'grass':
      typeName = '草';
      break;
    case 'electric':
      typeName = '電';
      break;
    case 'psychic':
      typeName = '超能';
      break;
    case 'ice':
      typeName = '冰';
      break;
    case 'dragon':
      typeName = '龍';
      break;
    case 'dark':
      typeName = '暗';
      break;
    case 'fairy':
      typeName = '妖精';
      break;
  }
  return typeName;
}

/**
 * 取得種族值類型名稱
 * @param statId 
 * @returns 名稱
 */
function GetPokemonStatName(statId: string) {
  let statName = '';
  switch (statId) {
    case 'hp':
      statName = 'HP';
      break;
    case 'attack':
      statName = '攻擊';
      break;
    case 'defense':
      statName = '防禦';
      break;
    case 'special-attack':
      statName = '特攻';
      break;
    case 'special-defense':
      statName = '特防';
      break;
    case 'speed':
      statName = '速度';
      break;
  }
  return statName;
}

export default function PokemonModal({ pokemon, showModal, closeModal }: any) {

  if (!showModal) {
    return null;
  }
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

  // Home 圖片資料
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

  // 官方圖片資料
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

  // 夢世界圖片資料
  // const dreamImageData = (
  //   <>
  //     {sprites.other.dream_world.front_default ? (<>
  //       <div className={styles.pokemonImage}>
  //         <span className={styles.title}>夢世界</span>
  //         <img className={styles.image} src={sprites.other.dream_world.front_default} />
  //       </div>
  //     </>) : (<></>)}
  //   </>
  // )

  return (
    <>
      <div className={styles.modal + ` type-${types[0].type.name}`}>
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
                <div className={styles.type}>
                  屬性：
                  {GetPokemonTypeString(types)}
                </div>
                <div>
                  <table className={styles.statsTable} border={1}>
                    <thead>
                      <tr>
                        <td colSpan={3} style={{ textAlign: 'center' }}>種族值</td>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.map(function (stat: any) {
                        return (
                          <tr key={id + '-' + stat.stat.name} className={`stat-${stat.stat.name}`}>
                            <td style={{ width: '60px' }}>{GetPokemonStatName(stat.stat.name)}：</td>
                            <td style={{ width: '50px' }}>{stat.base_stat}</td>
                            <td >
                              <div className={styles.statBg}>
                                <div className={styles.statBar} style={{ width: `calc(100% * (${stat.base_stat} / 255))` }}>&nbsp;
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className={styles.pokemonImages}>
              {normalImageData}
              {femaleImageData}
              {homeImageData}
              {officialArtwork}
              {/* {dreamImageData} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}