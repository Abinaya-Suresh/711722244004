import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Logic from "./pages/login";
import Register from "./pages/register";



function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="App">
      <Navbar query={query} setQuery={setQuery} />
      <main>
        <Home query={query} />
        <About />
        <Logic />
        <Register />
        
         
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
