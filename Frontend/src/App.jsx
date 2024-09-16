import { useState, useEffect } from 'react'
import nameService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [chosenPerson, setNewChoice] = useState('')
  const [message, setNewMessage] = useState({data:null, type:"info"})

  const hook = () => {
    nameService
      .getAll()
        .then(initialNames => {
        setPersons(initialNames)
      })
  }

  useEffect(hook, [])

  const handlePersonChange = (event) => {
    setNewChoice(event.target.value)
  }

  const handleNotification =(message) => {
    setNewMessage(message)
    setTimeout(() => {
      setNewMessage({data:null, type:"info"})
    }, 3000)
  }

  const deletePerson = (id) => {
   let proceed = confirm(`Delete ${persons.find(person => person.id ===id).name} ?`)
   if (proceed) {
    nameService
    .remove(id)
    .then( () => {
      setPersons(persons.filter(person => person.id !== id))
      handleNotification({data: `Deleted ${persons.find(person => person.id ===id).name}`, type:"info"})
    })
    }
  }

  const updateNumber = (id, newnumber) => {
    const person = persons.find((person => person.id === id))
    const updatedData = {...person, number: newnumber}
    nameService
    .replace(id, updatedData)
    .then( () => { 
      setPersons(persons.map(person => {
      if (person.id === id) {
        handleNotification({data:`Updated ${person.name}'s number`, type:"info"})
        return {...person, number: newnumber}
      } else { 
        return person
        }
      }))
    })
    .catch(error => {
      if (error.response.data.error.toString().startsWith("Validation failed")) {
        handleNotification({data: `${error.response.data.error}`, type:"error"})
      }
      else {
        handleNotification({data:`Information of ${person.name} has already been removed from the server`, type:"error"})
        setPersons((persons.filter(person => person.id !== id)))
      }
    })

    
  }
  
  const addName = (personObject) => {

    if (persons.some((person) => person.name === personObject.name))
    {
      let proceed = confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
      if (proceed) { 
      const index = persons.findIndex((person) => person.name === personObject.name)
      updateNumber(persons[index].id, personObject.number)
      }
    } else {
        nameService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          handleNotification({data:`Added ${personObject.name}`, type:"info"})
        })
        .catch(error => {
          handleNotification({data: `${error.response.data.error}`, type:"error"})
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handlePersonChange={handlePersonChange} chosenPerson={chosenPerson}/>
      <h3>add a new:</h3>
      <PersonForm addName = {addName}/>
      <Numbers persons= {persons} chosenPerson={chosenPerson} deletePerson = {deletePerson}/>
      </div>
  )

}

export default App


