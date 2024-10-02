import { useEffect, useState } from "react";
import axios from "axios";

const useFetchdata = (urlString) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(urlString)
      .then((res) => setData(res.data.data.map((e) => e.country)))
      .catch((err) => console.log(err));
  }, [urlString]);

  return data;
};

export default useFetchdata;
