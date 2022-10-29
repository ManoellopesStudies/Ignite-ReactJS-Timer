import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

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
