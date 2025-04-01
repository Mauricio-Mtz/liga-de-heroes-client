const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'description', label: 'Descripción' },
    { id: 'stats', label: 'Estadísticas' },
    { id: 'craft', label: 'Crafteo' }
  ]

  return (
    <div className="tabs tabs-boxed bg-base-300">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab tab-lg flex-1 ${activeTab === tab.id ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation