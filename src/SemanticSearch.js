import React, { useState } from 'react';
import axios from 'axios';

const SemanticSearch = () => {
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); 
  const [filter, setFilter] = useState(''); 
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:4000/api/keyword-search', { keywords });
      setResults(response.data);
      setFilteredResults(response.data); 
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error executing the query. Please try again.');
    }
  };

  // Cargar datos de DBpedia
  const handleDbpediaFetch = async () => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:4000/api/dbpedia-mobile-phone');
      setResults(response.data);
      setFilteredResults(response.data); // Inicializa los resultados filtrados con todos los resultados
    } catch (err) {
      console.error('Error fetching data from DBpedia:', err);
      setError('Error fetching data. Please try again.');
    }
  };

  // Filtrar los resultados
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
  
  // Función para mapear Samsung a la ontología
  const handleMapSamsung = async () => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:4000/api/map-samsung');
      alert(response.data.message);
    } catch (err) {
      console.error('Error mapping Samsung data to ontology:', err);
      setError('Error mapping Samsung data to ontology. Please try again.');
    }
  };

  // Función para mapear iPhone 14 a la ontología
  const handleMapIphone14 = async () => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:4000/api/map-iphone14');
      alert(response.data.message);
    } catch (err) {
      console.error('Error mapping iPhone 14 data to ontology:', err);
      setError('Error mapping iPhone 14 data to ontology. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Búsqueda Semántica</h1>
      {/* Entrada de búsqueda */}
      <div>
        <h3>Buscar Datos</h3>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Ingrese la búsqueda..."
          style={{ width: '80%', padding: '10px', marginBottom: '20px' }}
        />
        <br />
        <button onClick={handleSearch} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Buscar
        </button>
        <button
          onClick={handleDbpediaFetch}
          style={{ padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' }}
        >
          Datos de DBpedia
        </button>
        <button
          onClick={handleMapSamsung}
          style={{ padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' }}
        >
          Mapear Samsung
        </button>
        <button
          onClick={handleMapIphone14}
          style={{ padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' }}
        >
          Mapear iPhone 14
        </button>
      </div>

      {/* Entrada y botón de filtro */}
      <div style={{ marginTop: '20px' }}>
        <h3>Buscar Datos de DBpedia</h3>
        <input
          type="text"
          placeholder="Ingrese la búsqueda"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: '80%', padding: '10px', marginBottom: '20px' }}
        />
        <br />
        <button onClick={handleFilter} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Buscar
        </button>
      </div>

      {/* Mostrar resultados */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Resultados</h2>
      {filteredResults.length > 0 ? (
        <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Sujeto</th>
              <th>Predicado</th>
              <th>Objeto</th>
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
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default SemanticSearch;
