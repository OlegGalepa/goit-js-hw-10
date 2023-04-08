import './css/styles.css';
import './js/fetchCountries';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;


const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
    e.preventDefault();
    const searchValue = input.value.trim();
    console.log(searchValue)
    if (searchValue != '') {
        fetchCountries(searchValue)
        .then(renderCountry)
        .catch(onFetchError);
    }
};

function createCountryList(countries) {
    return countries.map(({name, flags}) => {
        return `
        <li class="country-item">
        <img class="country-img" src="${flags.svg}" width='50em' alt="${flags.alt}">
        <h2 class="country-title">${name.official}</h2>
       </li>
       `
    }).join('')
};

function createCountryInfo(countries) {
    return countries.map(({name, flags, capital, population, languages}) => {
        return `
        <div class="country-heading">
            <img class="country-img card-img--big" src="${flags.svg}" width='200em' alt="${flags.alt}">
            <h2 class="country-titles">${name.official}</h2>
        </div>
        <div class="country-body">
            <p class="country-text"><b>Capital:</b> ${capital}</p>
            <p class="country-text"><b>Population:</b> ${population}</p>
            <p class="country-text"><b>Languages:</b> ${Object.values(languages).join(', ')}</p>
        </div>
        `
    }).join('')
};

function renderCountry(countries) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    if (countries.length > 10) {
        return foundCountry();
    } else if (countries.length >= 2 && countries.length <= 10) {
        countryList.insertAdjacentHTML('beforeend', createCountryList(countries))
    } else if (countries.length === 1) {
        countryInfo.insertAdjacentHTML('beforeend', createCountryInfo(countries))
    }    

};


function foundCountry() {
    Notify.info("Too many matches found. Please enter a more specific name.")
}


function onFetchError() {
    Notify.failure("Oops, there is no country with that name");
}

