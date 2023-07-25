import { Loading } from "@/components/Loading";
import { fetchItemCategory } from "@/src/api";
import itemCategorys from '@/src/item-category.json';
import { useCallback, useEffect, useState } from "react";

function GetItemList({ offset, limit }: any) {
  const [itemsList, setItemsList] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const itemList = useCallback(async () => {
    setItemsList([]);
    setIsSuccess(true);
    const list: any[] = [];

    await Promise.all(itemCategorys.map(async (data: any) => {
      await fetchItemCategory({ name: data.category }).then(async (item) => {
        item.items = await item.items.filter(function (d: any) {
          return !data.exclude.includes(d.name);
        });
        list[data.sort] = item;
      });

    }));

    setItemsList(list);
    setIsSuccess(false);
  }, []);

  useEffect(() => {
    itemList();
  }, []);

  return {
    items: itemsList,
    isLoading: isSuccess
  }
}


export default function Items() {
  const { items, isLoading } = GetItemList({ offset: 0, limit: 100 });

  console.log(items);
  return (
    <>
      <div style={{ textAlign: 'center', width: '100%' }}>頁面施工中！！</div>
      {
        isLoading ?
          (<Loading />) :
          (
            <div>
              {items.map(function (item) {
                return (
                  <div key={item.id}>
                    <div><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.items[0].name}.png`} title={item.items[0].name} alt={item.items[0].name} />{item.name}</div>
                    {item.items.map(function (data: any) {
                      return (
                        <img key={data.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${data.name}.png`} title={data.name} alt={data.name} />
                      )
                    })}
                    <hr />
                  </div>
                )
              })}
            </div>
          )
      }
    </>
  )
}