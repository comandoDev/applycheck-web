'use client'

import { Modal } from "antd"
import { useState } from "react"
import ActionPlanInputBox from "./ActionPlanInputBox"
import { IField } from "@/interfaces/Form"
import { useActionPlan } from "../../../hooks/ActionPlanContext/useFile"
import { IRecordActionPlan } from "@/interfaces/Record"

const ActionPlanForm = ({ field, actionPlan }: { field: IField, actionPlan?: IRecordActionPlan }) => {
    const actionPlanContext = useActionPlan()

    const [plan, setPlan] = useState<string>(actionPlan?.plan || '')
    const [reason, setReason] = useState<string>(actionPlan?.reason || '')
    const [place, setPlace] = useState<string>(actionPlan?.place || '')
    const [date, setDate] = useState<Date>(actionPlan?.date!)
    const [workResponsible, setWorkResponsible] = useState<string>(actionPlan?.workResponsible || '')
    const [price, setPrice] = useState<string>(actionPlan?.price || '')
    const [generalResponsible, setGeneralResponsible] = useState<string>(actionPlan?.generalResponsible || '')
    const [notifyManagers, setNotifyManagers] = useState<boolean>(actionPlan?.notifyManagers!)
    const [isModalOpen, setIsModalOpen] = useState(true)

    const handleOk = () => {
        actionPlanContext?.setActionPlan({
            date,
            notifyManagers,
            generalResponsible,
            place,
            plan,
            price,
            reason,
            workResponsible
        })

        actionPlanContext?.setFieldKey(field.key)

        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <Modal 
            title="Plano de Ação"
            open={isModalOpen} 
            onOk={handleOk} 
            okText='Confirmar'
            okType="default" 
            cancelText='Cancelar'
            onCancel={handleCancel} 
            className="top-2 w-[50%]"
        >
            <div className="flex flex-col">
                <ActionPlanInputBox name="plan" value={plan} label="O que será feito?" onChange={setPlan} />
                <ActionPlanInputBox name="reason" value={reason} label="Por que será feito?" onChange={setReason} />
                <ActionPlanInputBox name="place" value={place} label="Onde será feito?" onChange={setPlace} />
                <ActionPlanInputBox name="date" value={date} label="Quando será feito?" type="date" onChange={setDate} />
                <ActionPlanInputBox name="workResponsible" value={workResponsible} label="Quem fará?" onChange={setWorkResponsible} />
                <ActionPlanInputBox name="price" value={price} label="Quanto custará?" onChange={setPrice} />
                <ActionPlanInputBox name="generalResponsible" value={generalResponsible} label="Responsável?" onChange={setGeneralResponsible} />
                <div className="mb-3 flex flex-col">
                    <label htmlFor='notifyManagers' className="text-principal mb-2">Notificar Gestores?</label>
                    <select name="notifyManagers" onChange={(e) => setNotifyManagers(Boolean(Number(e.target.value)))}>
                        <option value={1}>Sim</option>
                        <option value={0}>Não</option>
                    </select>
                </div>
            </div>
        </Modal>
    )
}

export default ActionPlanForm