"use client"

import { useEffect, useRef } from "react"
// QR generator; ensure 'qrcode' is in package.json dependencies
import type { QRCodeRenderersOptions } from "qrcode"
// Use dynamic import to avoid SSR issues if any
let QR: any

interface EventQRProps {
  eventId: string
  userId: string
}

export function EventQR({ eventId, userId }: EventQRProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const payload = JSON.stringify({ t: 'checkin', e: eventId, u: userId })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!canvasRef.current) return
      if (!QR) {
        QR = await import("qrcode")
      }
      if (!mounted) return
  const opts: QRCodeRenderersOptions = { width: 160 }
      // @ts-ignore
      QR.toCanvas(canvasRef.current, payload, opts, (err: unknown) => {
        if (err) console.error(err)
      })
    })()
    return () => { mounted = false }
  }, [payload])

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} />
      <p className="text-xs text-muted-foreground">Presenta este código el día del evento para hacer check-in</p>
    </div>
  )
}
