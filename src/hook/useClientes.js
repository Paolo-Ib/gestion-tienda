import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ItemsClientes = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vQyiMIEpSsUKR76vuwGdNJInnIzE6lEOzY5Ua8k-yIsfhCx8JUDR-g2ikSU-YpGmGrSFvQ6of4kIdYz/pub?gid=1034370521&single=true&output=csv',
          { headers:  'no-cors' }  // Handle potential CORS issues
        );

        const parsedData = response.data
          .split('\n')
          .map((row, index) => {
            if (index === 0) {
              return row.split(',').map(header => header.trim().replace(/"/g, ''));
            }
            return row.split(',').map(value => value.trim().replace(/"/g, ''));
          });

        const headers = parsedData[0];
        const jsonData = parsedData.slice(1).map(row => {
          const formattedItem = {};
          row.forEach((value, index) => {
            formattedItem[headers[index]] = value; // Trim and remove quotes
          });
          return formattedItem;
        });

        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array for single fetch on component mount
  
  return data;
};








