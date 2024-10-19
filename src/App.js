import React, { useState, useEffect, useCallback, useRef } from "react";

const App = () => {
  const [cats, setCats] = useState([]); // Store all fetched cats
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(false); // Track error state
  const [page, setPage] = useState(1); // Current page number

  const observer = useRef(); // Ref for intersection observer

  // Function to fetch more cat images
  const fetchCats = async (currentPage) => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${currentPage}&order=Desc`
      );
      const data = await response.json();
      setCats((prevCats) => [...prevCats, ...data]); // Append new cats to existing ones
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data and on page change
  useEffect(() => {
    fetchCats(page);
  }, [page]);

  // Infinite Scroll Logic
  const lastCatRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 p-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-white mb-8">Infinite Cat Gallery</h1>

      {error && <p className="text-red-500 text-lg">Error fetching data!</p>}
      {!loading && !error && cats.length === 0 && (
        <p className="text-white text-lg">No cats found.</p>
      )}

      <div className="flex flex-col gap-8 w-full max-w-2xl">
        {cats.map((cat, index) => {
          // Attach the ref to the last item in the list
          if (index === cats.length - 1) {
            return (
              <div
                ref={lastCatRef}
                key={cat.id}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={cat.url}
                  alt="Cat"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-lg font-semibold text-gray-800">Adorable Cat</h2>
                  <p className="text-gray-500">ID: {cat.id}</p>
                </div>
              </div>
            );
          }

          return (
            <div
              key={cat.id}
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={cat.url}
                alt="Cat"
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">Adorable Cat</h2>
                <p className="text-gray-500">ID: {cat.id}</p>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <p className="text-white text-lg mt-4">Loading...</p>}
    </div>
  );
};

export default App;
