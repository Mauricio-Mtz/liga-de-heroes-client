/* eslint-disable react/prop-types */
import { useState } from 'react';

const UIsample = () => {
  const [activeTab, setActiveTab] = useState('buttons');

  // Elementos decorativos para efecto cómic con animación mejorada
  const ComicBurst = ({ text, color, textColor, className, style }) => (
    <div 
      className={`absolute font-bold px-4 py-2 border-3 border-black comic-burst ${className}`}
      style={{
        backgroundColor: color,
        color: textColor,
        boxShadow: "3px 3px 0 #000",
        ...style,
        '--rotation': `${Math.random() * 20 - 10}deg`
      }}
    >
      {text}
    </div>
  );

  // Componente para mostrar colores
  const ColorSwatch = ({ name, color, textColor, hexCode }) => (
    <div className="border-3 border-black overflow-hidden">
      <div 
        className="h-24 border-b-3 border-black flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className="font-bold text-xl" style={{ color: textColor }}>{name}</span>
      </div>
      <p className="font-bold text-center py-2">{name}</p>
      <p className="text-center pb-2">{hexCode}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100" style={{backgroundImage: "radial-gradient(circle, rgba(255,26,117,0.1) 10%, transparent 10%)", backgroundSize: "20px 20px"}}>
      {/* Header */}
      <header className="bg-accent text-accent-content p-6 mb-8 border-3 border-black relative overflow-hidden" style={{boxShadow: "6px 6px 0 #000"}}>
        <ComicBurst 
          text="¡POW!" 
          color="var(--color-warning)" 
          textColor="black" 
          className="top-10 -left-8 transform -rotate-12" 
        />
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold text-center uppercase comic-title">¡Comic UI Theme!</h1>
          <p className="text-center mt-2 text-xl">Una EXPLOSIVA interfaz con estilo de cómic</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Showcase Card */}
        <div className="card bg-base-200 border-3 border-black relative">
          <ComicBurst 
            text="¡BANG!" 
            color="var(--color-accent)" 
            textColor="white" 
            className="-top-6 -right-6 transform rotate-12" 
          />
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4 uppercase comic-title">Showcase de Componentes</h2>
            
            {/* Tabs */}
            <div className="flex flex-wrap border-3 border-black mb-6 bg-base-100">
              <button 
                className={`flex-1 py-3 uppercase font-bold ${activeTab === 'buttons' ? 'bg-primary text-white' : 'bg-base-100 hover:bg-base-300'}`}
                onClick={() => setActiveTab('buttons')}
              >
                Botones
              </button>
              <button 
                className={`flex-1 py-3 uppercase font-bold ${activeTab === 'cards' ? 'bg-secondary text-white' : 'bg-base-100 hover:bg-base-300'}`}
                onClick={() => setActiveTab('cards')}
              >
                Tarjetas
              </button>
              <button 
                className={`flex-1 py-3 uppercase font-bold ${activeTab === 'alerts' ? 'bg-accent text-black' : 'bg-base-100 hover:bg-base-300'}`}
                onClick={() => setActiveTab('alerts')}
              >
                Alertas
              </button>
              <button 
                className={`flex-1 py-3 uppercase font-bold ${activeTab === 'forms' ? 'bg-error text-white' : 'bg-base-100 hover:bg-base-300'}`}
                onClick={() => setActiveTab('forms')}
              >
                Formularios
              </button>
            </div>
            
            {/* Buttons Section */}
            {activeTab === 'buttons' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold uppercase comic-title">Colores de Botones</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-secondary">Secondary</button>
                  <button className="btn btn-accent">Accent</button>
                  <button className="btn btn-neutral">Neutral</button>
                  <button className="btn btn-info">Info</button>
                  <button className="btn btn-success">Success</button>
                  <button className="btn btn-warning">Warning</button>
                  <button className="btn btn-error">Error</button>
                </div>
                
                <h3 className="text-2xl font-bold mt-8 uppercase comic-title">Tamaños de Botones</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="btn btn-primary btn-xs">Tiny</button>
                  <button className="btn btn-primary btn-sm">Small</button>
                  <button className="btn btn-primary">Normal</button>
                  <button className="btn btn-primary btn-lg">Large</button>
                </div>
                
                <h3 className="text-2xl font-bold mt-8 uppercase comic-title">Estilos de Botones</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn btn-primary btn-outline">Outline</button>
                  <button className="btn btn-secondary btn-outline">Outline</button>
                  <button className="btn btn-accent">Regular</button>
                  <button className="btn btn-success btn-ghost">Ghost</button>
                  <button className="btn btn-info loading">Loading</button>
                  <button className="btn btn-error" disabled>Disabled</button>
                </div>
              </div>
            )}
            
            {/* Cards Section */}
            {activeTab === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-primary text-primary-content relative">
                  <ComicBurst 
                    text="NEW!" 
                    color="var(--color-warning)" 
                    textColor="black" 
                    className="-top-3 -right-3 transform rotate-12" 
                    style={{ padding: '2px 8px' }}
                  />
                  <div className="card-body">
                    <h3 className="card-title text-xl uppercase comic-title">Primary Card</h3>
                    <p>Este es el estilo de tarjeta con color primario.</p>
                    <div className="card-actions justify-end">
                      <button className="btn bg-white text-primary border-black">Aceptar</button>
                    </div>
                  </div>
                </div>
                
                <div className="card bg-secondary text-secondary-content relative">
                  <ComicBurst 
                    text="HOT!" 
                    color="var(--color-warning)" 
                    textColor="black" 
                    className="-top-3 -right-3 transform rotate-12" 
                    style={{ padding: '2px 8px' }}
                  />
                  <div className="card-body">
                    <h3 className="card-title text-xl uppercase comic-title">Secondary Card</h3>
                    <p>Este es el estilo de tarjeta con color secundario.</p>
                    <div className="card-actions justify-end">
                      <button className="btn bg-white text-secondary border-black">Aceptar</button>
                    </div>
                  </div>
                </div>
                
                <div className="card bg-accent text-accent-content relative">
                  <ComicBurst 
                    text="WOW!" 
                    color="var(--color-error)" 
                    textColor="white" 
                    className="-top-3 -right-3 transform rotate-12" 
                    style={{ padding: '2px 8px' }}
                  />
                  <div className="card-body">
                    <h3 className="card-title text-xl uppercase comic-title">Accent Card</h3>
                    <p>Este es el estilo de tarjeta con color de acento.</p>
                    <div className="card-actions justify-end">
                      <button className="btn bg-black text-white border-black">Aceptar</button>
                    </div>
                  </div>
                </div>
                
                <div className="card bg-error text-error-content relative">
                  <ComicBurst 
                    text="ZAP!" 
                    color="var(--color-accent)" 
                    textColor="white" 
                    className="-top-3 -right-3 transform rotate-12" 
                    style={{ padding: '2px 8px' }}
                  />
                  <div className="card-body">
                    <h3 className="card-title text-xl uppercase comic-title">Error Card</h3>
                    <p>Este es el estilo de tarjeta con color de error.</p>
                    <div className="card-actions justify-end">
                      <button className="btn bg-white text-error border-black">Aceptar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Alerts Section */}
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div className="alert alert-info border-3 border-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="font-bold">¡INFO!</span> Este es un mensaje azul brillante.
                </div>
                
                <div className="alert alert-success border-3 border-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-bold">¡SUCCESS!</span> Este es un mensaje verde brillante.
                </div>
                
                <div className="alert alert-warning border-3 border-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span className="font-bold">¡WARNING!</span> Este es un mensaje amarillo brillante.
                </div>
                
                <div className="alert alert-error border-3 border-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-bold">¡ERROR!</span> Este es un mensaje rojo brillante.
                </div>
              </div>
            )}
            
            {/* Forms Section */}
            {activeTab === 'forms' && (
              <div className="space-y-6 relative">
                <ComicBurst 
                  text="¡BOOM!" 
                  color="var(--color-error)" 
                  textColor="white" 
                  className="-bottom-4 -left-4 transform -rotate-6" 
                />
                <div className="form-control w-full max-w-md border-3 border-black p-4">
                  <label className="label">
                    <span className="label-text font-bold">NOMBRE COMPLETO</span>
                  </label>
                  <input type="text" placeholder="TU NOMBRE" className="input input-bordered w-full" />
                </div>
                
                <div className="form-control w-full max-w-md border-3 border-black p-4">
                  <label className="label">
                    <span className="label-text font-bold">EMAIL</span>
                  </label>
                  <input type="email" placeholder="TU@EMAIL.COM" className="input input-bordered w-full" />
                </div>
                
                <div className="form-control border-3 border-black p-4 max-w-md">
                  <label className="label cursor-pointer justify-between">
                    <span className="label-text font-bold">¿ACEPTA TÉRMINOS Y CONDICIONES?</span> 
                    <input type="checkbox" className="checkbox checkbox-primary border-3 border-black" />
                  </label>
                </div>
                
                <div className="form-control border-3 border-black p-4 max-w-md">
                  <label className="label">
                    <span className="label-text font-bold">SELECCIONA TU SUPERHÉROE FAVORITO</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>SELECCIONA UNA OPCIÓN</option>
                    <option>SUPERMAN</option>
                    <option>BATMAN</option>
                    <option>SPIDER-MAN</option>
                    <option>WONDER WOMAN</option>
                  </select>
                </div>
                
                <div className="form-control border-3 border-black p-4 max-w-md">
                  <label className="label">
                    <span className="label-text font-bold">TU MENSAJE</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24" placeholder="ESCRIBE TU MENSAJE..."></textarea>
                </div>
                
                <button className="btn btn-primary mt-4 uppercase">¡Enviar!</button>
              </div>
            )}
          </div>
        </div>
        
        {/* Color Palette Showcase - Updated with new colors */}
        <div className="card bg-base-200 mt-8 border-3 border-black relative">
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4 uppercase comic-title">Paleta de Colores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Primary */}
              <ColorSwatch 
                name="PRIMARY" 
                color="var(--color-primary)" 
                textColor="white" 
                hexCode="#4169E1" 
              />
              
              {/* Secondary */}
              <ColorSwatch 
                name="SECONDARY" 
                color="var(--color-secondary)" 
                textColor="white" 
                hexCode="#7B2CBF" 
              />
              
              {/* Accent */}
              <ColorSwatch 
                name="ACCENT" 
                color="var(--color-accent)" 
                textColor="white" 
                hexCode="#FF1A75" 
              />
              
              {/* Error */}
              <ColorSwatch 
                name="ERROR" 
                color="var(--color-error)" 
                textColor="white" 
                hexCode="#FF3A3A" 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {/* Info */}
              <ColorSwatch 
                name="INFO" 
                color="var(--color-info)" 
                textColor="black" 
                hexCode="#00C8FF" 
              />
              
              {/* Success */}
              <ColorSwatch 
                name="SUCCESS" 
                color="var(--color-success)" 
                textColor="black" 
                hexCode="#00D474" 
              />
              
              {/* Warning */}
              <ColorSwatch 
                name="WARNING" 
                color="var(--color-warning)" 
                textColor="black" 
                hexCode="#FFB700" 
              />
              
              {/* Neutral */}
              <ColorSwatch 
                name="NEUTRAL" 
                color="var(--color-neutral)" 
                textColor="white" 
                hexCode="#2D3748" 
              />
            </div>
          </div>
        </div>
        
        {/* Typography Showcase */}
        <div className="card bg-base-200 mt-8 border-3 border-black relative">
          <ComicBurst 
            text="¡ZAP!" 
            color="var(--color-info)" 
            textColor="black" 
            className="top-10 -right-8 transform rotate-12" 
          />
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4 uppercase comic-title">Tipografía Cómic</h2>
            
            <div className="bg-base-100 p-6 border-3 border-black">
              <h1 className="text-5xl mb-4">Bangers para títulos</h1>
              <p className="text-xl mb-6">Comic Neue para texto normal. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
              
              <h2 className="text-4xl mb-3">ENCABEZADOS DE SEGUNDO NIVEL</h2>
              <p className="mb-6">Este tema utiliza fuentes especiales para cómics que dan una apariencia auténtica y divertida a tu interfaz.</p>
              
              <h3 className="text-3xl mb-3">TÍTULOS DE SECCIÓN</h3>
              <p className="mb-6">Comic Neue es una versión mejorada de Comic Sans con mejor legibilidad y estilo más refinado.</p>
              
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary">BOTONES CON BANGERS</button>
                <button className="btn btn-secondary">SUPER ESTILO</button>
                <button className="btn btn-accent">¡POW!</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-4 mt-8 border-t-4 border-accent relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <p className="uppercase font-bold">Comic UI Theme © 2025</p>
          <p>CREADO CON TAILWIND CSS Y DAISYUI</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,26,117,0.1) 10px, rgba(255,26,117,0.1) 20px)",
        }}></div>
      </footer>
    </div>
  );
};

export default UIsample;