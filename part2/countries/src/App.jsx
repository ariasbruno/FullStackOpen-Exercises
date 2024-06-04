// App.jsx
import { useState } from 'react';
import useCountries from './hooks/useCountries';
import CountriesResponse from './components/Countries';
import CountryList from './components/CountryList';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const {
    countries,
    filteredCountries,
    message,
    handleInputChange,
    handleCountrySelect,
  } = useCountries(searchValue, setSearchValue);

  return (
    <div>
      Find countries:
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Filtrar países..."
      />
      {message && <p>{message}</p>}
      {filteredCountries.length === 1 ? (
        // Asegúrate de que filteredCountries[0] exista antes de renderizar CountriesResponse
        filteredCountries[0] && <CountriesResponse country={filteredCountries[0]} />
      ) : (
        <CountryList
          countries={filteredCountries}
          onCountrySelect={handleCountrySelect}
        />
      )}
    </div>
  );
};

export default App;
