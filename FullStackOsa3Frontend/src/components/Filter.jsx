const Filter = ({chosenPerson, handlePersonChange}) => {
    return(<div>
    <label htmlFor="filter">filter shown with:</label>
    <input value={chosenPerson} onChange={handlePersonChange} id="filter"/> 
    </div> 
  )}

  export default Filter