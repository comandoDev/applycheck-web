import React, { useState, useRef } from 'react'

interface SignatureCanvasProps {
  width: number
  height: number
}

const SignatureCanvas = ({ setValues }: { setValues: (value: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      setIsDrawing(true)
      draw(e.pageX - canvasRef.current.offsetLeft, e.pageY - canvasRef.current.offsetTop, false)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && canvasRef.current) {
      draw(e.pageX - canvasRef.current.offsetLeft, e.pageY - canvasRef.current.offsetTop, true)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const draw = (x: number, y: number, isDrawing: boolean) => {
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

      if (!isDrawing) {
        context.closePath()
      }
    }

    save()
  }

  const save = () => {
    if (canvasRef.current) {
      const signatureImage = canvasRef.current.toDataURL('image/png')
      setValues(signatureImage)
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className='w-full'
        height={200}
        style={{ border: '1px solid #000' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  )
}

export default SignatureCanvas
