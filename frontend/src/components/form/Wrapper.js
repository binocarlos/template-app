import React, { useState, useMemo } from 'react'
import { Formik } from 'formik'
import utils from './utils'
import Validate from './validate'

const FormWrapper = ({
  schema,
  initialValues,
  error,
  children = () => {},
  onSubmit,
}) => {
  const [ showErrors, setShowErrors ] = useState(false)

  const validationSchema = useMemo(() => Validate(schema), [schema])
  const useInitialValues = useMemo(() => utils.getInitialValues(schema, initialValues), [schema, initialValues])

  return (
    <Formik
      initialValues={ useInitialValues }
      validationSchema={ validationSchema }
      validateOnMount
      onSubmit={ onSubmit }
    >
      {
        ({
          handleSubmit,
          setFieldValue,
          isValid,
          values,
          errors,
          touched,
        }) => {
          const submitWrapper = () => {
            setShowErrors(true)
            handleSubmit()
          }
          return (
            <form>
              {
                children({
                  isValid,
                  values,
                  errors,
                  showErrors,
                  touched,
                  onSubmit: submitWrapper,
                  onSetFieldValue: setFieldValue,
                })
              }
            </form>
          )
        }
      }
    </Formik>
  )
}

export default FormWrapper