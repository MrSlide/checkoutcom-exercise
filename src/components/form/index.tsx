import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import styles from './styles.module.css'

import type { FieldValues } from 'react-hook-form'

interface Props {
  defaultValues?: Partial<FieldValues>,
  onSubmit: (data: FieldValues, event: React.FormEvent<HTMLFormElement>)=> void | Promise<void>,
}

export default function Form(
  props: React.PropsWithChildren<Props>,
): React.ReactElement {
  const { children, defaultValues, onSubmit } = props

  const form = useForm({
    defaultValues,
  })

  return (
    <FormProvider {...form}>
      <form className={styles.form} noValidate onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}
