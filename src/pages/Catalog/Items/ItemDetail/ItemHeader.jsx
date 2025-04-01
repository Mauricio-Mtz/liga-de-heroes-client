const ItemHeader = ({ item }) => {
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/item/${item.image.full}`

  return (
    <div className="flex items-center bg-base-200 p-4 rounded-lg shadow-md">
      <div className="w-24 h-24 mr-6">
        <img 
          src={imageUrl} 
          alt={item.name} 
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/fallback-item-image.png'
          }}
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <div className="flex items-center mt-2">
          <span className="mr-4 text-yellow-600 font-semibold">
            Precio: {item.gold.total} de oro
          </span>
          {item.inStore === false && (
            <span className="badge badge-warning">No disponible en tienda</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemHeader