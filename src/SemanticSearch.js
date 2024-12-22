import React, { useState } from 'react';
import axios from 'axios';
import Alert from './Alert';
import './SemanticSearch.css';
import imagen1 from "../src/assets/imagenFondo.png";


const SemanticSearch = () => {
  const [language, setLanguage] = useState('es');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);

  const translations = {
    es: {
      title: 'Búsqueda Semántica',
      imageTitle: 'Celulares',
      search: 'Buscar',
      searchPlaceholder: 'Ingrese la búsqueda...',
      dbpediaData: 'Datos de DBpedia',
      mapSamsung: 'Mapear Samsung',
      mapIphone: 'Mapear iPhone',
      mapHuawei: 'Mapear Huawei',
      mapRedmi: 'Mapear Redmi',
      filter: 'Filtrar',
      filterPlaceholder: 'Ingrese el filtro',
      results: 'Resultados',
      noResults: 'No se encontraron resultados.',
      subject: 'Sujeto',
      predicate: 'Predicado',
      object: 'Objeto',
    },
    en: {
      title: 'Semantic Search',
      imageTitle: 'Cell Phones',
      search: 'Search',
      searchPlaceholder: 'Enter your search...',
      dbpediaData: 'DBpedia Data',
      mapSamsung: 'Map Samsung',
      mapIphone: 'Map iPhone',
      mapHuawei: 'Map Huawei',
      mapRedmi: 'Map Redmi',
      filter: 'Filter',
      filterPlaceholder: 'Enter filter',
      results: 'Results',
      noResults: 'No results found.',
      subject: 'Subject',
      predicate: 'Predicate',
      object: 'Object',
    },
  };

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.post(
        'http://localhost:4000/api/keyword-search',
        { keywords },
        {
          headers: {
            'Accept-Language': language, 
          },
        }
      );
      setResults(response.data);
      setFilteredResults(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error executing the query. Please try again.');
    }
  };
  

  const handleDbpediaFetch = async () => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:4000/api/dbpedia-mobile-phone');
      setResults(response.data);
      setFilteredResults(response.data);
    } catch (err) {
      console.error('Error fetching data from DBpedia:', err);
      setError('Error fetching data. Please try again.');
    }
  };

  const handleFilter = () => {
    const filtered = results.filter((result) =>
      result.object?.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  const isURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 4000); 
  };

  const handleMapSamsung = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/map-samsung', {
        headers: { 'Accept-Language': language },
      });
      showAlert(response.data.message, 'success'); 
    } catch (err) {
      console.error('Error mapping Samsung data to ontology:', err);
      showAlert(
        language === 'es' ? 'Error: No se pudo mapear los datos de Samsung.' : 'Error: Failed to map Samsung data.',
        'error'
      );
    }
  };
  

  const handleMapIphone14 = async () => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:4000/api/map-iphone14', {
        headers: { 'Accept-Language': language }, 
      });
      showAlert(response.data.message, 'success'); 
    } catch (err) {
      console.error('Error mapping iPhone 14 data to ontology:', err);
      showAlert(
        language === 'es'
          ? 'Error: No se pudo mapear los datos de iPhone 14. Intenta nuevamente.'
          : 'Error: Failed to map iPhone 14 data. Please try again.',
        'error'
      ); 
    }
  };
  
  
  const handleMapHuaweiP50 = async () => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:4000/api/map-huawei-p50', {
        headers: { 'Accept-Language': language }, 
      });
      showAlert(response.data.message, 'success'); 
    } catch (err) {
      console.error('Error mapping Huawei P50 data to ontology:', err);
      showAlert(
        language === 'es'
          ? 'Error: No se pudo mapear los datos de Huawei P50. Intenta nuevamente.'
          : 'Error: Failed to map Huawei P50 data. Please try again.',
        'error'
      ); 
    }
  };
  
  
  const handleMapRedmiNote5 = async () => {
  try {
    setError(null);
    const response = await axios.get('http://localhost:4000/api/map-redmi-note-5', {
      headers: { 'Accept-Language': language }, 
    });
    showAlert(response.data.message, 'success'); 
  } catch (err) {
    console.error('Error mapping Redmi Note 5 data to ontology:', err);
    showAlert(
      language === 'es'
        ? 'Error: No se pudo mapear los datos de Redmi Note 5. Intenta nuevamente.'
        : 'Error: Failed to map Redmi Note 5 data. Please try again.',
      'error'
    ); 
  }
};

  

  return (
    <div className="main-container">
      {alert.show && <Alert message={alert.message} type={alert.type} />}
    <div style={{ padding: '20px' }}>
    <div className="language-switcher">
  <button onClick={() => setLanguage('es')} className="styled-button">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
      alt="Español"
      className="flag-icon"
    />
    Español
  </button>
  <button onClick={() => setLanguage('en')} className="styled-button">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
      alt="English"
      className="flag-icon"
    />
    English
  </button>
</div>

      <h1 className="title">
        {translations[language].title.split(' ')[0]}{" "}
        <span className="highlight">
          {translations[language].title.split(' ')[1]}
        </span>
      </h1>

      <div>
      <div className="image-container">
  <img
    src={imagen1} 
    alt="Logo"
    className="background-image"
  />
  <div className="image-title">{translations[language].imageTitle}</div>
</div>

      <div className="input-container">
      <h3 className="search-title">{translations[language].search}</h3>
  <input
    type="text"
    className="styled-input"
    value={keywords}
    onChange={(e) => setKeywords(e.target.value)}
    placeholder={translations[language].searchPlaceholder}
  />
</div>


        <br />
        <div className="button-container">
  <button onClick={handleSearch} className="styled-button">
    {translations[language].search}
  </button>
  <button onClick={handleDbpediaFetch} className="styled-button">
    {translations[language].dbpediaData}
  </button>
  <button onClick={handleMapSamsung} className="styled-button">
    {translations[language].mapSamsung}
  </button>
  <button onClick={handleMapIphone14} className="styled-button">
    {translations[language].mapIphone}
  </button>
  <button onClick={handleMapHuaweiP50} className="styled-button">
    {translations[language].mapHuawei}
  </button>
  <button onClick={handleMapRedmiNote5} className="styled-button">
    {translations[language].mapRedmi}
  </button>
</div>

      </div>

      <div className="filter-container">
  <h3 className="search-title">{translations[language].filter}</h3>
  <input
    type="text"
    className="styled-input"
    placeholder={translations[language].filterPlaceholder}
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  />
  <div className="button-container">
    <button onClick={handleFilter} className="styled-button">
      {translations[language].filter}
    </button>
  </div>
</div>


      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2 className="results-title">{translations[language].results}</h2>
{filteredResults.length > 0 ? (
  <table className="styled-table">
    <thead>
      <tr>
        <th>{translations[language].subject}</th>
        <th>{translations[language].predicate}</th>
        <th>{translations[language].object}</th>
      </tr>
    </thead>
    <tbody>
      {filteredResults.map((result, index) => (
        <tr key={index}>
          <td>{result.subject ? result.subject.split('#').pop() : 'N/A'}</td>
          <td>
            {result.predicate
              ? result.predicate.split('#').pop() || result.predicate.split('/').pop()
              : 'N/A'}
          </td>
          <td>
            {result.object ? (
              isURL(result.object) ? (
                <a href={result.object} target="_blank" rel="noopener noreferrer">
                  {result.object.split('#').pop() || result.object}
                </a>
              ) : (
                result.object
              )
            ) : (
              'N/A'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="no-results">{translations[language].noResults}</p>
)}

    </div>
    </div>
  );
};

export default SemanticSearch;
