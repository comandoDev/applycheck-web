import { IActionPlan } from "@/interfaces/ActionPlan"

const ModalInfoContent = ({ actionPlan }: { actionPlan: IActionPlan }) => {
    return (
        <div>
            <div className="flex flex-col" key={actionPlan.id}>
                <div className="flex flex-col mb-3">
                    <span className="text-principal mb-1">O que será feito?</span>
                    <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.plan || '-'}</div>
                </div>
                <div className="flex flex-col mb-3">
                    <span className="text-principal mb-1">Por que será feito?</span>
                    <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.reason || '-'}</div>
                </div>
                <div className="flex flex-col mb-3">
                    <span className="text-principal mb-1">Onde será feito?</span>
                    <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.place || '-'}</div>
                </div>
                <div className="flex flex-col mb-3">
                    <span className="text-principal mb-1">Quando será feito?</span>
                    <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.date ? new Date(actionPlan.date!).toLocaleDateString('pt-br') : '-'}</div>
                </div>
                <div className="flex flex-col mb-3">
                    <span className="text-principal mb-1">Quem fará?</span>
                    <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.workResponsible || '-'}</div>
                </div>
                <div className="flex flex-col mb-3">
                    <span className="text-principal mb-1">Quanto custará?</span>
                    <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.price || '-'}</div>
                </div>
                <div className="flex flex-col mb-3">
                    <span className="text-principal mb-1">Responsável?</span>
                    <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.generalResponsible || '-'}</div>
                </div>
                <div className="flex flex-col mb-3">
                    <span className="text-principal mb-1">Notificar Gestores?</span>
                    <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.notifyManagers || '---' ? 'Sim' : 'Não'}</div>
                </div>
            </div>
        </div>
    )
}

export default ModalInfoContent