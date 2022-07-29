import Weather from "./Weather"


const Details = ({ country }) => {

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div> capital {country.capital} </div>
            <div> area {country.area} </div>
            <div>
                <h2>languages:</h2>
                <ul>
                    {Object.values(country.languages).map((languageName) =>
                        <li key={languageName}>{languageName}</li>)}
                </ul>
                <div>
                    <img src={country.flags.png} width="150" height="150" />
                </div>
            </div>
            <Weather capital={country.capital} />
        </div>
    )


}

export default Details