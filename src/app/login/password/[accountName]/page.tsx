import SetEmployeePasswordForm from "../../components/SetEmployeePasswordForm"

const SetEmployeePassword = ({ params }: { params: { accountName: string } }) => {
    return (
        <div className="h-screen w-full p-10 flex justify-center items-center">
            <div>
                <div className="text-principal font-bold text-3xl w-full mb-8 flex justify-center items-center">
                    <div className="mr-1">
                        <img src="https://denunc.s3.sa-east-1.amazonaws.com/8c62d577-f36f-4a5d-883d-2a56cb5262ea-Prancheta 1@4x 1.png" />
                    </div>
                    <span>Cadastrar Senha</span>
                </div>
                <SetEmployeePasswordForm accountName={params.accountName} />
            </div>
        </div>
    )
}

export default SetEmployeePassword