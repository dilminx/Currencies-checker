import React, { useEffect, useState } from "react";
import axios from "axios";

function Mainpage() {
  const [date, setDate] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [display, setDisplay] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    //convert currency
    try {
      const responce = await axios.get("http://localhost:5000/getConvert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amount,
        },
      });

      setDisplay(responce.data);
      setLoading(false);

      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getAllCurrencyNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencyNames"
        );
        setCurrencyNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCurrencyNames();
  }, []);

  return (
    <div className="bg-slate-800">
      <div className="flex justify-center text-3xl font-bold text-white border ">
        Currency Checker Today...
      </div>

      <section className="w-full p-4 m-8">
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-5 w-96 md:w-full">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="date"
                name="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Date/Month/Year"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="sourceCurrency"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={sourceCurrency}
                id="sourceCurrency"
                name="sourceCurrency"
              >
                <option value="">Select Source Currency Type</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="P-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="targetCurrency"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={targetCurrency}
                id="targetCurrency"
                name="targetCurrency"
              >
                <option value="">Select Target Currency Type</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="P-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount In Source Currency
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                id="amount"
                name="amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get Value
            </button>
          </form>
        </div>
      </section>
      {!loading?<div className="flex items-center justify-center p-5 font-bold text-white">
        {sourceCurrency} {amount} is equwl to {targetCurrency}
         <div className="text-green-500">{display}</div>
      </div>:null}
    </div>
  );
}

export default Mainpage;
