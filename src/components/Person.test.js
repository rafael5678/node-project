import { render, screen, fireEvent } from '@testing-library/react';
import Person from './Person';

describe('Person component', () => {
  const mockPerson = {
    name: { first: 'Juan', last: 'Pérez' },
    location: { country: 'Colombia' },
    picture: { medium: 'https://randomuser.me/api/portraits/med/men/75.jpg' },
  };

  it('renderiza nombre, país, imagen y botón correctamente', () => {
    render(<Person person={mockPerson} onClick={() => {}} />);

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('Colombia')).toBeInTheDocument();
    expect(screen.getByAltText('Juan')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver ficha personal/i })).toBeInTheDocument();
  });

  it('ejecuta la función onClick al hacer clic en el botón', () => {
    const handleClick = jest.fn();
    render(<Person person={mockPerson} onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /ver ficha personal/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
