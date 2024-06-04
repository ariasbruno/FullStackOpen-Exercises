import WeatherApp from "../services/weather"

const CountriesResponse = ({ country }) => {
  if (!country) {
    return <p>No hay información disponible para mostrar.</p>;
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Área: {country.area.toLocaleString()} km²</p>
      <h3>Languages:</h3> 
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={`Bandera de ${country.name.common}`} style={{ width: '100px' }} />
      <h2>Weather in {country.capital[0]}</h2>
            <WeatherApp lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
    </div>
  );
}

export default CountriesResponse;
