import { useState } from 'react'

const PersonForm = ({addName}) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    }

    const clearData = () => {
      setNewName('')
      setNewNumber('')
  
    }
  
    const addNameToDB = (event) => {
      event.preventDefault()
      addName({
        name: newName,
        number: newNumber,
      })
  
      clearData()
    }

    return(
    <form onSubmit={addNameToDB}>
    <div>
      <label htmlFor="name">name:</label>
      <input data-testid='name' value={newName} onChange={handleNameChange} id="name"/>
    </div>
    <div>
      <label htmlFor="number">number:</label>
      <input data-testid='number' value={newNumber} onChange={handleNumberChange} id="number"/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>
    )
  }

export default PersonForm