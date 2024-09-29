import { useEffect, useState } from "react"
import { typeFieldInput, propsFormularioEditarAgregar } from "../interfaces"
import { useForm } from "react-hook-form"
import useFieldStore from "../store/store"

const FormularioEditarAgregar = ({
  campo,
  toggleModalEditarCampo,
  toggleModalAgregarCampo,
}: propsFormularioEditarAgregar) => {
  const { addCampo, editarCampo } = useFieldStore()
  const [mostrarTextArea, setMostrarTextArea] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<typeFieldInput>()

  const validarSelect = (value: string) => {
    if (value === "radio" || value === "checkbox") {
      setMostrarTextArea(true)
    } else {
      setMostrarTextArea(false)
    }
  }

  const onSubmit = (data: typeFieldInput) => {
    if (campo) {
      editarCampo(data)
    } else {
      addCampo(data)
    }
    if (toggleModalEditarCampo) toggleModalEditarCampo()
    if (toggleModalAgregarCampo) toggleModalAgregarCampo()
    setMostrarTextArea(false)
    reset()
  }

  useEffect(() => {
    setValue("type", campo?.type ? campo.type : "text")
    if (campo && campo.options) {
      setMostrarTextArea(true)
      setValue("options", campo.options)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className="text-sm font-bold">Nombre:</p>
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
          value={campo?.name}
          {...register("name", { required: "El nombre es obligatorio" })}
          placeholder="Ingrese el nombre del campo"
          readOnly={!!campo}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <p className="text-sm font-bold">Tipo:</p>
        <select
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
          {...register("type", {
            required: "El tipo es obligatorio",
            onChange: (e) => validarSelect(e.target.value),
          })}
        >
          <option value="text">Texto</option>
          <option value="number">Número</option>
          <option value="radio">Opcion multiple (radio button)</option>
          <option value="checkbox">Opcion multiple (checkbox)</option>
        </select>
        {errors.type && <p>{errors.type.message}</p>}
      </div>

      {mostrarTextArea && (
        <div>
          <p className="text-sm font-bold">
            Opciones (Separar opciones con ";") :
          </p>
          <textarea
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
            {...register("options", {
              required: "Las opciones son obligatorias",
            })}
            placeholder="Ingrese las opciones"
          />
          {errors.options && <p>{errors.options.message}</p>}
        </div>
      )}

      <input
        className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
        type="submit"
        value={campo ? "Editar campo" : "Guardar campo"}
      />
    </form>
  )
}

export default FormularioEditarAgregar
