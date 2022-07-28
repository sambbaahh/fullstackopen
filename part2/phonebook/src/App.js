import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data)
    })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
                
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const contactObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  
  const contactsToShow = filter === ''
  ? persons
  : persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter  value = {filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName = {newName} newNumber = {newNumber} 
       handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}
       addContact = {addContact} />
      <h2>Numbers</h2>
      <Persons contactsToShow = {contactsToShow} />
    </div>
  )

}

export default App