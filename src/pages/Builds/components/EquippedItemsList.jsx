// src/pages/Builds/components/EquippedItemsList.jsx
const EquippedItemsList = ({ items, onRemoveItem }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay items equipados
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.id} className="card bg-base-200 comic-border">
          <div className="card-body p-4">
            <div className="flex justify-between items-start">
              <h3 className="card-title text-lg">{item.name}</h3>
              <button 
                className="btn btn-sm btn-circle btn-error" 
                onClick={() => onRemoveItem(item.id)}
              >
                ✕
              </button>
            </div>
            
            {item.description && (
              <p className="text-sm text-gray-600 my-1">{item.description}</p>
            )}
            
            {item.stats && Object.keys(item.stats).length > 0 && (
              <div className="mt-2">
                <h4 className="font-bold text-sm mb-1">Estadísticas:</h4>
                <div className="grid grid-cols-2 gap-1">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between text-sm">
                      <span className="capitalize">{stat}:</span>
                      <span className={value > 0 ? 'text-success' : 'text-error'}>
                        {value > 0 ? '+' : ''}{value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {item.type && (
              <div className="mt-2">
                <span className="badge badge-neutral">{item.type}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquippedItemsList;