import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoTracker = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch coin data & update automatically
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 10000); // Auto-update every 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center rounded-lg sticky top-0 z-10">
        <h1 className="text-xl font-bold text-green-400">Crypto Tracker</h1>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 p-2 rounded text-white w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>

      {/* Coin Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
        {coins
          .filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((coin) => (
            <div
              key={coin.id}
              className="bg-gray-800 p-4 rounded-lg flex flex-col items-center text-center hover:scale-105 transition transform"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-16 h-16 mb-2"
              />
              <h3 className="text-lg font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h3>
              <p className="text-green-400 text-sm">${coin.current_price.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Market Rank: #{coin.market_cap_rank}</p>
              <p className="text-red-400 text-sm">24h High: ${coin.high_24h.toLocaleString()}</p>
              <p className="text-blue-400 text-sm">24h Low: ${coin.low_24h.toLocaleString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CryptoTracker;
