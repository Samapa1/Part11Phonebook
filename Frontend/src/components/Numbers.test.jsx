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

  render(<Numbers persons={persons} />)

  const element = screen.getByText('Uuni Matikainen')
  expect(element).toBeDefined()
})