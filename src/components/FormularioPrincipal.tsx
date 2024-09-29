import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import useFieldStore from "../store/store"
import SvgEditar from "./SvgEditar"
import { Tooltip } from "react-tooltip"

const FormularioPrincipal = () => {
  const { campos, setShowModalEditarPersona } = useFieldStore()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      persona: campos,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "persona",
  })

  useEffect(() => {
    //Si la longitud del array "campos" es mayor a la longitud del array "fields" significa que se agrega un campo
    if (campos.length > fields.length) {
      const campoaAgregar = campos.filter(
        (campo) =>
          !fields.some((field) => field.name === campo.name)
      )
      if (campoaAgregar[0]) append(campoaAgregar[0])
    }
    //Si la longitud del array "campos" es menor a la longitud del array "fields" significa que se elimina un campo
    else if (campos.length < fields.length) {
      const campoaEliminar = fields.filter(
        (field) =>
          !campos.some((campo) => campo.name === field.name)
      )
      if (campoaEliminar[0]) remove(fields.indexOf(campoaEliminar[0]))
    }
    //Si la longitud del array "campos" es igual a la longitud del array "fields" significa que se edita un campo
    else {
      fields.forEach((field) => {
        campos.forEach((campo) => {
          if (campo.name === field.name) {
            if (campo.type !== field.type || campo.options !== field.options) {
              const posicionAReemplazar = fields.indexOf(field)
              //primero eliminamos de el array "fields" el campo a editar con su posicion
              remove(posicionAReemplazar)
              //luego agregamos el campo ya modificado al array "fields" con el metodo append
              append(
                campo.options
                  ? { ...field, type: campo.type, options: campo.options }
                  : { ...field, type: campo.type }
              )
            }
          }
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campos])

  const onSubmit = (values: object) => {
    console.log(values)
  }

  return (
    <form className="my-4 w-96" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-2xl py-4 font-bold">Datos Personales</h2>
      {fields.map((field, index) => {
        if (field.type === "radio" || field.type === "checkbox") {
          return (
            <div key={field.id}>
              <div className="flex flex-row items-center">
                <div className="flex flex-col w-full">
                  <p className="mt-2 text-sm font-bold">
                    {field.name}:{" "}
                  </p>
                  <div className="w-full">
                    {field.options?.split(";").map((option) => {
                      return (
                        <label
                          className="w-full my-3 flex flex-row"
                          key={option}
                        >
                          <p className="w-full pl-4">{option}</p>
                          <input
                            {...register(`persona.${index}.value`, {
                              required: `El campo "${field.name}" es obligatorio`,
                            })}
                            className="mr-2"
                            type={field.type}
                            value={option}
                          />
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
              {errors.persona && errors.persona[index] && (
                <p className="text-red-600 text-sm font-bold">
                  {errors.persona[index].value?.message}
                </p>
              )}
            </div>
          )
        }

        return (
          <div key={field.id}>
            <div>
              <p className="mt-2 text-sm font-bold">{field.name}: </p>
              <input
                type={field.type}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
                placeholder={field.name}
                {...register(`persona.${index}.value`, {
                  required: `El campo "${field.name}" es obligatorio`,
                })}
              />
            </div>

            {errors.persona && errors.persona[index] && (
              <p className="text-red-600 text-sm font-bold">
                {errors.persona[index].value?.message}
              </p>
            )}
          </div>
        )
      })}
      <div className="mt-4 flex">
        <input
          className="w-full rounded-md bg-slate-800 py-2 px-4 border text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
          type="submit"
          value="Enviar formulario"
        />
        <button
          data-tooltip-id="tooltip-editar-formulario"
          data-tooltip-content="Editar Formulario"
          className="rounded-md py-2 px-4 border text-center hover:bg-slate-700"
          type="button"
          onClick={() => {
            setShowModalEditarPersona()
          }}
        >
          <SvgEditar />
        </button>
        <Tooltip id="tooltip-editar-formulario" />
      </div>
    </form>
  )
}

export default FormularioPrincipal
