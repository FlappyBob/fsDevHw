import { useState, useEffect } from 'react'
import personService from './services/axiosFunction'
import components from './components/notes'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newChar, setNewChar] = useState('')

  useEffect(() => {
    personService.getAll()
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const noteFilter = (note) => {
    const lowerCaseName = note.name.toLowerCase()
    const lowerCaseChar = newChar.toLowerCase()
    return lowerCaseName.includes(lowerCaseChar)
  }

  const handlerSubmit = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(person.name)) {
      if (window.confirm(`${newName} is already in the phone book, replace old number with a new one?`)) {
        const oldPersonId = persons.find(person => person.name === newName).id;
        personService.del(oldPersonId)
          .then((response) => {
            console.log(`delete success! response info -> `, response)
            personService.post(person)
              .then((response) => {
                setPersons(persons.filter(person => person.id !== oldPersonId).concat(response.data))
                console.log(`post success! persons info -> `, persons)
                setNewName('')
                setNewNumber('')
              })
          })
      }
    } else {
      personService.post(person)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handlerText = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlerNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleChar = (event) => {
    console.log(event.target.value)
    setNewChar(event.target.value)
  }

  const deleteHandle = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService.del(id)
        .then((response) => {
          console.log(response.data)
          setPersons(persons.filter(person => person.iFd !== id))
        })
    }
  }

  const personsToShow = persons.filter(noteFilter);

  const ShowPersons = ({ persons }) => {
    return (
      <div>
        {persons.map(person => <components.Person person={person} deleteHandle={() => { deleteHandle(person.id) }} />)}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input type='text' value={newChar} onChange={handleChar} />
      <h3>Add a new</h3>
      <Form handlerSubmit={handlerSubmit} handlerNumber={handlerNumber} handlerText={handlerText} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <ShowPersons persons={personsToShow} />
    </div>
  )
}

const Form = ({ newName, newNumber, handlerSubmit, handlerNumber, handlerText }) => {
  return (
    <form onSubmit={handlerSubmit}>
      <div>
        name: <input type='text' value={newName} onChange={handlerText} />
        <br />
        number: <input type='text' value={newNumber} onChange={handlerNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default App