import { useState, useEffect } from 'react'
import personService from './services/axiosFunction'
import components from './components/notes'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newChar, setNewChar] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState(1)

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
                successNotification(person)
                setPersons(persons.filter(person => person.id !== oldPersonId).concat(response.data))
                console.log(`post success! persons info -> `, persons)
                setNewName('')
                setNewNumber('')
              })
          })
          .catch((error) => {
            console.log(`delete fail! error info -> `, error)
            failNotification(person) 
          })
      }
    } else {
      personService.post(person)
        .then((response) => {
          // display the message
          successNotification(person)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const successNotification = (person) => {
    setMessage(`Added ${person.name}`)
    setTimeout(() => {
      setMessage(null)
      setMessageType(1)
    }, 5000)
  }

  const failNotification = (person) => {
    setMessageType(0)
    setMessage(`Fail! ${person.name} was already removed from server`)
    setTimeout(() => {
      setMessage(null)
      setMessageType(1)
    }, 5000)
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
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((error) => {
          console.log(`delete fail! error info -> `, error)
          failNotification(persons.find(person => person.id === id)) 
          setPersons(persons.filter(person => person.id !== id))
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
      <h1>Phonebook</h1>
      <components.Notification type={messageType} message={message} />
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