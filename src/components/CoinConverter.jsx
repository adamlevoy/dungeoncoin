import React, { useState, useEffect } from "react";
import ListBox from "./ListBox";

const coins = [
  {
    id: 1,
    name: "Gold",
    symbol: "GP",
    avatar: "/assets/gold.svg",
  },
  {
    id: 2,
    name: "Silver",
    symbol: "SP",
    avatar: "/assets/silver.svg",
  },
  {
    id: 3,
    name: "Copper",
    symbol: "CP",
    avatar: "/assets/copper.svg",
  },
  {
    id: 4,
    name: "Electrum",
    symbol: "EP",
    avatar: "/assets/electrum.svg",
  },
  {
    id: 5,
    name: "Platinum",
    symbol: "PP",
    avatar: "/assets/platinum.svg",
  },
];

export default function CoinConverter() {
  const [selectedCoin_A, setSelectedCoin_A] = useState(coins[0]);
  const [selectedCoin_B, setSelectedCoin_B] = useState(coins[1]);
  const [inputAmount_A, setInputAmount_A] = useState(1);
  const [inputAmount_B, setInputAmount_B] = useState(10);

  function handleSelect_A(selectedCoin) {
    console.log("🚀 ~ selected_Coin_A:", selectedCoin);
    setSelectedCoin_A(selectedCoin);
  }

  function handleSelect_B(selectedCoin) {
    console.log("🚀 ~ selected_Coin_B:", selectedCoin);
    setSelectedCoin_B(selectedCoin);
  }

  function convertToGold(coin, amount) {
    if (coin.symbol === "GP") {
      return amount * 1;
    } else if (coin.symbol === "SP") {
      return amount / 10;
    } else if (coin.symbol === "CP") {
      return amount / 100;
    } else if (coin.symbol === "EP") {
      return amount / 2;
    } else if (coin.symbol === "PP") {
      return amount * 10;
    }
  }

  function convertFromGold(coin, amount) {
    if (coin.symbol === "GP") {
      return amount * 1;
    } else if (coin.symbol === "SP") {
      return amount * 10;
    } else if (coin.symbol === "CP") {
      return amount * 100;
    } else if (coin.symbol === "EP") {
      return amount * 2;
    } else if (coin.symbol === "PP") {
      return amount / 10;
    }
  }

  useEffect(() => {
    const goldValue = convertToGold(selectedCoin_A, inputAmount_A);
    const coinValue = convertFromGold(selectedCoin_B, goldValue);
    setInputAmount_B(coinValue);
  }, [selectedCoin_A, inputAmount_A]);

  useEffect(() => {
    const goldValue = convertToGold(selectedCoin_B, inputAmount_B);
    const coinValue = convertFromGold(selectedCoin_A, goldValue);
    setInputAmount_A(coinValue);
  }, [selectedCoin_B, inputAmount_B]);

  return (
    <div className="space-y-4">
      {/* COIN A */}
      <div className="relative flex max-w-sm mx-auto justify-center items-center">
        <input
          className="w-full rounded-md pl-4 border-none focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          value={inputAmount_A}
          pattern="/[^a-z ]\*([.0-9])*\d/"
          type="text"
          onChange={(e) => setInputAmount_A(e.target.value)}
        />
        <div className="absolute right-0">
          <ListBox
            coins={coins}
            selected={selectedCoin_A}
            handleSelected={handleSelect_A}
          />
        </div>
      </div>

      {/* COIN B */}
      <div className="relative flex max-w-sm mx-auto justify-center items-center">
        <input
          className="w-full rounded-md pl-4 border-none focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          value={inputAmount_B}
          pattern="/[^a-z ]\*([.0-9])*\d/"
          type="text"
          onChange={(e) => setInputAmount_B(e.target.value)}
        />
        <div className="absolute right-0">
          <ListBox
            coins={coins}
            selected={selectedCoin_B}
            handleSelected={handleSelect_B}
          />
        </div>
      </div>
    </div>
  );
}
