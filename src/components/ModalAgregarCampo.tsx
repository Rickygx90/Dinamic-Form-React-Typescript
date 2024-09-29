import { propsFormularioEditarAgregar } from "../interfaces"
import FormularioEditarAgregar from "./FormularioEditarAgregar"

const ModalAgregarCampo = ({
  toggleModalAgregarCampo,
}: propsFormularioEditarAgregar) => {
  return (
    <div
      className="modalContainer"
      onClick={() => {
        if (toggleModalAgregarCampo) toggleModalAgregarCampo()
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between">
          <h2 className="text-center py-4 text-xl font-bold">Agregar Campo</h2>
          <button
            onClick={() => {
              if (toggleModalAgregarCampo) toggleModalAgregarCampo()
            }}
          >
            X
          </button>
        </div>
        <FormularioEditarAgregar
          toggleModalAgregarCampo={toggleModalAgregarCampo}
        />
      </div>
    </div>
  )
}

export default ModalAgregarCampo
