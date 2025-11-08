import dynamic from 'next/dynamic'

const AllyMap = dynamic(()=> import('@/components/aliados/ally-map'), { ssr:false })

export default function AliadosMapPage(){
  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold mb-2'>Mapa de Aliados</h1>
        <p className='text-muted-foreground mb-6'>Explora la ubicación de aliados y sus beneficios exclusivos.</p>
        <AllyMap />
      </div>
    </div>
  )
}
