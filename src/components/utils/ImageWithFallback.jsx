import React, { useState } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const [show, setShow] = useState(false);

  const handleError = () => {
    setDidError(true);
    setTimeout(() => setShow(true), 100); // Delay for animation
  };

  const handleImageLoad = () => {
    setShow(true);
  };

  const { src, alt, style, className, ...rest } = props;

  const fadeClass = show
    ? 'opacity-100 transition-opacity duration-500'
    : 'opacity-0';

  // Skeleton loader styles
  const skeletonClass =
    'animate-pulse bg-gray-200 rounded w-full h-full absolute top-0 left-0';

  return (
    <div className="relative inline-block w-full h-full" style={style}>
      {!show && (
        <div className={skeletonClass} />
      )}
      {didError ? (
        <div
          className={`bg-gray-100 text-center align-middle ${className ?? ''} ${fadeClass}`}
          style={{ ...style, position: 'relative' }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={ERROR_IMG_SRC}
              alt="Error loading image"
              {...rest}
              data-original-url={src}
              onLoad={handleImageLoad}
              className={fadeClass}
              style={{ position: 'relative', zIndex: 1 }}
            />
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className ?? ''} ${fadeClass}`}
          style={{ ...style, position: 'relative', zIndex: 1 }}
          {...rest}
          onError={handleError}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
}
