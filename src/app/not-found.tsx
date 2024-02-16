'use client'

import Storage from "@/utils/Storage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const NotFound = () => {
    const router = useRouter()
    
    useEffect(() => {
        const token = Storage.getUserToken()

        if (!token) return router.push('/login/manager')
    
        return router.push('/auth/records')
    }, [])

    return (
        <>
        </>
    )
}

export default NotFound