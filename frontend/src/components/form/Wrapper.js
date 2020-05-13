import React, { useState, useMemo, useCallback } from 'react'
import { Formik } from 'formik'
import utils from './utils'
import Validate from './validate'

const FormWrapper = ({
  schema,
  initialValues,
  handlers = {},
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
      validate={ handlers.validate }
      onSubmit={ onSubmit }
    >
      {
        ({
          handleSubmit,
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