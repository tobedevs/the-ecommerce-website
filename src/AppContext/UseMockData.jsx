import { useState, useEffect } from 'react';

export function useMockData() {
  const [mockdata, setMockdata] = useState(() => {
    const stored = sessionStorage.getItem('mockdata');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('mockdata', JSON.stringify(mockdata));
  }, [mockdata]);

  const addItem = (selectedData) => {
    setMockdata(prev => [...prev, selectedData]);
  };

  const clearMockData = () => {
    setMockdata([]);
    sessionStorage.removeItem('mockdata');
  };

  return { mockdata, addItem, clearMockData };
}