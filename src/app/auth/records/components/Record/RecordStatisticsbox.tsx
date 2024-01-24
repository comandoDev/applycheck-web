'use client'

import { IRecord } from "@/interfaces/Record"
import { Progress, Tooltip } from "antd"
import { useEffect, useState } from "react"

export enum IRecordStatisticsboxStatus {
    active = 'active',
    exception = 'exception',
    success = 'success'
}

export enum IRecordStatisticsboxType {
    dashboard = 'dashboard',
    circle = 'circle',
}

interface IProgress {
    title: string
    info: string
    color: string
}

interface IRecordStatisticsbox {
    title: string
    progress: IProgress
    status: IRecordStatisticsboxStatus
    type: IRecordStatisticsboxType
    percent: number
    lastOne?: boolean
    rawNumber?: number
}

const RecordStatisticsbox = ({ 
    title,
    progress,
    type,
    status,
    percent,
    lastOne,
    rawNumber
 }: IRecordStatisticsbox) => {
    return (
        <div className={`p-5 bg-white shadow-xl flex flex-col rounded-xl flex-1 ${lastOne ? 'mr-0' : 'mr-16'}`}>
            <span className="font-bold">{title}</span>
            <div className="w-full flex justify-center mb-6 mt-6">
                <Tooltip title={progress.title}>
                    <Progress 
                        type={type}
                        status={status}
                        percent={percent}
                        format={(percent) => {
                            if (rawNumber! >= 0) return rawNumber
                            return `${percent}%`
                        }}
                    />
                </Tooltip>
            </div>
            <div className="w-full p-5 bg-[#F2F6FE] rounded-xl">
            <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-${progress.color}-500`}></div>
                    <span className="text-xs ml-2 font-bold">{progress.info}</span>
                </div>
            </div>
        </div>
    )
}

export default RecordStatisticsbox