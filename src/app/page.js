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

// Agrega este estado junto a los demás (puedes ponerlo debajo de 'actividades')
const [imagenExpandida, setImagenExpandida] = useState(null);

// Función para cerrar el modal
const cerrarModal = () => setImagenExpandida(null);


// 📦 DATOS ORGANIZADOS (Rutas normalizadas)
const carpetaData = {
    "titulo": [
      { "id": 101, "imagen": "/imagenes/caratula.jpeg", "descripcion": "Portada oficial: Proyecto de Feria de Ciencias" }
    ],
    "resumen": [
      { "id": 201, "imagen": "/imagenes/resumendelproyecto.jpeg", "descripcion": "Documentación: Resumen del proyecto (Página 1)" },
      { "id": 202, "imagen": "/imagenes/resumendelproyecto1.jpeg", "descripcion": "Documentación: Resumen del proyecto (Página 2)" },
      { "id": 203, "imagen": "/imagenes/6.jpeg", "descripcion": "29/05/26: Inicio del proyecto tras la visita al campo. Definición de objetivos, selección grupal del tema basado en la observación de animales y cultivos, y debate sobre la importancia de la investigación confiable." },
      { "id": 205, "imagen": "/imagenes/8.jpeg", "descripcion": "05/06/26: Desarrollo técnico del juego didáctico mediante el reciclaje de cartón. Fase de corrección de datos, organización de materiales y diseño de la estrategia de exposición para la feria." },
      { "id": 206, "imagen": "/imagenes/9.jpeg", "descripcion": "08/06/26: Etapa de investigación profunda. Análisis y selección de datos clave integrando conocimientos de Ciencias Agrarias e Inglés." },
      { "id": 207, "imagen": "/imagenes/10.jpeg", "descripcion": "Finalización de la curaduría de contenidos y asignación de roles. Organización colaborativa para asegurar que cada integrante aporte de manera responsable al resultado final." }
    ],
    "pruebas": [
      { "id": 301, "imagen": "/imagenes/pruebasytrabajos.jpeg", "descripcion": "Archivo de evidencias: Apuntes, borradores y evaluaciones del proceso" },
      { "id": 302, "imagen": "/imagenes/herramientas.jpeg", "descripcion": "Recurso visual: Glosario ilustrado de herramientas de huerta" },
      { "id": 303, "imagen": "/imagenes/vegetals.jpeg", "descripcion": "Clasificación botánica: Fichas técnicas de hortalizas y cultivos" },
      { "id": 304, "imagen": "/imagenes/animals.jpeg", "descripcion": "Estudio de campo: Registro de observaciones sobre animales de granja" }
    ],
    "souvenirs": [
      { "id": 401, "imagen": "/imagenes/souvenirs.jpeg", "descripcion": "Cierre del proyecto: Conclusiones finales y entrega de recordatorios" }
    ]
  };
  

  

  // 📋 SECCIONES QUE SE VAN A RENDERIZAR EN LA PÁGINA
  const secciones = [
    { nombre: "Título del proyecto", data: carpetaData.titulo },
    { nombre: "Resumen del proyecto", data: carpetaData.resumen },
    { nombre: "Pruebas y trabajos", data: carpetaData.pruebas },
    { nombre: "Proceso de souvenirs", data: carpetaData.souvenirs },
  ];



  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-pink-100 text-gray-800 text-center p-5">

<div className="flex flex-col items-center justify-center gap-3">
  <img 
    src="/imagenes/vaquita.png" 
    alt="Vaquita" 
    className="w-24 h-24 object-contain" 
  />
  <h1 className="text-3xl mb-5">🎲 Perinola Inglés 🎲</h1>
</div>

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


<div className="mt-16 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
        📘 Carpeta de Campo
      </h1>

      {secciones.map((sec, i) => (
        <div key={i} className="mb-14">
          {/* Nombre de la sección */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-200">
            {sec.nombre} 
            <span className="text-sm font-normal text-gray-500 ml-2">({sec.data.length} elementos)</span>
          </h2>

          {/* Grilla automática de 1 columna en celular, 2 en tablets y 3 en monitores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sec.data.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Contenedor de la imagen con tamaño fijo para que no se deforme la grilla */}
                <div className="w-full h-56 bg-gray-100">
                  <img 
                    src={act.imagen} 
                    alt={act.descripcion} 
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform" 
                    loading="lazy"
                    onClick={() => setImagenExpandida(act)} // <--- Esto activa el holder
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Error+en+ruta"; }}
                  />
                </div>
                
                {/* Texto de la tarjeta */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {act.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>



{/* 🖼️ HOLDER / MODAL DE IMAGEN */}
{imagenExpandida && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
    onClick={cerrarModal} // Cierra al hacer clic afuera
  >
    <div className="relative max-w-4xl w-full flex flex-col items-center">
      {/* Botón de cerrar */}
      <button 
        className="absolute -top-12 right-0 text-white text-4xl font-bold hover:text-gray-300"
        onClick={cerrarModal}
      >
        ×
      </button>

      {/* Imagen en grande */}
      <img 
        src={imagenExpandida.imagen} 
        alt={imagenExpandida.descripcion} 
        className="max-h-[80vh] rounded-lg shadow-2xl object-contain"
      />

      {/* Descripción abajo */}
      <div className="mt-4 bg-white/20 p-4 rounded-xl backdrop-blur-md w-full text-center">
        <p className="text-white text-lg font-medium">
          {imagenExpandida.descripcion}
        </p>
      </div>
    </div>
  </div>
)}

    </main>

    
  );

  
}

