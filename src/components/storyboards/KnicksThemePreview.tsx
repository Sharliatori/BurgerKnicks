import React from "react";

const KnicksThemePreview = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">New York Knicks Theme Colors</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">Knicks Blue</span>
          </div>
          <div className="p-4 bg-white">
            <p className="font-mono">--knicks-blue: 214 100% 34%</p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-xl">Knicks Orange</span>
          </div>
          <div className="p-4 bg-white">
            <p className="font-mono">--knicks-orange: 24 100% 50%</p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-secondary flex items-center justify-center">
            <span className="text-black font-bold text-xl">Knicks Grey</span>
          </div>
          <div className="p-4 bg-white">
            <p className="font-mono">--knicks-grey: 220 14% 80%</p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">UI Elements with Knicks Theme</h2>

        <div className="flex flex-wrap gap-4">
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md">
            Primary Button
          </button>
          <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md">
            Accent Button
          </button>
          <button className="bg-secondary hover:bg-secondary/90 text-black px-4 py-2 rounded-md">
            Secondary Button
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-secondary/20 rounded-lg border border-secondary">
            <h3 className="text-xl font-bold text-primary mb-2">
              Card with Primary Heading
            </h3>
            <p className="text-gray-700">
              This card uses the secondary color as a light background.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-accent">
            <h3 className="text-xl font-bold text-accent mb-2">
              Card with Accent Heading
            </h3>
            <p className="text-gray-700">
              This card uses the accent color for its border and heading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnicksThemePreview;
