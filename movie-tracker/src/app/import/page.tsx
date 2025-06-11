'use client';

import { useState } from 'react';
import { useWatchedList } from '@/hooks/useWatchedList';
import Papa from 'papaparse';
import { VscCloudUpload } from 'react-icons/vsc';

// Define the expected structure of a row in the Letterboxd CSV
interface LetterboxdCsvRow {
    'Name': string;
    'Year': string;
    'Rating': string;
    // We only need the Name, but other columns might exist
}

export default function ImportPage() {
  const { addToWatchedList, watchedList } = useWatchedList();
  const [isParsing, setIsParsing] = useState(false);
  const [parseMessage, setParseMessage] = useState('');
  const [moviesAdded, setMoviesAdded] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsParsing(true);
    setParseMessage('');
    setMoviesAdded(0);

    Papa.parse<LetterboxdCsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let addedCount = 0;
        const moviesToAdd = [];

        // It seems Letterboxd CSV might not have a consistent ID.
        // A robust solution would use the TMDB API to search for the movie by name and year.
        // For now, we'll use a simplified approach and add a placeholder movie ID
        // based on a hash of its name and year, as we don't have movie search implemented.

        for (const row of results.data) {
          if (row.Name && row.Year) {
            // Simple hash function to generate a pseudo-unique ID
            const pseudoId = Array.from(row.Name + row.Year).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
            
            // Check if movie is already in the list
            if (!watchedList.some(m => m.movieId === pseudoId)) {
                const rating = row.Rating ? parseFloat(row.Rating) : null;
                // Since we don't have a real movie object, we'll have to improvise.
                // The useWatchedList hook expects a movieId and a rating.
                addToWatchedList(pseudoId, rating);
                addedCount++;
            }
          }
        }
        
        setMoviesAdded(addedCount);
        setParseMessage(`Parsing complete. Found ${results.data.length} movies. Added ${addedCount} new movies to your watched list.`);
        setIsParsing(false);
      },
      error: (error) => {
        setParseMessage(`Error parsing file: ${error.message}`);
        setIsParsing(false);
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-zinc-800/50 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-4">Import Letterboxd Data</h1>
        <p className="text-zinc-400 mb-6">
          Upload your watched films history from Letterboxd. You can export your data from your Letterboxd account settings.
          Please upload the `watched.csv` file.
        </p>

        <div className="border-2 border-dashed border-zinc-600 rounded-lg p-8 text-center">
          <label htmlFor="csv-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <VscCloudUpload className="text-5xl text-zinc-400 mb-4" />
              <p className="text-white font-semibold">Click to upload a file</p>
              <p className="text-xs text-zinc-500 mt-1">CSV up to 10MB</p>
            </div>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
              disabled={isParsing}
            />
          </label>
        </div>

        {isParsing && (
          <div className="mt-6 text-center">
            <p className="text-lg text-white">Parsing file...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500 mx-auto mt-4"></div>
          </div>
        )}

        {parseMessage && (
          <div className="mt-6 p-4 bg-zinc-700/50 rounded-lg text-center">
            <p className="text-white">{parseMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
} 