// hooks/useCountries.js
import { useState, useEffect } from 'react';
import getAll from '../services/getAxios';

const useCountries = (searchValue, setSearchValue) => { // Añadido setSearchValue como argumento
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAll()
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los países:', error);
        setMessage('Error al cargar los países. Por favor, intenta de nuevo más tarde.');
      });
  }, []);

  useEffect(() => {
    const search = searchValue.toLowerCase();
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(search)
    );

    if (filtered.length > 10) {
      setMessage('Por favor, especifica más para reducir el número de países.');
      setFilteredCountries([]);
    } else if (filtered.length > 1) {
      setMessage('');
      setFilteredCountries(filtered);
    } else if (filtered.length === 1) {
      setMessage('');
      setFilteredCountries(filtered);
    } else {
      setMessage('No se encontraron coincidencias.');
      setFilteredCountries([]);
    }
  }, [searchValue, countries]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value); // Usando setSearchValue para actualizar el estado
  };

  const handleCountrySelect = (countryName) => {
    setSearchValue(countryName);
    setFilteredCountries(countries.filter(country => country.name.common === countryName));
  };

  return {
    countries,
    filteredCountries,
    message,
    handleInputChange,
    handleCountrySelect,
  };
};

export default useCountries;
