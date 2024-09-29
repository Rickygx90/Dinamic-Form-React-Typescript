import useFieldStore from "../store/store"
import { useState } from "react"
import { typeFieldInput } from "../interfaces"
import ModalEditarCampo from "./ModalEditarCampo"
import SvgEditar from "./SvgEditar"
import SvgBorrar from "./SvgBorrar"
import { Tooltip } from "react-tooltip"
import ModalAgregarCampo from "./ModalAgregarCampo"

const ModalEditarFormulario = () => {
  const [showModalEditarCampo, setShowModalEditarCampo] = useState(false)
  const [showModalAgregarCampo, setShowModalAgregarCampo] = useState(false)
  const [campoAEditar, setCampoAEditar] = useState<typeFieldInput | null>(null)
  const { campos, borrarCampo, setShowModalEditarPersona } = useFieldStore()

  const toggleModalEditarCampo = () =>
    setShowModalEditarCampo(!showModalEditarCampo)

  const toggleModalAgregarCampo = () =>
    setShowModalAgregarCampo(!showModalAgregarCampo)

  const traducirTipo = (tipo: string) => {
    switch (tipo) {
      case "text":
        return "Texto"
      case "number":
        return "Número"
      case "radio":
        return "radio button"
      case "checkbox":
        return "checkbox"
    }
  }

  return (
    <div className="modalContainer" onClick={() => setShowModalEditarPersona()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between">
          <p className="text-center py-4 text-2xl font-bold">
            Editar Formulario Persona
          </p>
          <button onClick={() => setShowModalEditarPersona()}>X</button>
        </div>

        <div>
          <p className="text-center py-4 text-xl font-bold">Editar Campo</p>
          {campos &&
            campos.map((campo) => (
              <div className="my-1 flex" key={campo.name}>
                <div className="w-full flex justify-between border rounded-md font-bold px-3 py-2">
                  <p>{campo.name}</p>
                  <p>({traducirTipo(campo.type)})</p>
                </div>
                <button
                  data-tooltip-id="tooltip-editar-campo"
                  data-tooltip-content="Editar Campo"
                  className="rounded-md py-2 px-4 border text-center hover:bg-slate-700"
                  type="button"
                  onClick={() => {
                    toggleModalEditarCampo()
                    setCampoAEditar(campo)
                  }}
                >
                  <SvgEditar />
                </button>
                <Tooltip id="tooltip-editar-campo" />

                <button
                  data-tooltip-id="tooltip-eliminar-campo"
                  data-tooltip-content="Eliminar Campo"
                  className="rounded-md py-2 px-4 border text-center hover:bg-slate-700"
                  type="button"
                  onClick={() => {
                    borrarCampo(campo)
                  }}
                >
                  <SvgBorrar />
                </button>
                <Tooltip id="tooltip-eliminar-campo" />
              </div>
            ))}
          {showModalEditarCampo && (
            <ModalEditarCampo
              toggleModalEditarCampo={toggleModalEditarCampo}
              campo={campoAEditar}
            />
          )}
        </div>
        <button
          className="w-full rounded-md bg-slate-800 my-2 py-2 px-4 border text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => {
            toggleModalAgregarCampo()
          }}
        >
          Agregar Campo
        </button>
        {showModalAgregarCampo && (
          <ModalAgregarCampo
            toggleModalAgregarCampo={toggleModalAgregarCampo}
          />
        )}
      </div>
    </div>
  )
}

export default ModalEditarFormulario
