import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrdenarPor from './OrdenarPor';

describe('OrdenarPor', () => {
  test('renderiza los botones de orden correctamente', () => {
    const setSortBy = jest.fn();
    render(<OrdenarPor setSortBy={setSortBy} />);

    // Verificamos que existan los botones
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Edad')).toBeInTheDocument();
    expect(screen.getByText('País')).toBeInTheDocument();
  });

  test('al hacer clic en "Nombre" llama a setSortBy con "name"', () => {
    const setSortBy = jest.fn();
    render(<OrdenarPor setSortBy={setSortBy} />);

    fireEvent.click(screen.getByText('Nombre'));
    expect(setSortBy).toHaveBeenCalledWith('name');
  });

  test('al hacer clic en "Edad" llama a setSortBy con "age"', () => {
    const setSortBy = jest.fn();
    render(<OrdenarPor setSortBy={setSortBy} />);

    fireEvent.click(screen.getByText('Edad'));
    expect(setSortBy).toHaveBeenCalledWith('age');
  });

  test('al hacer clic en "País" llama a setSortBy con "country"', () => {
    const setSortBy = jest.fn();
    render(<OrdenarPor setSortBy={setSortBy} />);

    fireEvent.click(screen.getByText('País'));
    expect(setSortBy).toHaveBeenCalledWith('country');
  });
});
