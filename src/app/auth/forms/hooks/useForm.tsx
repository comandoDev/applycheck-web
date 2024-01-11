'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { IFormContext } from './formContext';
import EmployeeRepository from '@/Repositories/EmployeeRepository';
import { message } from 'antd';
import { IRecord, IRecordStep } from '@/interfaces/Record';
import { IForm } from '@/interfaces/Form';

const FormContext = createContext<IFormContext | null>(null)

export const FormContextProvider = ({ children }: { children: ReactNode }) => {
  // {
  //   steps: [
  //     {
  //       title: '01 - ORGANIZAÇÃO E LIMPEZA',
  //       order: 1,
  //       fields: [
  //         {
  //           key: 'Corredores Limpos, piso seco e sem resíduos da operação ou produtos ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Possue coleta Seletiva ?',
  //           type: InputType.number,
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Bags para armazenagem de recicláveis estão sinalizadas ?',
  //           type: InputType.text,
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Emidiações do Armazem e Patio limpo ?',
  //           type: InputType.date,
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         }
  //       ]
  //     },
  //     {
  //       title: '02 - EDIFICAÇÃO',
  //       order: 2,
  //       fields: [
  //         {
  //           key: 'Os pisos das áreas de armazenagem estão adequados? (Sem fissuras e sem desníveis ./degraus? / As juntas de vedação do piso estão em bom estado? /  Garantem vedação?)',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Teto do armazém está em boas condições ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'As paredes  estão bem conservadas? ( alvenaria e pintura)',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Niveladoras estão integras ? Sistema de elevação operante sem vazamentos (Se Hidraulicos)',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Portões das docas estão integras e operantes ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'As instalações elétricas encontram-se em bom estado? A iluminação é adequada para a operação (sem lâmpadas queimadas)?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         }
  //       ]
  //     },
  //     {
  //       title: '03 - EMPILHADEIRAS E TRANSPALETEIRAS',
  //       order: 3,
  //       fields: [
  //         {
  //           key: 'O check-list de inspeção dos equipamentos de movimentação de carga (Empilhadeiras Retratil, Frontal e Transpaleteiras estão sendo realizados conforme procedimento?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Sala de baterias, iluminação, exaustor, carregadores em boas condições ?  ',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Operadores de empilhadeiras estão com identificação de habilitação para sua condução?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Equipamentos para movimentação de Carga possuem local apropriado para estacionar ? Local com Identificação ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         }
  //       ]
  //     },
  //     {
  //       title: '04 - TRANSPORTES E MANUSEIO',
  //       order: 4,
  //       fields: [
  //         {
  //           key: 'Veiculos antes do carregamento, está sendo realizado o checklist Pré e Pós Carregamento ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Veiculos quando estacionado na doca, está com o calço ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Esta sendo ultizado a escada para amarração de carga ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'A sala de motoristas está em condições adequadas (limpeza, recursos minimos para descanso e espera de carga e descarga)?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Motoristas utilizam a sala de motoristas ? ',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         }
  //       ]
  //     },
  //     {
  //       title: '05 - ARMAZENAMENTO',
  //       order: 5,
  //       fields: [
  //         {
  //           key: 'Paletes quando remontadas (blocados) obedecem regras de empilhamento máximo e não danificam os produtos ou as embalagens das camadas inferiores?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Os paletes que estão na área de picking e estruturas porta paletes (a partir do 2º nível) estão bem strechados ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Os paletes alinhados com pintura no chão ? É garantida distância mínima de 50 cm das paredes ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Produtos avariados estão armazenados no local identificado ? . ',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Produtos solidos estão posicionados acima dos produtos liquididos ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Existem pallets quebrados ou fora do limite de tolerância do procedimento ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Tambores de 200l estão sendo alocados apenas nos niveis do solo e primeiro nível?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: "IBC's estão sendo alocados apenas no nível do solo ?",
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Estutrura porta pallet sem Amassados/Quebrados ou fora dos padrões estabelecidos em procedimento ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Os corredores estão desobstruídos ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         }
  //       ]
  //     },
  //     {
  //       title: '06 EQUIPAMENTOS E SINALIZAÇÃO DE SEGURANÇA',
  //       order: 6,
  //       fields: [
  //         {
  //           key: 'Os kits de emergência para contenção estão completos e disponíveis nos locais definidos? Esta com evidencias do checklist diario do kit ? ',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Chuveiros Lava olhos está com bom aspecto ? Limpeza e condições ? E com checklist de teste preenchido ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Há evidência de inspeções mensais nos equipamentos de emergência (extintores, chuveiro lava-olhos, portas de emergência e hidrantes) ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Os equipamentos de segurança (extintores, hidrantes) estão desobstruídos?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'Os corredores do armazém estão desobstruídos?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: 'As áreas demarcadas estão visíveis no piso (transito pedestres, áreas de armazenagem, áreas dos extintores, etc. ) ?',
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         },
  //         {
  //           key: "Há sinalizações de segurança? (proibido fumar, proibido comer, uso de EPI's, rotas de fuga, extintores e hidrantes, etc.)",
  //           type: InputType.select,
  //           options: [
  //             {
  //               key: 'CONFORME'
  //             },
  //             {
  //               key: 'NÃO CONFORME',
  //               nonCompliance: true
  //             },
  //             {
  //               key: 'NÃO SE APLICA'
  //             }
  //           ],
  //           attachFile: true,
  //           actionPlan: true,
  //           observation: true
  //         }
  //       ]
  //   }],
  //   title: 'Titulo',
  //   tenantId: 'efa414bc-77c5-44f1-825f-b8dbf07edc49',
  //   managerId: '071c4a97-1f4c-442f-b43f-304f7ae912bb',
  //   type: FormType.inspeçãoInterna,
  //   totalSteps: 6,
  //   id: '8fa7633e-5ab4-4ff2-a470-1bd0ff284301'
  // }
  const [form, setForm] = useState<IForm>()
  const [record, setRecord] = useState<IRecord>()
  const [lastReachedStep, setLastReachedStep] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<IRecordStep>()
  const [filledFields, setFilledFields] = useState<Array<{ key: string, value: string }>>()

  const findFormById = async (formId: string): Promise<void> => {
    try {
      const response = await EmployeeRepository.getOneForm(formId)
      setForm(response.data.data!.form)
    } catch (error) {
      message.error((error as any).message)
    }
  }

  const findRecordAndSetFilledFields = async (number: number): Promise<void> => {
    const response = await EmployeeRepository.getOneRecord(record?.id!)
    
    const step = response.data.data?.record?.steps?.find(step => step.order === number)

    if (step) {
        const filledValues = step.fields.map(field => {
            return {
                key: field.key,
                value: field.value!
            }
        })

        setFilledFields(filledValues)
    }
  }

  const isRecordFinished = async (): Promise<boolean> => {
    let isFinished = false

    if (lastReachedStep === (form?.totalSteps! - 1)) {
      await EmployeeRepository.updateRecordStep(
          record?.id!,
          currentStep!
      )

      await EmployeeRepository.finishRecord(record?.id!)

      message.success('Checagem concluida com sucesso!')
  
      isFinished = true
    }

    return isFinished
  }

  const formContextProvider = {
    form,
    setForm,
    record,
    setRecord,
    findFormById,
    lastReachedStep,
    setLastReachedStep,
    currentStep,
    setCurrentStep,
    filledFields,
    setFilledFields,
    findRecordAndSetFilledFields,
    isRecordFinished
  }

  return (
    <FormContext.Provider value={formContextProvider}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => useContext(FormContext)