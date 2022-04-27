const getEconomia = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(url)
    .then((response) => response.json())
    .then((date) => date)
    .catch((err) => err);
};

export default getEconomia;
