import { render, screen, fireEvent } from '@testing-library/react';
import SuggestionsDropdown from '../SuggestionsDropdown';

describe('SuggestionsDropdown', () => {
  const suggestions = [
    {
      name: 'London',
      state: 'England',
      country: 'UK',
      coordinates: { lat: 51.5074, lon: -0.1278 },
      fullLabel: 'London, England, UK',
    },
    {
      name: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      coordinates: { lat: 48.8566, lon: 2.3522 },
      fullLabel: 'Paris, Île-de-France, France',
    },
  ];

  it('renders nothing when suggestions is empty', () => {
    const { container } = render(
      <SuggestionsDropdown suggestions={[]} onSelect={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders all suggestions', () => {
    render(
      <SuggestionsDropdown suggestions={suggestions} onSelect={jest.fn()} />
    );
    expect(screen.getByText('London, England, UK')).toBeInTheDocument();
    expect(screen.getByText('Paris, Île-de-France, France')).toBeInTheDocument();
  });

  it('calls onSelect with the correct suggestion when clicked', () => {
    const onSelect = jest.fn();
    render(
      <SuggestionsDropdown suggestions={suggestions} onSelect={onSelect} />
    );
    fireEvent.click(screen.getByText('Paris, Île-de-France, France'));
    expect(onSelect).toHaveBeenCalledWith(suggestions[1]);
  });
}); 