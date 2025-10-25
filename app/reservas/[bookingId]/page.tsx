interface Props {
  params: { bookingId: string }
}

export default function ReservaPage({ params }: Props) {
  const { bookingId } = params
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Reserva confirmada</h2>
        <p className="text-sm text-muted-foreground mb-4">Tu código de reserva es:</p>
        <div className="font-mono bg-muted rounded px-3 py-2 inline-block">{bookingId}</div>
        <div className="mt-6">
          <a href="/aliados" className="text-primary">Volver a Aliados</a>
        </div>
      </div>
    </div>
  )
}
