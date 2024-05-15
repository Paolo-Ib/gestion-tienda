
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchSku = (url) => {

const [data, setData ] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);  //Establece el "setIsloading" a TRUE
    try {
      const response = await axios.get(url);
      setData(response.data.data);
    }
      catch (err) {
        console.error("Error en la busqueda de datos", err);
        setError(err);
      }
      finally {
        setIsLoading(false); //  Set loading state to false after fetch (success or error)
      }

  
  };
  fetchData();
}, [])

//return { data, isLoading, error };
return data;
};
