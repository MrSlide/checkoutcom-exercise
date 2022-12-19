import React from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './styles.module.css'

interface Props {
  children: React.ReactElement,
  label: string,
}

export default function InputGroup(props: Props): React.ReactElement {
  const { children, label } = props
  const { id, name } = children.props

  const { getFieldState } = useFormContext()
  const { error } = getFieldState(name)

  return (
    <>
      <label className={styles['input-group__label']} htmlFor={id}>{label}</label>
      {typeof error !== 'undefined'
        ? <span className={styles['input-group__error']} role='alert'>{error.message}</span>
        : undefined}
      {children}
    </>
  )
}
