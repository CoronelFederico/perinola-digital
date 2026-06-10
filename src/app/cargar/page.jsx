"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Cargar() {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [mensaje, setMensaje] = useState("");

  const subir = async () => {
    if (!file) {
      setMensaje("Seleccioná una imagen");
      return;
    }

    const nombre = Date.now() + "-" + file.name;

    // 📸 SUBIR IMAGEN
    const { error: errorImg } = await supabase.storage
      .from("fotos")
      .upload(nombre, file);

    if (errorImg) {
      setMensaje("Error al subir imagen");
      return;
    }

    // 🔗 OBTENER URL
    const { data } = supabase.storage
      .from("fotos")
      .getPublicUrl(nombre);

    const url = data.publicUrl;

    // 💾 GUARDAR EN BD
    const { error } = await supabase.from("actividades").insert([
      {
        descripcion: desc,
        imagen: url,
      },
    ]);

    if (error) {
      setMensaje("Error al guardar");
      return;
    }

    setMensaje("✅ Subido correctamente");
    setDesc("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-2xl mb-5">📸 Subir actividad</h1>

 <input
  type="file"
  onChange={(e) => setFile(e.target.files[0])}
  className="mb-4 p-2 rounded-xl bg-white/70 border border-purple-200 text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-300 file:text-gray-800 hover:file:bg-purple-400"
/>

<textarea
  placeholder="¿Qué hicieron?"
  value={desc}
  onChange={(e) => setDesc(e.target.value)}
  className="p-3 rounded-xl w-64 mb-3 bg-white/70 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
/>

<button
  onClick={subir}
  className="px-6 py-2 bg-purple-300 text-gray-800 rounded-xl hover:bg-purple-400 transition shadow"
>
  Subir
</button>

      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
}