import { useState } from 'react'

const Contact = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    console.log(persons[0])
    console.log({ name: newName })

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


  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Contact key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )

}

export default App