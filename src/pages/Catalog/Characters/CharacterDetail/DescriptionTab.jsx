// components/DescriptionTab.jsx
const DescriptionTab = ({ description }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center mb-6">Historia del Héroe</h2>

    <div className="prose prose-lg max-w-none">
      <p className="text-lg leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>

    {/* Agregar elementos visuales para hacer la sección más atractiva */}
    <div className="mt-8 p-4 bg-base-200 rounded-lg border border-base-300">
      <h3 className="text-xl font-semibold mb-2">¿Sabías que?</h3>
      <p className="italic">
        Cada campeón de League of Legends tiene una historia única que lo
        conecta con el vasto mundo de Runaterra y sus diversas regiones.
      </p>
    </div>
  </div>
)

export default DescriptionTab
