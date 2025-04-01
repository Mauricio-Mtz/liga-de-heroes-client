const CraftTab = ({ item, allItems }) => {
    const getItemName = (itemId) => {
      const foundItem = allItems[itemId]
      return foundItem ? foundItem.name : itemId
    }
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6">Crafteo del Item</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {item.from && item.from.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Crafteado desde:</h3>
              <ul className="list-disc pl-5">
                {item.from.map(itemId => (
                  <li key={itemId}>{getItemName(itemId)}</li>
                ))}
              </ul>
            </div>
          )}
  
          {item.into && item.into.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Se convierte en:</h3>
              <ul className="list-disc pl-5">
                {item.into.map(itemId => (
                  <li key={itemId}>{getItemName(itemId)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
  
        {(!item.from || item.from.length === 0) && 
         (!item.into || item.into.length === 0) && (
          <p className="text-center text-gray-500">Este item no puede ser crafteado</p>
        )}
      </div>
    )
  }
  
  export default CraftTab