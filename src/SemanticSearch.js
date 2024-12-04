import React, { useState } from 'react';
import axios from 'axios';

const SemanticSearch = () => {
  const [query, setQuery] = useState(`
    SELECT ?subject ?predicate ?object WHERE {
      ?subject ?predicate ?object
    } LIMIT 10
  `); 
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:4000/api/search', { query });
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error executing the query. Please check the syntax.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Semantic Search</h1>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows="5"
        cols="80"
        style={{ marginBottom: '20px' }}
      />
      <br />
      <button onClick={handleSearch} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Results</h2>
      {results.length > 0 ? (
        <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Predicate</th>
              <th>Object</th>
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
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SemanticSearch;
