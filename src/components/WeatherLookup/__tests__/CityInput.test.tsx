import { render, screen, fireEvent } from '@testing-library/react';
import CityInput from '../CityInput';

describe('CityInput', () => {
  it('renders input with correct value', () => {
    render(
      <CityInput city="London" setCity={jest.fn()} onLookup={jest.fn()} />
    );
    const input = screen.getByPlaceholderText('Enter city name') as HTMLInputElement;
    expect(input.value).toBe('London');
  });

  it('calls setCity when input changes', () => {
    const setCity = jest.fn();
    render(
      <CityInput city="" setCity={setCity} onLookup={jest.fn()} />
    );
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Paris' } });
    expect(setCity).toHaveBeenCalledWith('Paris');
  });

  it('calls onLookup when button is clicked', () => {
    const onLookup = jest.fn();
    render(
      <CityInput city="Berlin" setCity={jest.fn()} onLookup={onLookup} />
    );
    const button = screen.getByText('Lookup');
    fireEvent.click(button);
    expect(onLookup).toHaveBeenCalled();
  });
}); 