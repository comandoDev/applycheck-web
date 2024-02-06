'use client'

import { IRecord } from "@/interfaces/Record"
import { Progress, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"

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
    loading?: boolean
}

const RecordStatisticsbox = ({ 
    title,
    progress,
    type,
    status,
    percent,
    lastOne,
    rawNumber,
    loading
 }: IRecordStatisticsbox) => {
    return (
        <div className={`p-5 bg-white shadow-xl flex flex-col rounded-xl flex-1 ${lastOne ? 'mr-0' : 'mr-16'}`}>
            <span className="font-bold">{title}</span>
                <div className="w-full flex justify-center mb-6 mt-6">
                    { !loading ? (
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
                    ) : (
                        <ClipLoader
                            color={'#1677FE'}
                            loading={true}
                            size={120}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    )}
                
            </div>
            <div className="w-full p-5 bg-[#F2F6FE] rounded-xl">
                <div className="flex items-center">
                    <div className='w-2 h-2 rounded-full' style={{ backgroundColor: progress.color }}></div>
                    <span className="text-xs ml-2 font-bold">{progress.info}</span>
                </div>
            </div>
        </div>
    )
}

export default RecordStatisticsbox