// components/TabNavigation.jsx
const TabNavigation = ({ activeTab, setActiveTab }) => (
  <div className="tabs tabs-boxed bg-base-300">
    <button
      className={`tab tab-lg flex-1 ${
        activeTab === 'stats' ? 'tab-active' : ''
      }`}
      onClick={() => setActiveTab('stats')}
    >
      Estadísticas
    </button>
    <button
      className={`tab tab-lg flex-1 ${
        activeTab === 'abilities' ? 'tab-active' : ''
      }`}
      onClick={() => setActiveTab('abilities')}
    >
      Habilidades
    </button>
  </div>
)

export default TabNavigation
