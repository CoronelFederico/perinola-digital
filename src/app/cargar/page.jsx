"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Cargar() {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [seccion, setSeccion] = useState("");
  const [actividades, setActividades] = useState([]);
  

  const subir = async () => {
    if (!file || !desc || !seccion) {
      setMensaje("Completá todos los campos");
      return;
    }

    const nombre = Date.now() + "-" + file.name;

    const { error: errorImg } = await supabase.storage
      .from("fotos")
      .upload(nombre, file);

    if (errorImg) {
      setMensaje("Error al subir imagen");
      return;
    }

    const { data } = supabase.storage
      .from("fotos")
      .getPublicUrl(nombre);

    const url = data.publicUrl;

    const { error } = await supabase.from("actividades").insert([
      {
        descripcion: desc,
        imagen: url,
        seccion: seccion,
      },
    ]);

    if (error) {
      setMensaje("Error al guardar");
      return;
    }

    setMensaje("✅ Subido correctamente");
    setDesc("");
    setFile(null);
    setSeccion("");
  };

  useEffect(() => {
  const cargar = async () => {
    const { data } = await supabase.from("actividades").select("*");

    if (data) setActividades(data);
  };

  cargar();
}, []);


const eliminar = async (id, imagenUrl) => {
  // 🧠 borrar de la base de datos
  await supabase.from("actividades").delete().eq("id", id);

  // 📸 borrar imagen del storage
  const nombre = imagenUrl.split("/").pop();
  await supabase.storage.from("fotos").remove([nombre]);

  window.location.reload();

  // 🔄 actualizar pantalla
  setActividades(actividades.filter(a => a.id !== id));
};
  
  return (
<div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-2xl mb-5">📸 Subir actividad</h1>

    <input
  type="file"
  onChange={(e) => setFile(e.target.files[0])}
  className="mb-4 w-72 p-2 rounded-xl bg-white border border-gray-300 text-gray-700 shadow-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-400 file:text-white hover:file:bg-purple-500"
/>

<textarea
  placeholder="¿Qué hicieron?"
  value={desc}
  onChange={(e) => setDesc(e.target.value)}
  className="w-72 p-3 rounded-xl mb-3 bg-white border border-gray-300 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
/>

<select
  value={seccion}
  onChange={(e) => setSeccion(e.target.value)}
  className="w-72 p-2 rounded-xl mb-3 bg-white border border-gray-300 text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-300"
>
  <option value="">Seleccionar sección</option>
  <option value="titulo">Título</option>
  <option value="resumen">Resumen del proyecto</option>
  <option value="pruebas">Pruebas y trabajos</option>
  <option value="souvenirs">Proceso de souvenirs</option>
</select>

<button
  onClick={subir}
  className="w-72 px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition shadow-md"
>
  Subir actividad
</button>

      {mensaje && <p className="mt-3">{mensaje}</p>}


      <div className="mt-10 w-full max-w-xl">
  <h2 className="text-xl mb-4">🗂 Actividades cargadas</h2>

  {actividades.map((act) => (
    <div
      key={act.id}
      className="bg-white p-3 rounded-xl shadow mb-3 flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-gray-700">{act.descripcion}</p>
        <p className="text-xs text-gray-400">{act.seccion}</p>
      </div>

      <button
        onClick={() => eliminar(act.id, act.imagen)}
        className="bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500"
      >
        ❌
      </button>
    </div>
  ))}
</div>
    </div>




  );


  
}