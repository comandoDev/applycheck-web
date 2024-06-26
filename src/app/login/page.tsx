import EmployeeForm from "./components/EmployeeForm"

const SignIn = () => {
    return (
        <div className="h-screen w-full p-10 flex justify-center items-center">
            <div>
                <div className="text-principal font-bold text-5xl w-full mb-8 flex justify-center items-center">
                    <div className="mr-1">
                        <img src="https://denunc.s3.sa-east-1.amazonaws.com/8c62d577-f36f-4a5d-883d-2a56cb5262ea-Prancheta 1@4x 1.png" />
                    </div>
                    <span>AuditLis</span>
                </div>
                <EmployeeForm />
            </div>
        </div>
    )
}

export default SignIn