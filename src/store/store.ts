import { create } from "zustand"
import { toast } from "react-toastify"
import { typeFieldInput, fieldState } from "../interfaces"

function filtrarRepetidos(state: fieldState, data: typeFieldInput) {
  if (!data) return state.campos
  const existeCampo = state.campos.some(
    (campo) => campo.name === data.name
  )
  if (existeCampo) {
    toast.error(`El campo "${data.name}" ya existe en el formulario!`)
    return state.campos
  } else {
    const nuevoCampo = data.options
      ? {
          name: data.name,
          value: "",
          type: data.type,
          options: data.options,
        }
      : { name: data.name, value: "", type: data.type }
    toast.success(`Se agrego "${data.name}" correctamente al formulario!`)
    return [...state.campos, nuevoCampo]
  }
}

function borrarCampo(state: fieldState, data: typeFieldInput) {
  if (!data) return state.campos
  toast.success(`El campo "${data.name}" se elimino correctamente!`)
  return state.campos.filter((campo) => campo.name !== data.name)
}

function editarCampo(state: fieldState, data: typeFieldInput) {
  if (!data) return state.campos
  const posicionAReemplazar = state.campos.findIndex(
    (campo) => campo.name === data.name
  )
  const newArray = [...state.campos]
  newArray[posicionAReemplazar] = data.options
    ? {
        name: data.name,
        value: "",
        type: data.type,
        options: data.options,
      }
    : { name: data.name, value: "", type: data.type }
  toast.success(`El campo "${data.name}" se edito correctamente!`)
  return newArray
}

// Creamos la tienda usando Zustand
const useFieldStore = create<fieldState>()((set) => ({
  campos: [{ name: "Nombres", value: "", type: "text" }],
  showModalEditarPersona: false,
  setShowModalEditarPersona: () =>
    set((state) => ({
      showModalEditarPersona: !state.showModalEditarPersona,
    })),
  addCampo: (data) =>
    set((state) => ({
      campos: filtrarRepetidos(state, data),
    })),
  borrarCampo: (data) =>
    set((state) => ({
      campos: borrarCampo(state, data),
    })),
  editarCampo: (data) =>
    set((state) => ({
      campos: editarCampo(state, data),
    })),
}))

export default useFieldStore
