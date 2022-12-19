import React from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './styles.module.css'

import type { FieldValues } from 'react-hook-form'

interface Props {
  disabled?: boolean,
  id: string,
  max?: number,
  maxLength?: number,
  min?: number,
  minLength?: number,
  name: string,
  required?: boolean,
  step?: number,
  type?: 'email' | 'number' | 'text' | 'text-area',
  validate?: (fieldValue: any, formValues: FieldValues)=> string | undefined,
}

/**
 * Normalizes field values.
 *
 * @param value - The field value
 * @returns The normalized field value
 */
function normalizeValue(value: string): string {
  return value.trim()
}

export default function Input(props: Props): React.ReactElement {
  const {
    disabled,
    id,
    max,
    maxLength,
    min,
    minLength,
    name,
    required,
    step,
    type,
    validate,
  } = props
  const Tag = type === 'text-area' ? 'textarea' : 'input'
  const normalizedType = Tag === 'input' ? type : undefined

  const { getFieldState, getValues, register } = useFormContext()
  const { error } = getFieldState(name)

  // Allows for validating field values that depend on other field values
  const validateFn = React.useCallback(function (value: any): string | undefined {
    if (typeof validate === 'function') {
      return validate(value, getValues())
    }
  }, [getValues, validate])

  return (
    <Tag
      {...register(name, {
        disabled,
        setValueAs: normalizeValue,
        validate: validateFn, // Rely exclusively on a provided validate function which can be more flexible and consistent in providing error messages
      })}
      aria-invalid={typeof error !== 'undefined'}
      className={styles['input']}
      id={id}
      max={max}
      maxLength={maxLength}
      min={min}
      minLength={minLength}
      required={required}
      step={step}
      type={normalizedType}
    />
  )
}
