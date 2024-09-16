import { render, screen } from '@testing-library/react'
import Numbers from './Numbers'

test('renders numbers', () => {
  const persons = 
    [{
        "name": "Uuno Matikainen",
        "number": "050-3121211"
      },
      {
        "name": "Elsa",
        "number": "04-09343434"
      }
    ]

  render(<Numbers persons={persons} chosenPerson={""} />)

  const element1 = screen.getByText('Uuno Matikainen 050-3121211')
  const element2 = screen.getByText('Elsa 04-09343434')
  // expect(element).toBeDefined()
})