import { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries';
import Search from './components/Search';


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])



  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }


  const CountriesToShow = search === ''
    ? countries
    : countries.filter((country) => country.name.common.toLowerCase()
      .includes(search.toLowerCase()))


  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={CountriesToShow} setSearch={setSearch} />

    </div>
  )
}

export default App;



/*
      {CountriesToShow.map(country =>
        <Country country={country} key={country.name.official} countryAmount={CountriesToShow.length}
*/