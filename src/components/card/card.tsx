import './card.css';

interface CardProps {
  bodyData: {
    englishName: string;
    density?: number;
    gravity?: number;
    mass?: {
      massValue: number;
    };
  };
}

function Card({ bodyData }: CardProps) {
  return (
    <div>
      <h3>{bodyData.englishName}</h3>
      <div className='properties'>
        <div className='density'>
          <p>Density </p>
          <input type="range" name="density" id="" min={0} max={100} />
          <p>{bodyData.density ? bodyData.density : 'N/A'}</p> 
        </div>
        <div className='gravity'>
          <p>Gravity </p>
          <input type="range" name="gravity" id="" min={0} max={100} />
          <p>{bodyData.gravity ? bodyData.gravity : 'N/A'}</p> 
        </div>
        <div className='mass'>
          <p>Mass </p>
          <input type="range" name="mass" id="" min={0} max={bodyData.mass ? bodyData.mass.massValue : 100} />
          <p>{bodyData.mass ? bodyData.mass.massValue : 'N/A'}</p> 
        </div>
      </div>
    </div>
  );
}

export default Card;