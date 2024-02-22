import React, { useState, useRef, useEffect } from 'react'
import { useSignature } from '../../hooks/signatureContext/useSignature'

interface SignatureCanvasProps {
  setValues: (value: string) => void
}

const SignatureCanvas = () => {
  const signatureContext = useSignature()
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    if (!signatureContext?.clearCanvas) return

    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')

      if (!context) {
        return
      }

      context.clearRect(0, 0, 1000, 1000)
    }

    signatureContext.setClearCanvas(false)
  }, [signatureContext?.clearCanvas])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    startDrawing(e.pageX - canvasRef.current!.offsetLeft, e.pageY - canvasRef.current!.offsetTop)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      draw(e.pageX - canvasRef.current!.offsetLeft, e.pageY - canvasRef.current!.offsetTop)
    }
  }

  const handleMouseUp = () => {
    stopDrawing()
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0]
    startDrawing(touch.pageX - canvasRef.current!.offsetLeft, touch.pageY - canvasRef.current!.offsetTop)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const touch = e.touches[0]
      draw(touch.pageX - canvasRef.current!.offsetLeft, touch.pageY - canvasRef.current!.offsetTop)
    }
  }

  const handleTouchEnd = () => {
    stopDrawing()
  }

  const startDrawing = (x: number, y: number) => {
    setIsDrawing(true)
    draw(x, y)
  }

  const draw = (x: number, y: number) => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')

      if (!context) {
        return
      }

      if (!isDrawing) {
        context.beginPath()
      }

      context.lineWidth = 2
      context.lineCap = 'round'
      context.strokeStyle = '#000'
      context.lineTo(x, y)
      context.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    save()
  }

  const save = () => {
    if (canvasRef.current) {
      signatureContext?.setCurrentCanvas(canvasRef.current)
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className='w-full h-screen'
        style={{ border: '1px solid #000' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  )
}

export default SignatureCanvas
