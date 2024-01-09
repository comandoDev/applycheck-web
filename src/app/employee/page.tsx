'use client'

import FormBox from './components/FormBox'
import ListSelector from './components/ListSelector'
import { FormType, IForm } from '@/interfaces/Form'

const Home = () => {
  return (
    <>
          {/* <ListSelector /> */}
          <FormBox 
          title={'INSPEÇÃO DE ARMAZEN OPERAÇÃO - REV00'}
          type={FormType.inspeçãoExterna}
          description={'Definir procedimentos e requisitos de inspeção de HSE em armazéns'}
        />
        <FormBox 
          title={'INSPEÇÃO DE ARMAZEN OPERAÇÃO - REV00'}
          type={FormType.inspeçãoExterna}
          description={'Definir procedimentos e requisitos de inspeção de HSE em armazéns'}
        />
        <FormBox 
          title={'INSPEÇÃO DE ARMAZEN OPERAÇÃO - REV00'}
          type={FormType.inspeçãoExterna}
          description={'Definir procedimentos e requisitos de inspeção de HSE em armazéns'}
        />
        <FormBox 
          title={'INSPEÇÃO DE ARMAZEN OPERAÇÃO - REV00'}
          type={FormType.inspeçãoExterna}
          description={'Definir procedimentos e requisitos de inspeção de HSE em armazéns'}
        />
        <FormBox 
          title={'INSPEÇÃO DE ARMAZEN OPERAÇÃO - REV00'}
          type={FormType.inspeçãoExterna}
          description={'Definir procedimentos e requisitos de inspeção de HSE em armazéns'}
        />
    </>
  )
}

export default Home
