import { Loading } from "@/components/Loading";
import { fetchItemData, fetchItemList } from "@/src/api";
import { useCallback, useEffect, useState } from "react";

function GetItemList({ offset, limit }: any) {
  const [itemsList, setItemsList] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const itemList = useCallback(async () => {
    setItemsList([]);
    setIsSuccess(true);

    await fetchItemList({ offset: offset, limit: limit }).then(async (item) => {
      const list: any[] = [];

      await Promise.all(item.results.map(async (data: any) => {
        const name = data.name.toString();
        const dt = await fetchItemData({ name: name });
        list[dt.id] = dt;
      }));

      setItemsList(list);
      setIsSuccess(false);
    });


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
                  <img key={item.id} src={item.sprites.default} />
                )
              })}
            </div>
          )
      }
    </>
  )
}