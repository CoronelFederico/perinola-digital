"use client";
import { useState } from "react";

export default function Home() {

  // 📚 Categorías
  const categorias = {
    animales: [
      { en: "dog", es: "perro" },
      { en: "cat", es: "gato" },
      { en: "cow", es: "vaca" }
    ],
    colores: [
      { en: "red", es: "rojo" },
      { en: "blue", es: "azul" },
      { en: "green", es: "verde" }
    ],
    numeros: [
      { en: "one", es: "uno" },
      { en: "two", es: "dos" },
      { en: "three", es: "tres" }
    ]
  };

  // 🎮 Estados
  const [categoriaActual, setCategoriaActual] = useState("");
  const [palabra, setPalabra] = useState(null);
  const [respuesta, setRespuesta] = useState("");

  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [turno, setTurno] = useState(1);

  // 🏆 Mejor de 3
  const [rondasP1, setRondasP1] = useState(0);
  const [rondasP2, setRondasP2] = useState(0);
  const [ganador, setGanador] = useState(null);

 const girar = () => {
  if (ganador) return;

  setCargando(true);
  setPalabra(null);

  const keys = Object.keys(categorias);
  const randomCat = keys[Math.floor(Math.random() * keys.length)];
  const lista = categorias[randomCat];
  const randomPalabra = lista[Math.floor(Math.random() * lista.length)];

  // ⏳ Paso 1: mostrando categoría
  setTimeout(() => {
    setCategoriaActual(randomCat);
  }, 1000);

  // ⏳ Paso 2: mostrando palabra
  setTimeout(() => {
    setPalabra(randomPalabra);
    setCargando(false);
  }, 2000);
};
  
const [mensaje, setMensaje] = useState("");

  // ✅ Verificar respuesta
  const verificar = () => {
    if (!palabra || ganador) return;

    if (respuesta.toLowerCase() === palabra.es) {

  if (turno === 1) {
    setP1(p1 + 1);
    const nuevo = rondasP1 + 1;
    setRondasP1(nuevo);
    if (nuevo === 2) setGanador("Jugador 1");
  } else {
    setP2(p2 + 1);
    const nuevo = rondasP2 + 1;
    setRondasP2(nuevo);
    if (nuevo === 2) setGanador("Jugador 2");
  }

  setMensaje("✅ ¡Correcto!");

} else {
  setMensaje(`❌ Incorrecto. Era: ${palabra.es}`);
}

    setTurno(turno === 1 ? 2 : 1);
    setRespuesta("");
  };

  // 🔄 Reiniciar juego
  const reiniciar = () => {
    setP1(0);
    setP2(0);
    setRondasP1(0);
    setRondasP2(0);
    setGanador(null);
    setTurno(1);
    setPalabra(null);
    setRespuesta("");
  };

  const [cargando, setCargando] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-pink-100 text-gray-800 text-center p-5">

      <h1 className="text-3xl mb-5">🎲 Perinola Inglés</h1>

<div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl inline-block mt-5">

  {/* BOTÓN GIRAR (SIEMPRE VISIBLE) */}
  <button
    onClick={girar}
    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg hover:scale-105 transition"
  >
    🎲 Girar
  </button>

   {/* JUEGO */}
  {palabra && (
    <div className="mt-5">
      <p className="text-lg">Categoría: {categoriaActual}</p>

      <h2 className="text-4xl mt-3 font-bold text-purple-600">
        {palabra.en}
      </h2>

      <input
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribí en español"
        className="mt-4 p-3 text-black rounded-xl w-64 shadow"
      />

      <button
        onClick={verificar}
        className="block mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-xl shadow"
      >
        ✅ Verificar
      </button>

      {mensaje && (
        <p className="mt-4 text-lg font-semibold text-yellow-300">
          {mensaje}
        </p>
      )}
    </div>
  )}
</div>
      {/* PUNTAJES */}
      <div className="mt-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl inline-block">
  <h2 className="text-xl mb-3">🏆 Puntajes</h2>

  <p className="text-blue-400">Jugador 1: {p1}</p>
  <p className="text-pink-400">Jugador 2: {p2}</p>

  <div className="mt-4">
    <h2 className="text-lg">
      🎯 Turno:
      <span
        className={`ml-2 px-3 py-1 rounded ${
          turno === 1 ? "bg-blue-600" : "bg-pink-600"
        }`}
      >
        Jugador {turno}
      </span>
    </h2>
  </div>
</div>

      {/* MEJOR DE 3 */}
      <div className="mt-6 bg-white/10 p-5 rounded-xl inline-block">
  <h3 className="text-lg mb-2">🥇 Mejor de 3</h3>

  <p>Jugador 1: {rondasP1}</p>
  <p>Jugador 2: {rondasP2}</p>

  {ganador && (
    <h2 className="text-2xl mt-3 text-green-400 animate-pulse">
      🎉 Ganó {ganador}
    </h2>
  )}
</div>

      {/* REINICIAR */}
      {ganador && (
        <button
          onClick={reiniciar}
          className="mt-5 px-5 py-2 bg-red-600 rounded"
        >
          Reiniciar juego
        </button>
      )}

    </main>
  );
}