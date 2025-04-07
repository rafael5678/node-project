import { render, screen, fireEvent } from '@testing-library/react';
import FichaPersonal from './FichaPersonal';

describe('FichaPersonal component', () => {
  const mockPerson = {
    name: { first: 'Laura', last: 'Martínez' },
    dob: { age: 28 },
  };

  it('renderiza correctamente la información de la persona', () => {
    render(<FichaPersonal person={mockPerson} onClose={() => {}} />);

    expect(screen.getByText('Ficha Personal')).toBeInTheDocument();
    expect(screen.getByText(/Laura Martínez/)).toBeInTheDocument();
    expect(screen.getByText(/28/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cerrar/i })).toBeInTheDocument();
  });

  it('no renderiza nada si no se pasa una persona', () => {
    const { container } = render(<FichaPersonal person={null} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('ejecuta la función onClose al hacer clic en el botón', () => {
    const handleClose = jest.fn();
    render(<FichaPersonal person={mockPerson} onClose={handleClose} />);

    const button = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
