import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../card/card';
import { fetchBodies, BodyData } from '../../utils/data';
import './body.css';

type SortCriteria = 'mass' | 'density' | 'gravity' | 'diameter';
type FilterCriteria = 'all' | 'moon' | 'planet';

function Body() {
  const [bodies, setBodies] = useState<BodyData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('mass');
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>('all');

  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const loadBodies = async () => {
      setLoading(true);
      try {
        const bodiesData = await fetchBodies();
        setBodies(bodiesData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadBodies();
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value as SortCriteria);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCriteria(event.target.value as FilterCriteria);
  };

  const sortedBodies = [...bodies].sort((a, b) => {
    switch (sortCriteria) {
      case 'mass':
        return (a.mass?.massValue || 0) - (b.mass?.massValue || 0);
      case 'density':
        return (a.density || 0) - (b.density || 0);
      case 'gravity':
        return (a.gravity || 0) - (b.gravity || 0);
      case 'diameter':
        return (a.diameter || 0) - (b.diameter || 0);
      default:
        return 0;
    }
  });

  const filteredBodies = sortedBodies.filter(body => {
    if (filterCriteria === 'moon') {
      return body.moons && body.moons.length > 0;
    } else if (filterCriteria === 'planet') {
      return body.isPlanet;
    }
    return true;
  });

  const handleBodyClick = (id: string) => {
    navigate(`/cuerpo/${id}`); // Navega a la ruta de detalles
  };

  if (loading) {
    return <div>Cargando cuerpos celestes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2>Bodies</h2>
      <p>Ordered by</p>
      <select onChange={handleSortChange}>
        <option value="mass">Masa</option>
        <option value="density">Densidad</option>
        <option value="gravity">Gravedad</option>
        <option value="diameter">Diámetro</option>
      </select>

      <p>Filter by</p>
      <select onChange={handleFilterChange}>
        <option value="all">Todos</option>
        <option value="moon">Con Luna</option>
        <option value="planet">Planetas</option>
      </select>

      <div>
        {filteredBodies.map(body => (
          <div 
            key={body.id} 
            onClick={() => handleBodyClick(body.id)} // Maneja el clic en el div
            style={{ cursor: 'pointer', margin: '10px', border: '1px solid black', padding: '10px' }} // Estilo del div
          >
            <Card bodyData={body} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Body;