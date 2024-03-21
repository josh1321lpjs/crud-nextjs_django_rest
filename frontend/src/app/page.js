import FormTask from "./components/FormTask";
import ListTasks from "./components/ListTask";
//sirve para forzar la actualización de los datos guardados en la peticion 
export const dynamic = "force-dynamic"

function HomePage() {
  return (
    <div className="container mx-auto">
      <h1>Tasks App</h1>
      <div className="flex gap-x-10">
        <FormTask />
        <ListTasks />
      </div>
    </div>
  );
}

export default HomePage;
