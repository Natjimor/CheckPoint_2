import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBodies, BodyData } from '../../utils/data';
import './detailBody.css';

function DetailBody() {
  const { id } = useParams<{ id: string }>(); // Obtén el ID de la URL
  const [bodyData, setBodyData] = useState<BodyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBodyDetails = async () => {
      setLoading(true);
      try {
        const bodiesData = await fetchBodies();
        const body = bodiesData.find(b => b.id === id);
        setBodyData(body || null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadBodyDetails();
  }, [id]);

  if (loading) {
    return <div>Cargando detalles del cuerpo celeste...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bodyData) {
    return <div>No se encontraron datos para este cuerpo celeste.</div>;
  }

  return (
    <div>
      <h1>{bodyData.englishName}</h1>
      <p>ID: {bodyData.id}</p>
      <div className='isplanet'>{bodyData.isPlanet ? 'Es un planeta' : 'No es un planeta'}</div>
      <div className='mass'>Masa: {bodyData.mass?.massValue} kg</div>
      <div className='gravity'>Gravedad: {bodyData.gravity} m/s²</div>
      <div className='density'>Densidad: {bodyData.density} kg/m³</div>
    </div>
  );
}

export default DetailBody;