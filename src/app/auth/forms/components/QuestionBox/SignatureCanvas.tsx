import React, { useState, useRef } from 'react';

interface SignatureCanvasProps {
  setValues: (value: string) => void;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ setValues }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    startDrawing(e.pageX - canvasRef.current!.offsetLeft, e.pageY - canvasRef.current!.offsetTop);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (isDrawing) {
      draw(e.pageX - canvasRef.current!.offsetLeft, e.pageY - canvasRef.current!.offsetTop);
    }
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const touch = e.touches[0];
    startDrawing(touch.pageX - canvasRef.current!.offsetLeft, touch.pageY - canvasRef.current!.offsetTop);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (isDrawing) {
      const touch = e.touches[0];
      draw(touch.pageX - canvasRef.current!.offsetLeft, touch.pageY - canvasRef.current!.offsetTop);
    }
  };

  const handleTouchEnd = () => {
    stopDrawing();
  };

  const startDrawing = (x: number, y: number) => {
    setIsDrawing(true);
    draw(x, y);
  };

  const draw = (x: number, y: number) => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');

      if (!context) {
        return;
      }

      if (!isDrawing) {
        context.beginPath();
      }

      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = '#000';
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      // context.closePath();
      save();
    }
  };

  const save = () => {
    if (canvasRef.current) {
      const signatureImage = canvasRef.current.toDataURL('image/png');
      setValues(signatureImage);
    }
  };

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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default SignatureCanvas;
