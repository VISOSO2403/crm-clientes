import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
                .min(3, 'El nombre es muy corto')
                .max(20, 'El nombre es muy largo')
                .required('El Nombre del cliente es obligatorio'),
    empresa: Yup.string()
                .required('El Nombre de la empresa es obligatorio'),
    correo: Yup.string()
                .email('Correo no valido')
                .required('El Correo es obligatorio'),
    telefono: Yup.number()
                .positive('Numero no valido')
                .integer('Numero no valido')
                .typeError('El numero no es valido'),
  })

  const handleSubmit = async (valores) => {
    try {
      let respuesta
      if(cliente.id) {
        // Editando un registro
        const url = `http://localhost:4000/clientes/${cliente.id}`
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        })

      } else {
          // Nuevo registro
          const url = 'http://localhost:4000/clientes'
          respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(valores),
            headers: {
              'Content-Type': 'application/json'
            }
          })
      }
      await respuesta.json()
      navigate('/clientes')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    cargando ? <Spinner /> : (
      // Contenedor de todo el formulario
      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agrega nuevo Cliente'}</h1>

        {/* Inicio del Formulario utilizando libreria Formik */}
        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? "",
            empresa: cliente?.empresa ?? "",
            correo: cliente?.correo ?? "",
            telefono: cliente?.telefono ?? "",
            notas: cliente?.notas ?? "",
          }}
          enableReinitialize={true}
          onSubmit={ async (values, {resetForm}) => {
            await handleSubmit(values)
            resetForm()
          }}
          validationSchema={nuevoClienteSchema}
        >

          {({errors, touched}) => {
            return (
          <Form
            className='mt-10'>

            {/* Campo nombre del cliente */}
            <div className='mb-4'>
              <label 
                className='text-gray-800'
                htmlFor='Nombre'
              >Nombre: </label>
              <Field
                id="nombre"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombre del cliente"
                name='nombre'
              />
              {errors.nombre && touched.nombre ? (
                <Alerta>{errors.nombre}</Alerta>
              ) : null}
            </div>

            {/* Campo nombre de la empresa del cliente */}
            <div className='mb-4'>
              <label 
                className='text-gray-800'
                htmlFor='Empresa'
              >Empresa: </label>
              <Field
                id="empresa"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Empresa del cliente"
                name='empresa'
              />
              {errors.empresa && touched.empresa ? (
                <Alerta>{errors.empresa}</Alerta>
              ) : null}
            </div>

            {/* Campo del correo del cliente */}
            <div className='mb-4'>
              <label 
                className='text-gray-800'
                htmlFor='Correo'
              >Correo: </label>
              <Field
                id="email"
                type="email"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Correo del cliente"
                name='correo'
              />
              {errors.correo && touched.correo ? (
                <Alerta>{errors.correo}</Alerta>
              ) : null}
            </div>

            {/* Campo del telefono del cliente */}
            <div className='mb-4'>
              <label 
                className='text-gray-800'
                htmlFor='Telefono'
              >Telefono: </label>
              <Field
                id="telefono"
                type="tel"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Telefono del cliente"
                name='telefono'
              />
              {errors.telefono && touched.telefono ? (
                <Alerta>{errors.telefono}</Alerta>
              ) : null}
            </div>

            {/* Campo de las notas sobre el cliente */}
            <div className='mb-4'>
              <label 
                className='text-gray-800'
                htmlFor='Notas'
              >Notas: </label>
              <Field
                as="textarea"
                id="notas"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                placeholder="Notas del cliente"
                name='notas'
              />
            </div>

            {/* Boton para enviar el formulario */}
            <input
              type="submit"
              value={cliente?.nombre ? 'Editar Cliente' : 'Agrega Cliente'}
              className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer'
            />
          </Form>
          )}}
        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario