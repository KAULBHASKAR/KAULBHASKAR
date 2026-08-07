import React from 'react';

const StatsComponent: React.FC = () => {
  const stats = [
    { label: 'Followers', value: '1000 +' },
    { label: 'Success Rate', value: '90 %' },
    { label: 'Projects', value: '100 +' },
    { label: 'Speeches / Posts', value: '400 +' },
  ];

  return (
    <section className="bg-slate-50 py-16 font-general">
      <div className="max-w-6xl mx-auto px-4">
        {/* Grid container for stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" aria-label="Business Performance Statistics">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Value with bold typography matching your custom theme variables */}
              <span className="text-4xl md:text-5xl font-black text-[#c2410c] mb-2 font-zentry">
                {stat.value}
              </span>
              {/* Label matching your core layout styles */}
              <span className="text-gray-600 font-medium uppercase tracking-wide text-xs md:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsComponent;
