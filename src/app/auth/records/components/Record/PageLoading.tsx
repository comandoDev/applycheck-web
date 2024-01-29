import { PuffLoader } from "react-spinners"

const PageLoading = () => {
    return (
        <div className="flex items-center bg-white justify-center w-full h-screen">
            <PuffLoader
                color={'#287AF8'}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default PageLoading