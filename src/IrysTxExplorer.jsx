import React, { useState } from 'react';
import axios from 'axios';

export default function IrysTxExplorer() {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://gateway.irys.xyz/${input}`);
      setData(response.data);
    } catch (err) {
      setError('Transaction not found or invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>
        Irys Transaction Explorer
      </h1>
      <input
        type="text"
        placeholder="Enter transaction ID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      />
      <button
        onClick={fetchTransaction}
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
        }}
      >
        Explore
      </button>
      {loading && <p style={{ marginTop: '1rem' }}>Loading...</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {data && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Transaction Data:</h2>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
          <a
            href={`https://gateway.irys.xyz/${input}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0070f3', marginTop: '1rem', display: 'block' }}
          >
            View on Gateway
          </a>
        </div>
      )}
    </div>
  );
}
