import { render, screen } from '@testing-library/react'
import Personform from './Personform'
import userEvent from '@testing-library/user-event'

test('form functions correctly when new person is added', async () => {

  const user = userEvent.setup()
  const mockHandler = vi.fn()

  const { container } = render(<Personform addName ={mockHandler} />)

  const name = container.querySelector('#name')
  const number = container.querySelector('#number')

  console.log(name)

  const button = screen.getByText('add')

  await user.type(name, 'Marianna')
  await user.type(number, '05-1343535')

  await user.click(button)

  console.log(mockHandler.mock.calls)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].name).toBe('Marianna')
  expect(mockHandler.mock.calls[0][0].number).toBe('05-1343535')

  screen.debug()


})
