// CharacterFilters.jsx - Componente para los filtros
const CharacterFilters = ({
  filter,
  setFilter,
  selectedTag,
  setSelectedTag,
  allTags,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      {/* Buscador */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Buscar campeón..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-base-100 text-base-content input comic-border"
        />
        {filter && (
          <button
            onClick={() => setFilter('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content hover:text-primary"
          >
            ×
          </button>
        )}
      </div>

      {/* Filtro de tags */}
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        className="bg-base-100 text-base-content select comic-border"
      >
        <option value="">Todos los roles</option>
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CharacterFilters
