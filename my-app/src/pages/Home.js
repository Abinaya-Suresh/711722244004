// import React, { useState, useEffect } from "react";
// import "./Home.css";

// function Home({ query }) {
//   const [url, setUrl] = useState("");
//   const [shortenedUrl, setShortenedUrl] = useState("");
//   const [urls, setUrls] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const urlsPerPage = 5;

//   // Load URLs from localStorage on mount
//   useEffect(() => {
//     const savedUrls = JSON.parse(localStorage.getItem("urls")) || [];
//     setUrls(savedUrls);
//   }, []);

//   // Save URLs to localStorage when urls change
//   useEffect(() => {
//     localStorage.setItem("urls", JSON.stringify(urls));
//   }, [urls]);

//   const handleShorten = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setShortenedUrl("");
//     try {
//       // Replace with your actual API call
//       const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
//       const data = await response.json();
//       if (data.ok) {
//         setShortenedUrl(data.result.full_short_link);
//         setUrls([{ original: url, short: data.result.full_short_link }, ...urls]);
//         setUrl("");
//       } else {
//         setError("Failed to shorten URL.");
//       }
//     } catch (err) {
//       setError("Error processing request.");
//     }
//     setLoading(false);
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(shortenedUrl);
//   };

 
//   const indexOfLastUrl = currentPage * urlsPerPage;
//   const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
//   const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl);
//   const totalPages = Math.ceil(urls.length / urlsPerPage);

//   return (
//     <section id="home" className="home" style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
//       <h1>Welcome to URL Shortner</h1>
//       <p>Your one-stop solution to shorten and manage your URLs efficiently.</p>
//       {query && <p>Search Query: {query}</p>}

//       <form onSubmit={handleShorten} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
//         <input
//           type="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter URL to shorten"
//           required
//           style={{ flex: 1, padding: 8 }}
//         />
//         <button type="submit" disabled={loading}>Shorten</button>
//       </form>

//       {loading && <div>Loading...</div>}
//       {error && <div style={{ color: "red" }}>{error}</div>}

//       {shortenedUrl && (
//         <div style={{ marginBottom: 16 }}>
//           <span>Shortened URL: </span>
//           <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
//           <button onClick={handleCopy} style={{ marginLeft: 8 }}>Copy</button>
//         </div>
//       )}

//       <h2>Previously Shortened URLs</h2>
//       <ul>
//         {currentUrls.map((item, idx) => (
//           <li key={idx} style={{ marginBottom: 8 }}>
//             <span>{item.original} → </span>
//             <a href={item.short} target="_blank" rel="noopener noreferrer">{item.short}</a>
//           </li>
//         ))}
//       </ul>
//       {urls.length > urlsPerPage && (
//         <div style={{ display: "flex", gap: 8 }}>
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
//           <span>Page {currentPage} of {totalPages}</span>
//           <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//         </div>
//       )}
//     </section>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import "./Home.css";

function Home({ query }) {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 5;

  // Load URLs from localStorage on mount
  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem("urls")) || [];
    setUrls(savedUrls);
  }, []);

  // Save URLs to localStorage when urls change
  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortenedUrl("");

    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const data = await response.json();

      if (data.ok) {
        const newEntry = { original: url, short: data.result.full_short_link };

        // avoid duplicates
        if (!urls.find((item) => item.short === newEntry.short)) {
          setUrls([newEntry, ...urls]);
        }

        setShortenedUrl(data.result.full_short_link);
        setUrl("");
      } else {
        setError("Failed to shorten URL.");
      }
    } catch (err) {
      setError("Error processing request.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  // Pagination
  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl);
  const totalPages = Math.ceil(urls.length / urlsPerPage);

  return (
    <section id="home" className="home">
      <h1>Welcome to URL Shortener</h1>
      <p>Your one-stop solution to shorten and manage your URLs efficiently.</p>
      {query && <p>Search Query: {query}</p>}

      <form onSubmit={handleShorten} className="shorten-form">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <button type="submit" disabled={loading}>Shorten</button>
      </form>

      {loading && <div className="spinner"></div>}
      {error && <div className="error">{error}</div>}

      {shortenedUrl && (
        <div className="shortened">
          <span>Shortened URL: </span>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
          <button onClick={handleCopy}>Copy</button>
        </div>
      )}

      <h2>Previously Shortened URLs</h2>
      <ul>
        {currentUrls.map((item, idx) => (
          <li key={idx}>
            <span className="original">{item.original}</span>
            <a href={item.short} target="_blank" rel="noopener noreferrer">{item.short}</a>
          </li>
        ))}
      </ul>

      {urls.length > urlsPerPage && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      )}
    </section>
  );
}

export default Home;



