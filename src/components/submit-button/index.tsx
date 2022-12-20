import React from 'react'
import { useFormContext } from 'react-hook-form'

import buttonStyles from '../../styles/buttons.module.css'

export default function SubmitButton(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props
  const { formState: { isSubmitting, isValidating } } = useFormContext()

  const busy = isSubmitting || isValidating

  return (
    <button
      aria-busy={busy}
      className={buttonStyles['secondary-button']}
      disabled={busy}
      type='submit'
    >
      {children}
    </button>
  )
}
