import AllyDetail from '@/components/aliados/ally-detail'

interface Props {
  params: { allyId: string }
}

export default function AllyPage({ params }: Props) {
  const { allyId } = params
  return (
    <div className="min-h-screen bg-background">
      <AllyDetail allyId={allyId} />
    </div>
  )
}
