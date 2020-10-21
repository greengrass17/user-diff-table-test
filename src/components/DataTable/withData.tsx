import React, { FC, useState, useEffect } from "react";
import api from "../../lib/api";

export type Item = {
  id: string;
  timestamp: number;
  diff: {
    oldValue: string;
    newValue: string;
  }[];
};

type Order = "desc" | "asc";

export interface DataComponentProps {
  data: Item[];
  fetchData: Function;
  order: Order;
  setOrder: Function;
}

function withData(Component: FC<DataComponentProps>) {
  return (props: object) => {
    const [data, setData] = useState<Item[]>([]);
    const [order, setOrder] = useState<Order>("desc");
    const sortByDate = (a: Item, b: Item) =>
      (order === "desc" ? 1 : -1) * (b.timestamp - a.timestamp);

    const fetchData = async () => {
      try {
        const result = await api.getUsersDiff();
        setData([...data, ...result.data].sort(sortByDate));
        return result.code;
      } catch (error) {
        throw error;
      }
    };

    useEffect(() => {
      setData([...data].sort(sortByDate));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]);

    return (
      <Component
        {...props}
        data={data}
        fetchData={fetchData}
        order={order}
        setOrder={setOrder}
      />
    );
  };
}

export default withData;
