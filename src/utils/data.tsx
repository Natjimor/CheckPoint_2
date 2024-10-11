export interface Moon {
    id: string;
    name: string;
  }
  
  export interface BodyData {
    id: string;
    englishName: string;
    mass?: {
      massValue: number;
    };
    density?: number;
    gravity?: number;
    diameter?: number;
    moons?: Moon[];
    isPlanet?: boolean;
  }  
  
  export const fetchBodies = async (): Promise<BodyData[]> => {
    try {
      const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data.bodies;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error desconocido');
    }
  };  