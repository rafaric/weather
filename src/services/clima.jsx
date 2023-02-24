const api = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchClima = async (ciudad) => {
  const respuesta = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${api}&q=${ciudad}&aqi=no`
  );
  const response = await respuesta.json();
  return response;
};

export const fetchCondiciones = async () => {
  const respuesta = await fetch(
    "https://www.weatherapi.com/docs/conditions.json"
  );
  const response = await respuesta.json();
  return response;
};
const path = "images/icons";
export const iconos = {
  1000: `${path}/clear.png`,
  1003: `${path}/partialy_cloudy.png`,
  1030: `${path}/neblina.png`,
  1135: `${path}/niebla_ligera.png`,
};
export const tradVientos = {
  E: "Este",
  N: "Norte",
  W: "Oeste",
  S: "Sur",
  SE: "Sureste",
  NE: "Noreste",
  NO: "Noroeste",
  SO: "Suroeste",
  SSE: "Sur-Sur Este",
};
