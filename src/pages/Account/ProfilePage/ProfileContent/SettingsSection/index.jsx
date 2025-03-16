// components/SettingsSection.jsx
import PasswordForm from './PasswordForm';
import SecurityOptions from './SecurityOptions';
import DangerZone from './DangerZone';

const SettingsSection = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4 comic-title">Configuración de Cuenta</h2>
      
      <div className="space-y-6">
        <PasswordForm />
        <SecurityOptions />
        <DangerZone />
      </div>
    </div>
  );
};

export default SettingsSection;