import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLOR_SWATCHES } from '../data/mockData';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Calculator,
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';

const ROOM_VIEWS = [
  {
    id: 'living',
    label: 'Living Room Wall',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'lounge',
    label: 'Open-Concept Lounge',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bedroom',
    label: 'Master Bedroom',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  },
];

export const VisualizerPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSwatch, setSelectedSwatch] = useState(COLOR_SWATCHES[0]);
  const [activeRoomView, setActiveRoomView] = useState(ROOM_VIEWS[0]);
  const [textureType, setTextureType] = useState<'velvet' | 'stucco' | 'metallic'>('stucco');
  const [lightingAtmosphere, setLightingAtmosphere] = useState<'morning' | 'evening' | 'night'>('evening');
  const [cameraAngle, setCameraAngle] = useState(0);
  const [showTextureBump, setShowTextureBump] = useState(true);

  const handleApplyToEstimator = () => {
    navigate(`/estimator?service=${encodeURIComponent(`Italian Stucco (${selectedSwatch.name})`)}&rate=${selectedSwatch.costPerSqFt}`);
  };

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-10 sm:pt-14 lg:pt-16 pb-24 sm:pb-32 space-y-20 sm:space-y-28">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Interactive 3D Material Studio</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">
          Simulate Italian Stuccos on Real Walls
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Preview how mineral pigments, crushed Carrara marble dust, and hand-raked textures behave under natural daylight and 2700K architectural cove lighting before work begins.
        </p>
      </div>

      {/* Visualizer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main 3D Interactive Room Canvas */}
        <div className="lg:col-span-8 overflow-hidden rounded-3xl border border-neutral-300 bg-neutral-950 shadow-2xl relative">
          
          {/* Top Canvas Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 px-4 sm:px-6 py-3.5 bg-neutral-900/95 backdrop-blur-md">
            
            {/* Room Views Switcher */}
            <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
              {ROOM_VIEWS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveRoomView(v)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeRoomView.id === v.id
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Lighting Atmosphere Toggles */}
            <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
              <button
                onClick={() => setLightingAtmosphere('morning')}
                className={`flex items-center gap-1 px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  lightingAtmosphere === 'morning'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Morning Daylight (4500K)"
              >
                <Sun className="h-3 w-3 text-amber-300" />
                <span className="hidden sm:inline">Morning</span>
              </button>
              <button
                onClick={() => setLightingAtmosphere('evening')}
                className={`flex items-center gap-1 px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  lightingAtmosphere === 'evening'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Golden Hour / 2700K Cove"
              >
                <Sun className="h-3 w-3 text-amber-500" />
                <span className="hidden sm:inline">2700K Cove</span>
              </button>
              <button
                onClick={() => setLightingAtmosphere('night')}
                className={`flex items-center gap-1 px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  lightingAtmosphere === 'night'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Nocturne Accent"
              >
                <Moon className="h-3 w-3 text-indigo-300" />
                <span className="hidden sm:inline">Nocturne</span>
              </button>
            </div>
          </div>

          {/* Simulated 3D Room Box */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-950 flex items-center justify-center p-3 sm:p-5">
            
            {/* Dynamic Room Perspective Container */}
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500"
              style={{
                transform: `perspective(1000px) rotateY(${cameraAngle}deg)`,
              }}
            >
              {/* Photorealistic Base Room Image */}
              <img
                src={activeRoomView.image}
                alt="Room Interior Base"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Tint Layer with Selected Swatch Color */}
              <div
                className="absolute inset-0 transition-all duration-700 pointer-events-none mix-blend-multiply"
                style={{
                  backgroundColor: selectedSwatch.hex,
                  opacity: textureType === 'metallic' ? 0.72 : 0.65,
                }}
              />

              {/* Secondary Color Tint for Rich Tonal Depth */}
              <div
                className="absolute inset-0 transition-all duration-700 pointer-events-none mix-blend-color"
                style={{
                  backgroundColor: selectedSwatch.hex,
                  opacity: 0.45,
                }}
              />

              {/* Texture Layer / Trowel Relief */}
              {showTextureBump && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      textureType === 'stucco'
                        ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 65%), repeating-linear-gradient(45deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 2px, transparent 2px, transparent 6px)`
                        : textureType === 'metallic'
                        ? `radial-gradient(ellipse at 35% 25%, rgba(255,230,160,0.45) 0%, transparent 60%), repeating-radial-gradient(circle at 65% 75%, rgba(212,175,55,0.3) 0px, transparent 10px)`
                        : `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.18) 0%, transparent 70%)`,
                    opacity: textureType === 'velvet' ? 0.4 : 0.7,
                  }}
                />
              )}

              {/* Lighting Shader Overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{
                  background:
                    lightingAtmosphere === 'morning'
                      ? 'linear-gradient(135deg, rgba(255,245,225,0.35) 0%, rgba(0,0,0,0.2) 100%)'
                      : lightingAtmosphere === 'evening'
                      ? 'radial-gradient(circle at 50% 0%, rgba(217,119,6,0.4) 0%, rgba(0,0,0,0.5) 85%)'
                      : 'linear-gradient(180deg, rgba(20,25,45,0.45) 0%, rgba(0,0,0,0.75) 100%)',
                }}
              />

              {/* Top Architectural Ceiling Cove Light Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.9)]" />

              {/* Floating Swatch Label Badge on Canvas */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-700 text-xs text-white shadow-lg flex items-center gap-2.5">
                <div
                  className="h-4 w-4 rounded-full shadow-inner border border-white/40"
                  style={{ backgroundColor: selectedSwatch.hex }}
                />
                <div>
                  <span className="font-bold text-amber-300 block leading-tight">{selectedSwatch.name}</span>
                  <span className="text-[10px] text-neutral-300 font-mono">
                    {selectedSwatch.finish} · ₹{selectedSwatch.costPerSqFt}/sq.ft
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Interactive Controls */}
          <div className="p-4 sm:p-5 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-neutral-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <span>Angle:</span>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  value={cameraAngle}
                  onChange={(e) => setCameraAngle(Number(e.target.value))}
                  className="w-28 accent-amber-500 cursor-pointer"
                />
              </label>

              <button
                onClick={() => setShowTextureBump(!showTextureBump)}
                className="hover:text-white underline underline-offset-2 cursor-pointer"
              >
                {showTextureBump ? 'Hide Trowel Texture' : 'Show Trowel Texture'}
              </button>
            </div>

            <button
              onClick={handleApplyToEstimator}
              className="btn-premium inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-all shadow-md cursor-pointer"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Transfer to Cost Estimator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

        {/* Right Swatch Controls Panel */}
        <div className="lg:col-span-4 rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-sm space-y-6">
          
          <div>
            <h2 className="font-display text-xl font-bold text-neutral-950">
              Architectural Palette
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              Select an artisan swatch to render on the virtual elevation.
            </p>
          </div>

          {/* Swatches List */}
          <div className="space-y-2.5">
            {COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.id}
                onClick={() => setSelectedSwatch(swatch)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  selectedSwatch.id === swatch.id
                    ? 'border-amber-600 bg-amber-500/10 shadow-sm ring-1 ring-amber-500/30'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-xl shadow-inner border border-black/10 shrink-0"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{swatch.name}</p>
                    <p className="text-[11px] text-neutral-500">{swatch.finish}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-semibold text-amber-700">
                    ₹{swatch.costPerSqFt}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">/sq.ft</span>
                </div>
              </button>
            ))}
          </div>

          {/* Texture Finish Type Toggles */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              Trowel Technique
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'velvet', label: 'Venetian Velvet' },
                { id: 'stucco', label: 'Italian Stucco' },
                { id: 'metallic', label: 'Mica Metallic' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTextureType(t.id as any)}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-medium text-center transition-all cursor-pointer ${
                    textureType === t.id
                      ? 'border-amber-600 bg-amber-600 text-white font-semibold shadow-sm'
                      : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Swatch Description */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
            <span className="font-semibold text-neutral-900 block">Specification Details:</span>
            <p className="text-neutral-600 leading-relaxed">
              {selectedSwatch.description}
            </p>
          </div>

          <button
            onClick={handleApplyToEstimator}
            className="w-full btn-premium rounded-xl bg-amber-600 py-3 text-xs font-semibold text-white shadow-md hover:bg-amber-500 transition-all text-center cursor-pointer"
          >
            Calculate Cost for {selectedSwatch.name} →
          </button>

        </div>

      </div>

    </div>
  );
};
