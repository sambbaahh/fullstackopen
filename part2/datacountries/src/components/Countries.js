import Details from "./Details"
const Countries = ({ countries, setSearch }) => {

    let countryAmount = countries.length

    const showCountry = (country) => setSearch(country)


    if (countryAmount > 10) {
        return (
            <> Too many matches, specify another filter </>
        )
    }

    if (countryAmount <= 10 && countryAmount > 1) {
        return (
            countries.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <button value={country.name.common} onClick={() => showCountry(country.name.common)}>
                        show
                    </button>
                </div>
            )
        )
    }

    if (countryAmount === 1) {
        const country = countries[0]
        return (
            <Details country={country} />
        )
    }
}

export default Countries