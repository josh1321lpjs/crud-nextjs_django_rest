"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function TaskCard({ task }) {
  const router = useRouter(); //es para forzar la actualización de los datos
  const [edit, setEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(task.title)
  const [newDescription, setNewDescription] = useState(task.desciption)

  const handleDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar esta tarea?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.status == 204) {
        router.refresh();
      }
    }
  };
  const handleTaskDone = async (id) => {
    //console.log(id);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
      {
        method: "POST",
      }
    );
    if (res.status == 200) {
      router.refresh();
    }
  };

  const handleUpdate = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: newTitle, desciption: newDescription }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      //console.log(data);
      //pasar los datos a los estado 
      setNewTitle(data.title)
      setNewDescription(data.desciption)

      setEdit(!edit) //dejar de editar 
  };

  return (
    <div className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200 flex justify-between items-center">
      <div className="flex flex-col">
        {!edit ? (
          <h2 className="font-bold">
            {newTitle}
            {task.done && <span>✅</span>}
          </h2>
        ) : (
          <input
            type="text"
            placeholder={task.title}
            className="p-2 bg-slate-500 border-none outline-none"
            onChange={e => setNewTitle(e.target.value)}
          />
        )}
        {!edit ? (
          <p>{newDescription}</p>
        ) : (
          <textarea
            placeholder={task.desciption}
            className="p-2 bg-slate-500 border-none outline-none w-full"
            rows={1}
            onChange={e => setNewDescription(e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-between gap-x-2">
        {edit && (
          <button
            className="bg-slate-300 text-black rounded-md p-2"
            onClick={() => handleUpdate(task.id)}
          >
            Guardar change
          </button>
        )}

        <button
          className={
            "text-white rounded-md p-2" && task.done
              ? "bg-emerald-500"
              : "bg-rose-600"
          }
          onClick={() => handleTaskDone(task.id)}
        >
          {task.done ? "Desmarcar" : "Marcar"}
        </button>
        <button
          className="bg-red-500 text-white rounded-md p-2"
          onClick={() => handleDelete(task.id)}
        >
          Eliminar
        </button>
        <button
          className="bg-indigo-500 text-white rounded-md p-2"
          onClick={() => setEdit(!edit)}
        >
          Edittar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
