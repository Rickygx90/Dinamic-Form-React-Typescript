import ModalEditarFormulario from "./components/ModalEditarFormulario"
import FormularioPrincipal from "./components/FormularioPrincipal"
import useFieldStore from "./store/store"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const { showModalEditarPersona } = useFieldStore()
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white h-screen flex flex-col items-center justify-center">
      <ToastContainer style={{ width: "380px", fontSize: "small" }} />
      <FormularioPrincipal />
      {showModalEditarPersona && <ModalEditarFormulario />}
    </div>
  )
}

export default App
