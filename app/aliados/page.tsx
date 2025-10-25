import dynamic from "next/dynamic"

const AllyList = dynamic(() => import("@/components/aliados/ally-list"), { ssr: false })

export const metadata = {
  title: "Aliados - EcoPlaya",
}

export default function AliadosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Aliados</h1>
          <p className="text-muted-foreground">Organizaciones y negocios aliados en la Costa Verde</p>
        </div>

        {/* AllyList is a client component and may use browser-only APIs; load it dynamically on the client to avoid prerender errors */}
        <AllyList />
      </div>
    </div>
  )
}
