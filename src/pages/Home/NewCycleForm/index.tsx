import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const newCycleFormValidationSchema = Zod.object({
    task: zod.string().min(1, 'Must inform the task name!'),
    minutesAmount: zod
      .number()
      .min(5, 'The cycle must be a minimum of 5 minutes')
      .max(60, 'The cycle must be a maximum of 60 minutes'),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="workingOn">Will work on</label>
      <TaskInput
        type="text"
        id="workingOn"
        placeholder="Project name"
        // 2 !! antes da variavel converte para boolean se tiver algum valor dentro
        disabled={!!activeCycle}
        {...register('task')}
      />

      <label htmlFor="minutesAmount">for</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeCycle}
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes</span>
    </FormContainer>
  )
}
