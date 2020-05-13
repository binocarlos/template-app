import React from 'react'

import FormWrapper from './Wrapper'
import Render from './Render'

const Form = ({
  schema,
  handlers = {},
  initialValues,
  error,
  onSubmit,
  children = () => {},
}) => {
  return (
    <FormWrapper
      schema={ schema }
      initialValues={ initialValues }
      handlers={ handlers }
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
        }) => {
          return (
            <>
              <Render
                fullHeight
                schema={ schema }
                handlers={ handlers }
                error={ error }
                isValid={ isValid }
                values={ values }
                errors={ errors }
                touched={ touched }
                showErrors={ showErrors }
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