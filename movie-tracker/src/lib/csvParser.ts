import Papa from 'papaparse';

interface ParseResult<T> {
  data: T[];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

export async function parseCSV<T>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    // Create a new worker
    const worker = new Worker(new URL('./csvWorker.ts', import.meta.url), {
      type: 'module'
    });

    // Handle worker messages
    worker.onmessage = (e: MessageEvent) => {
      const { type, data, error } = e.data;
      
      if (type === 'complete') {
        worker.terminate();
        resolve(data);
      } else if (type === 'error') {
        worker.terminate();
        reject(new Error(error));
      }
    };

    // Handle worker errors
    worker.onerror = (error) => {
      worker.terminate();
      reject(error);
    };

    // Start parsing
    worker.postMessage({ file });
  });
}

// Example usage:
// const file = event.target.files[0];
// try {
//   const data = await parseCSV<YourDataType>(file);
//   console.log('Parsed data:', data);
// } catch (error) {
//   console.error('Error parsing CSV:', error);
// } 