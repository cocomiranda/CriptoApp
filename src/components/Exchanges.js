import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const params = useParams();

  useEffect(() => {
    (async () => {
      const url =
        "https://api.coinstats.app/public/v1/markets?coinId=" + params.name;
      // console.log(cripto);
      // const ticker = tick + "/USDT";
      const response = await fetch(url);
      const data = await response.json();
      console.log({ EXHANGES: data });
    })();
  }, []);

  return <div>{params.name}</div>;
};
