import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Countdown } from './Countdown'
import { NewCycleForm } from './NewCycleForm'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Must inform the task name!'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle must be a minimum of 5 minutes')
    .max(60, 'The cycle must be a maximum of 60 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  useEffect(() => {
    if (!activeCycle) {
      document.title = `Ignite Pomodoro Timer`
    }
  }, [activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            STOP
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            START
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
