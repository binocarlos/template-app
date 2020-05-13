import React from 'react'

import FormWrapper from './Wrapper'
import Render from './Render'

const Form = ({
  schema,
  initialValues,
  error,
  onSubmit,
  children = () => {},
}) => {
  return (
    <FormWrapper
      schema={ schema }
      initialValues={ initialValues }
      onSubmit={ onSubmit }
    >
      {
        ({
          isValid,
          values,
          errors,
          showErrors,
          touched,
          onSubmit,
          onSetFieldValue,
        }) => {
          return (
            <>
              <Render
                fullHeight
                schema={ schema }
                error={ error }
                isValid={ isValid }
                values={ values }
                errors={ errors }
                touched={ touched }
                showErrors={ showErrors }
                onSetFieldValue={ onSetFieldValue }
              />
              {
                children({
                  isValid,
                  onSubmit,
                })
              }
            </>
          )
        }
      }
    </FormWrapper>
  )
}

export default Form