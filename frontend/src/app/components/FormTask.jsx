"use client";
import { useState } from "react"
import { useRouter } from "next/navigation";

function FormTask() {
  //Instancia para capturar los estados
  const [title, setTitle] = useState("");
  const [desciption, setDescription] = useState("")
  const router = useRouter()

  //Evento para enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); //cancelar evento por defecto
    //console.log(title, description);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
      {
        method: "POST",
        body: JSON.stringify({ title, desciption }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    //console.log(data);
    router.refresh()
  };

  return (
    <div className="bg-slate-200 p-7 h-fit">
      <form onSubmit={handleSubmit}>
        <h1 className="text-black font-bold">Añadir Tarea</h1>
        <label className="text-xs text-black" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          name="title"
          className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="text-xs text-black" htmlFor="desciption">
          Description:
        </label>
        <textarea
          name="description"
          className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="bg-indigo-500 text-white rounded-md p-2 block w-full">
          Save
        </button>
      </form>
    </div>
  );
}

export default FormTask;
