const getEconomia = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(url);
    const date = await response.json();
    return date;
  } catch (error) {
    return error;
  }
};

export default getEconomia;
