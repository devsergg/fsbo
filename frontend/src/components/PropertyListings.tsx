'use client';

import { useState } from 'react';
import PropertyCard from './PropertyCard';
import { mockProperties } from '@/lib/mockData';

export default function PropertyListings() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              FSBO Properties in Los Angeles, CA - For Sale by Owner
            </h2>
            <p className="text-gray-600 mt-1">
              {mockProperties.length}+ homes selling without agent commissions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Property Grid */}
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
            {mockProperties.map((property) => (
              <div key={property.id} className="w-80 flex-shrink-0">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 