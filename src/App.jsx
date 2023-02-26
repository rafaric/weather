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
  /* setTimeout(() => {
    clima();
    condiciones();
  }, 100000); */
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
  }, [weatherCodes]);

  return (
    <div className="App w-screen relative">
      <ul class="background">
        <li>
          <img src="images/bg/snowflake.png" alt="" />
        </li>
        <li>
          <img src="images/icons/night.png" alt="" />
        </li>
        <li>
          <img src="images/icons/clear.png" alt="" />
        </li>
        <li>
          <img src="images/icons/rainy-day.png" alt="" />
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="flex w-screen justify-center">
        <h1 className="text-6xl font-bold text-white text-center py-5 z-10">
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
        <div className={`top-0 left-1 flex ${mostrar ? "noShowC" : "show"}`}>
          <div
            className={`container-md ${
              mostrar ? "noShowC" : "ajuste"
            } flex justify-center flex-col items-center transition-all duration-500`}
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
          <div className="botonout transition-all duration-500">
            <button
              className={`${mostrar ? "" : "modo"} botonin`}
              onClick={show}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={5.2}
                stroke="grey"
                className={`w-6 h-6`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          <div className={`flex w-screen  ${mostrar ? "noShow" : "show"}`}>
            <More weather={weather} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
