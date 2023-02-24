import React from "react";
import { tradVientos } from "../services/clima";
import "./more.css";

function More({ weather }) {
  const viento = tradVientos[weather.wind_dir];

  return (
    <>
      {weather && (
        <div className="text-white flex flex-col justify-around font-sans font-extrabold more p-5">
          <p>
            <span>
              <img
                className="w-8 h-8 bg-slate-200 rounded-lg inline mr-4 p-1"
                src="images/icons/humedad.png"
                alt=""
              />
            </span>
            <span>Humedad: </span>
            {weather.humidity}%
          </p>
          <p>
            <span>
              <img
                className="w-8 h-8 bg-slate-200 rounded-lg inline mr-4 p-1"
                src="images/icons/wind-direction.png"
                alt=""
              />
            </span>
            <span>Direccion drl viento: </span>
            {viento}
          </p>
          <p>
            <span>
              <img
                className="w-8 h-8 bg-slate-200 rounded-lg inline mr-4 p-1"
                src="images/icons/wind_speed.png"
                alt=""
              />
            </span>
            <span>Velocidad del viento: </span>
            {weather.wind_kph}km por hora
          </p>
          <p>
            <span>
              <img
                className="w-8 h-8 bg-slate-200 rounded-lg inline mr-4 p-1"
                src="images/icons/indice-uv.png"
                alt=""
              />
            </span>
            <span>indice UV: </span>
            {weather.uv}
          </p>
          <p>
            <span>
              <img
                className="w-8 h-8 bg-slate-200 rounded-lg inline mr-4 p-1"
                src="images/icons/low-visibility.png"
                alt=""
              />
            </span>
            <span>visibilidad: </span>
            {weather.vis_km} km.
          </p>
          <p>
            <span>
              <img
                className="w-8 h-8 bg-slate-200 rounded-lg inline mr-4 p-1"
                src="images/icons/pressure.png"
                alt=""
              />
            </span>
            <span>presion: </span>
            {weather.pressure_mb} milibares
          </p>
        </div>
      )}
    </>
  );
}

export default More;
