const CountryList = ({ countries, onCountrySelect }) => {
  return (
    <ul>
      {countries.map((country, index) => (
        <li key={index}>
          {country.name.common} - {country.capital && country.capital.length > 0 ? country.capital[0] : 'Información no disponible'} - {country.area.toLocaleString()} km²
          <button onClick={() => onCountrySelect(country.name.common)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;