import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS } from '../data/churchData';
import { GalleryPhoto } from '../types/church';
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Worship', 'Choir', 'Fellowship', 'Youth', 'Community'];

  const filteredPhotos = selectedCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === selectedCategory);

  const handleImageError = (id: string) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="gallery" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-900 block mb-2">
            Moments of Grace
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Parish Life in Pictures
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            A glimpse into the worship, joyous fellowship, youth rallies, and ministry life at ACK St. Mary's Ngariama.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? 'All Photos' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => {
            const hasFailed = failedImages[photo.id];
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-xs border border-stone-200 bg-stone-100 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {!hasFailed ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={() => handleImageError(photo.id)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${photo.fallbackGradient} flex flex-col items-center justify-center p-6 text-white text-center`}>
                    <ImageIcon className="w-8 h-8 text-amber-400 mb-2 opacity-80" />
                    <span className="font-serif font-semibold text-sm">{photo.title}</span>
                    <span className="text-[11px] text-stone-300 mt-1">{photo.category}</span>
                  </div>
                )}

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between text-xs text-amber-300 mb-1">
                    <span className="font-medium">{photo.category}</span>
                    <span className="text-[11px] text-stone-300 font-mono">{photo.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base line-clamp-1 group-hover:text-amber-200 transition">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                    {photo.caption}
                  </p>
                </div>

                {/* Zoom Icon indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Body */}
            <div className="max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <div className="relative max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                {!failedImages[activePhoto.id] ? (
                  <img
                    src={activePhoto.imageUrl}
                    alt={activePhoto.title}
                    className="max-h-[65vh] w-auto object-contain mx-auto"
                    onError={() => handleImageError(activePhoto.id)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-full h-80 bg-gradient-to-br ${activePhoto.fallbackGradient} flex flex-col items-center justify-center text-white p-8 text-center`}>
                    <ImageIcon className="w-12 h-12 text-amber-400 mb-3" />
                    <h3 className="font-serif text-2xl font-bold">{activePhoto.title}</h3>
                    <p className="text-sm text-stone-300 mt-2">{activePhoto.category} Ministry</p>
                  </div>
                )}
              </div>

              {/* Caption Footer */}
              <div className="p-6 bg-stone-900 text-white border-t border-stone-800">
                <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
                  <span className="font-semibold uppercase tracking-wider">{activePhoto.category} Ministry</span>
                  <span className="font-mono text-stone-400">{activePhoto.date}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
