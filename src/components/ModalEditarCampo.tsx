import { propsFormularioEditarAgregar } from "../interfaces"
import FormularioEditarAgregar from "./FormularioEditarAgregar"

const ModalEditarCampo = ({
  toggleModalEditarCampo,
  campo,
}: propsFormularioEditarAgregar) => {
  return (
    <div className="modalContainer" onClick={() => {if(toggleModalEditarCampo) toggleModalEditarCampo()}}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between">
          <h2 className="text-center py-4 text-xl font-bold">Editar Campo</h2>
          <button onClick={() => {if(toggleModalEditarCampo) toggleModalEditarCampo()}}>X</button>
        </div>
        <FormularioEditarAgregar
          campo={campo}
          toggleModalEditarCampo={toggleModalEditarCampo}
        />
      </div>
    </div>
  )
}

export default ModalEditarCampo
