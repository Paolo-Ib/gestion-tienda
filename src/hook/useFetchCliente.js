import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchClientes  (url)  {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { headers: "no-cors" });

        const parsedData = response.data
        .split('\n')
        .map(row => row.split(','))
        //.filter((row, index) => index !==0);
        setData(parsedData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}


