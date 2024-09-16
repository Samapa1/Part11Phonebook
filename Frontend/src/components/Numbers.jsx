const Numbers = ({persons, chosenPerson, deletePerson}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(chosenPerson.toLowerCase()))
    return(
    personsToShow.map (person => 
      <p key={person.name}>
      {person.name} {person.number}<button onClick={() => deletePerson(person.id)}>delete</button>
     </p>
     )
    )
  }

export default Numbers