import React, { useState } from 'react';
import axios from 'axios';

const SemanticSearch = () => {
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:4000/api/keyword-search', { keywords });
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error executing the query. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Búsqueda Semántica</h1>
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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Resultados</h2>
      {results.length > 0 ? (
        <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Sujeto</th>
              <th>Predicado</th>
              <th>Objeto</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.subject ? result.subject.split('#').pop() : 'N/A'}</td>
                <td>{result.predicate ? result.predicate.split('#').pop() || result.predicate.split('/').pop() : 'N/A'}</td>
                <td>{result.object ? (result.object.includes('#') ? result.object.split('#').pop() : result.object) : 'N/A'}</td>
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
