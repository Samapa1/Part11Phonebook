const PersonForm = (props) => {

    return(
    <form onSubmit={props.addName}>
    <div>
      <label htmlFor="name">name:</label>
      <input value={props.newName} onChange={props.handleNameChange} id="name"/>
    </div>
    <div>
      <label htmlFor="number">number:</label>
      <input value={props.newNumber} onChange={props.handleNumberChange} id="number"/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>
    )
  }

export default PersonForm