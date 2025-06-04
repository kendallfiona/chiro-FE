interface Props {
    city: string;
    setCity: (value: string) => void;
    onLookup: () => void;
  }
  
  const CityInput = ({ city, setCity, onLookup }: Props) => (
    <div className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={onLookup}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium border border-transparent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-[1.02]"
      >
        Lookup
      </button>
    </div>
  );
  
  export default CityInput;
  