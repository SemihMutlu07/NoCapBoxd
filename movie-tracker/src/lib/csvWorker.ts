import Papa from 'papaparse';

self.onmessage = (e: MessageEvent) => {
  const { file } = e.data;
  
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      self.postMessage({ type: 'complete', data: results.data });
    },
    error: (error) => {
      self.postMessage({ type: 'error', error: error.message });
    }
  });
}; 