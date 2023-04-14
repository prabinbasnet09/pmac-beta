import countries from 'country-list';
import Select from 'react-select';

const options = countries.getNames().map((country) => ({
  label: country,
  value: country,
}));

export default function CountrySelect({ selectedCountry, onCountryChange }) {
  return (
    <div>
      <Select
        name="country"
        options={options}
        value={options.find((c) => c.value === selectedCountry)}
        placeholder="Select a country"
        onChange={(selectedOption) => {
          onCountryChange(selectedOption.value);
        }}
      />
    </div>
  );
}
