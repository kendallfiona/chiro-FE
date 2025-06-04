interface CitySuggestion {
    name: string;
    state: string;
    country: string;
    coordinates: { lat: number; lon: number; };
    fullLabel: string;
  }
  
  interface Props {
    suggestions: CitySuggestion[];
    onSelect: (value: CitySuggestion) => void;
  }
  
const SuggestionsDropdown = ({ suggestions, onSelect }: Props) => {
    if (!suggestions.length) return null;

    return (
        <ul className="absolute top-full left-0 w-full bg-white border shadow z-10 max-h-48 overflow-y-auto rounded-md">
        {suggestions.map((s, i) => (
            <li
            key={i}
            onClick={() => onSelect(s)}
            className="p-2 hover:bg-blue-100 cursor-pointer"
            >
            {s?.fullLabel}
            </li>
        ))}
        </ul>
    );
};

export default SuggestionsDropdown;
  