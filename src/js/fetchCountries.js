const BASE_URL = 'https://restcountries.com/v3.1/name';
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});
// console.log(searchParams.toString());

function fetchCountries(countryName) {
  return fetch(`${BASE_URL}/${countryName}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };

