import React from 'react'
import { useFormContext } from 'react-hook-form'

import buttonStyles from '../../styles/buttons.module.css'

interface Props {
  disabled?: boolean,
}

export default function SubmitButton(props: React.PropsWithChildren<Props>): React.ReactElement {
  const { children, disabled } = props
  const { formState: { isSubmitting, isValidating } } = useFormContext()

  const busy = isSubmitting || isValidating

  return (
    <button
      aria-busy={busy}
      className={buttonStyles['secondary-button']}
      disabled={disabled || busy}
      type='submit'
    >
      {children}
    </button>
  )
}
