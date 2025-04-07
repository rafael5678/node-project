import { useState, useCallback } from 'react';
import Person from './components/Person';
import SearchForm from './components/SearchForm';
import VisualizarTiempos from './components/VisualizarTiempos';
import OrdenarPor from './components/OrdenarPor';
import FichaPersonal from './components/FichaPersonal';
import './App.css';
import axios from 'axios';

function App() {
  const [timeAxios, setTimeAxios] = useState(parseFloat(localStorage.getItem('axiosTime') ?? 0));
  const [timeFetch, setTimeFetch] = useState(parseFloat(localStorage.getItem('fetchTime') ?? 0));
  const [people, setPeople] = useState({ axios: [], fetch: [] });
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('US');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);

  const url = `https://randomuser.me/api/?results=12&gender=${gender}&nat=${country}`;

  const sortPeople = (data, criteria) => {
    return [...data].sort((a, b) => {
      if (criteria === 'name') {
        return a.name.first.localeCompare(b.name.first);
      } else if (criteria === 'age') {
        return a.dob.age - b.dob.age;
      } else if (criteria === 'country') {
        return a.location.country.localeCompare(b.location.country);
      }
      return 0;
    });
  };

  const findPeopleAxios = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadingType('axios');
    setPeople({ axios: [], fetch: [] });

    try {
      const { data: { results } } = await axios.get(url);
      setPeople(prev => ({ ...prev, axios: results }));
    } catch (error) {
      console.error(`Error en Axios: ${error.message}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [isLoading, url]);

  const findPeopleFetch = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadingType('fetch');
    setPeople({ axios: [], fetch: [] });

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      const { results } = await response.json();
      setPeople(prev => ({ ...prev, fetch: results }));
    } catch (error) {
      console.error(`Error en Fetch: ${error.message}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [isLoading, url]);

  const compareRequests = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadingType('compare');
    setPeople({ axios: [], fetch: [] });

    try {
      const axiosStart = performance.now();
      const axiosPromise = axios.get(url).then(res => {
        const time = parseFloat((performance.now() - axiosStart).toFixed(2));
        localStorage.setItem('axiosTime', time);
        setTimeAxios(time);
        return res.data.results;
      });

      const fetchStart = performance.now();
      const fetchPromise = fetch(url).then(async res => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
        const data = await res.json();
        const time = parseFloat((performance.now() - fetchStart).toFixed(2));
        localStorage.setItem('fetchTime', time);
        setTimeFetch(time);
        return data.results;
      });

      const [axiosResponse, fetchResponse] = await Promise.all([axiosPromise, fetchPromise]);
      setPeople({ axios: axiosResponse, fetch: fetchResponse });
    } catch (error) {
      console.error(`Error en comparación: ${error.message}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [isLoading, url]);

  const handleGender = (event) => setGender(event.target.value);
  const handleCountry = (event) => setCountry(event.target.value);
  const handleFicha = (person) => setSelectedPerson(person);
  const cerrarFicha = () => setSelectedPerson(null);

  return (
    <div className="App">
      <h1>Random People</h1>
      <SearchForm handleGender={handleGender} handleCountry={handleCountry} country={country} />

      <div className="App-controls">
        <button onClick={findPeopleAxios} disabled={isLoading} className="btn">
          {isLoading && loadingType === 'axios' ? "Cargando..." : "Buscar con Axios"}
        </button>
        <button onClick={findPeopleFetch} disabled={isLoading} className="btn">
          {isLoading && loadingType === 'fetch' ? "Cargando..." : "Buscar con Fetch"}
        </button>
        <button onClick={compareRequests} disabled={isLoading} className="btn">
          {isLoading && loadingType === 'compare' ? "Cargando..." : "Comparar Axios vs Fetch"}
        </button>
      </div>

      <OrdenarPor setSortBy={setSortBy} />
      <VisualizarTiempos timeAxios={timeAxios} timeFetch={timeFetch} />

      <div className="App-results">
        <div className="result-section">
          <h2>Resultados con Axios</h2>
          {isLoading && loadingType === 'axios' && <p>Cargando datos...</p>}
          <div className="people-grid">
            {people.axios.length > 0 ? (
              sortPeople(people.axios, sortBy).map(person => (
                <Person key={person.login.uuid} person={person} onClick={() => handleFicha(person)} />
              ))
            ) : (
              !isLoading && <p>No hay resultados</p>
            )}
          </div>
        </div>

        <div className="result-section">
          <h2>Resultados con Fetch</h2>
          {isLoading && loadingType === 'fetch' && <p>Cargando datos...</p>}
          <div className="people-grid">
            {people.fetch.length > 0 ? (
              sortPeople(people.fetch, sortBy).map(person => (
                <Person key={person.login.uuid} person={person} onClick={() => handleFicha(person)} />
              ))
            ) : (
              !isLoading && <p>No hay resultados</p>
            )}
          </div>
        </div>
      </div>

      {selectedPerson && <FichaPersonal person={selectedPerson} onClose={cerrarFicha} />}
    </div>
  );
}

export default App;
