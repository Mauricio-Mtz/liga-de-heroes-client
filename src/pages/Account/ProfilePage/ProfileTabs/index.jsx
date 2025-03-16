// components/ProfileTabs.jsx
const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', name: 'Perfil' },
    { id: 'champions', name: 'Campeones Favoritos' },
    { id: 'settings', name: 'Configuración' },
  ]

  return (
    <div className="tabs tabs-boxed mb-4">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.name}
        </a>
      ))}
    </div>
  )
}

export default ProfileTabs
