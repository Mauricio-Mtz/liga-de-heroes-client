const DescriptionTab = ({ item }) => {
  const cleanDescription = item.description.replace(/<[^>]*>/g, '')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Descripción del Item</h2>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed whitespace-pre-line">
          {cleanDescription}
        </p>
      </div>

      <div className="mt-8 p-4 bg-base-200 rounded-lg border border-base-300">
        <h3 className="text-xl font-semibold mb-2">Información Adicional</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <strong>Vendible:</strong> {item.gold.sellable ? 'Sí' : 'No'}
          </div>
          <div>
            <strong>Precio de venta:</strong> {item.gold.sell} de oro
          </div>
          <div>
            <strong>Grupo:</strong> {item.group || 'N/A'}
          </div>
          <div>
            <strong>Profundidad:</strong> {item.depth || 'Base'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DescriptionTab