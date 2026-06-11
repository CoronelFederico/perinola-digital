"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {

    useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase
        .from("actividades")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    };

    test();
  }, []);


  // 📚 Categorías
const categorias = {
  "Herramientas de jardín": [
    { en: "apron", es: "delantal" },
    { en: "ax", es: "hacha" },
    { en: "bucket", es: "balde" },
    { en: "boots", es: "botas" },
    { en: "watering can", es: "regadera" },
    { en: "gardening gloves", es: "guantes de jardinería" },
    { en: "garden fork", es: "horquilla de jardín" },
    { en: "ladder", es: "escalera" },
    { en: "shovel", es: "pala" },
    { en: "wheelbarrow", es: "carretilla" },
    { en: "flower pot", es: "maceta" }
  ],

  "Vegetales": [
    { en: "cabbage", es: "repollo" },
    { en: "spinach", es: "espinaca" },
    { en: "cucumber", es: "pepino" },
    { en: "bell pepper", es: "pimiento" },
    { en: "peas", es: "arvejas" },
    { en: "watercress", es: "berro" },
    { en: "artichoke", es: "alcachofa" },
    { en: "zucchini", es: "zapallito" }
  ],

  "Animales de granja": [
    { en: "cow", es: "vaca" },
    { en: "goat", es: "cabra" },
    { en: "donkey", es: "burro" },
    { en: "horse", es: "caballo" },
    { en: "sheep", es: "oveja" },
    { en: "pig", es: "cerdo" },
    { en: "bull", es: "toro" },
    { en: "rabbit", es: "conejo" },
    { en: "duck", es: "pato" },
    { en: "turkey", es: "pavo" },
    { en: "goose", es: "ganso" },
    { en: "rooster", es: "gallo" }
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


  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("actividades")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setActividades(data);
    };

    cargar();
  }, []);



  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("actividades")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setActividades(data);
    };

    cargar();
  }, []);

  const titulo = actividades.filter(a => a.seccion === "titulo");
  const resumen = actividades.filter(a => a.seccion === "resumen");
  const pruebas = actividades.filter(a => a.seccion === "pruebas");
  const souvenirs = actividades.filter(a => a.seccion === "souvenirs");

  

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


{/* 📘 CARPETA DE CAMPO */}
<div className="mt-16">
  <h1 className="text-3xl font-bold text-center mb-10">
    📘 Carpeta de Campo
  </h1>

  {[
    { titulo: "Título del proyecto", data: titulo },
    { titulo: "Resumen del proyecto", data: resumen },
    { titulo: "Pruebas y trabajos", data: pruebas },
    { titulo: "Proceso de souvenirs", data: souvenirs },
  ].map((sec, i) => (
    <div key={i} className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">
        {sec.titulo}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sec.data.map((act) => (
          <div
            key={act.id}
            className="bg-white p-3 rounded-xl shadow"
          >
            <img src={act.imagen} className="rounded mb-2" />
            <p className="text-gray-700 text-sm">
              {act.descripcion}
            </p>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

    </main>

    
  );

  
}

