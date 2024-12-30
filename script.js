

// API Key and URL
const apiKey = "b8ae3ea6951c405fd8d34250"; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// DOM Elements
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("convert");
const conversionResult = document.getElementById("conversionResult");

// Populate Currency Dropdowns
fetch(`${apiUrl}USD`) // Default base currency is USD
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach(currency => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      fromCurrency.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = currency;
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "NPR"; // Set default currency pair
  })
  .catch(error => console.error("Error fetching currency data:", error));

// Convert Currency
convertButton.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    conversionResult.textContent = "Please enter a valid amount.";
    return;
  }

  fetch(`${apiUrl}${from}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.conversion_rates[to];
      const result = (amount * rate).toFixed(2);
      conversionResult.textContent = `${amount} ${from} = ${result} ${to}`;
    })
    .catch(error => {
      console.error("Error fetching conversion data:", error);
      conversionResult.textContent = "Error fetching conversion rates.";
    });
});
