export type typeFieldInput = {
  name: string
  value: string
  type: string
  options?: string
}

// Definimos el tipo para nuestro estado
export interface fieldState {
  campos: Array<typeFieldInput>
  showModalEditarPersona: boolean
  setShowModalEditarPersona: () => void
  addCampo: (data: typeFieldInput) => void
  borrarCampo: (data: typeFieldInput) => void
  editarCampo: (data: typeFieldInput) => void
}

export interface propsFormularioEditarAgregar {
  toggleModalEditarCampo?: () => void
  toggleModalAgregarCampo?: () => void
  campo?: typeFieldInput | null
}