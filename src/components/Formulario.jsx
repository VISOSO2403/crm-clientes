import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = () => {

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
    notas: ''
  })

  const handleSubmit = (valores) => {
    console.log(valores)
  }

  return (
    // Contenedor de todo el formulario
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar nuevo cliente</h1>

      {/* Inicio del Formulario utilizando libreria Formik */}
      <Formik
        initialValues={{
          nombre: '',
          empresa: '',
          correo: '',
          telefono: '',
          notas: ''
        }}
        onSubmit={ (values) => {
          handleSubmit(values)
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
            value="Agregar Cliente"
            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
          />
        </Form>
        )}}
      </Formik>
    </div>
  )
}

export default Formulario