import React, { useState } from 'react';
import { useGetCitiesQuery } from '../../services/api';

const CityTable = () => {
  const [search, setSearch] = useState('');
  const { data: cities, isLoading, isError } = useGetCitiesQuery(search);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching cities!</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search City"
        value={search}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {cities?.map((city) => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>{city.country}</td>
              <td>{city.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
