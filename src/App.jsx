import { useState, useEffect } from "react";
import "./App.css";
import More from "./components/More";
import { fetchClima, fetchCondiciones, iconos } from "./services/clima";

function App() {
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("");
  const [spanishCondition, setSpanishCondition] = useState("");
  const [weatherCodes, setWeatherCodes] = useState(null);
  const [mostrar, setMostrar] = useState(true);
  const [ciudad, setCiudad] = useState("Resistencia");
  const clima = async () => {
    const { current } = await fetchClima(ciudad);
    setWeather(current);
    console.log(current);
  };
  function handleChange(e) {
    setCiudad(e.target.value);
  }
  function show() {
    setMostrar(!mostrar);
    console.log(mostrar);
  }
  const condiciones = async () => {
    const conditions = await fetchCondiciones();
    console.log(conditions);
    setWeatherCodes(conditions);
  };
  function handleSubmit(e) {
    e.preventDefault();
    clima();
    condiciones();
  }
  useEffect(() => {
    clima();
    condiciones();
    console.log(ciudad);
  }, []);

  useEffect(() => {
    if (weatherCodes) {
      const pipo = weatherCodes.filter(
        (code) => code.code === weather.condition.code
      );
      console.log(pipo);
      setSpanishCondition(pipo[0].languages[27].day_text);
    }
    if (weather) {
      setIcon(weather.condition.code);
    }
  }, [weatherCodes, weather]);

  return (
    <div className="App w-screen">
      <div className="flex w-screen justify-center">
        <h1 className="text-6xl font-bold text-white text-center py-5">
          Clima en&nbsp;
          <form className="inline" onSubmit={handleSubmit}>
            <input
              type="text"
              className="text-center bg-transparent outline-none rounded-xl w-[14ch] text-white hover:cursor-pointer hover:bg-black transition-all duration-300"
              name="ciudad"
              id="ciudad"
              defaultValue={ciudad}
              onChange={handleChange}
            />
          </form>
        </h1>
      </div>
      {weather && (
        <div className="flex justify-center">
          <div
            className={`container-md ${
              mostrar ? "w-1/2" : "ajuste"
            } flex justify-center flex-col items-center`}
          >
            <div className="glass w-56 h-56">
              <img
                className="w-48 mx-auto mt-[50%] -translate-y-[50%] hover:animate-pulse transition-all duration-800"
                src={iconos[icon]}
                alt=""
              />
            </div>
            <div className="my-8 p-3 text-center">
              <h2 className="text-4xl pb-5 text-white">{spanishCondition}</h2>
              <h2 className="text-2xl text-white">
                Temperatura:&nbsp;{weather.temp_c} <span>º grados</span>
              </h2>
              <h2 className="text-2xl text-white">
                Sensación:&nbsp;
                {weather.feelslike_c} <span>º grados</span>
              </h2>
              <h4></h4>
            </div>
          </div>
          <button
            className="bg-transparent text-white hover:text-black hover:border-gray-200 hover:bg-slate-200 hover:opacity-80 transition-all duration-500 w-12 !outline-none !border-none !pl-1"
            onClick={show}
          >
            <span className="modo text-sm rotate-90">
              {mostrar ? "Más Info" : "Menos Info"}
            </span>
          </button>
          <div
            className={`transition-all duration-700 container-lg w-screen flex ${
              mostrar ? "show" : ""
            }`}
          >
            <More weather={weather} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
