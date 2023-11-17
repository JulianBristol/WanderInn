import countries from "world-countries";

//Formats the countries in a nicer way for future selection
const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}))

/* main function used to return a list of countries
    and to return more data about a selected country */
const useCountries = () => {
    //gets a list of all countries
    const getAll = () => formattedCountries;

    //used to select a single country
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => {
            item.value === value
        })
    }

    //Exposes the internal functions to the calling function
    return {
        getAll,
        getByValue
    }
}

export default useCountries;