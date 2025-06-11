'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { VscDeviceCamera, VscAccount } from 'react-icons/vsc';

type FallbackType = 'movie' | 'person';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
  fallbackType?: FallbackType;
}

const FallbackPlaceholder: React.FC<{ type: FallbackType }> = ({ type }) => {
    const icon = type === 'movie' 
        ? <VscDeviceCamera className="text-zinc-500 text-4xl" />
        : <VscAccount className="text-zinc-500 text-4xl" />;

    return (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center rounded-lg">
            {icon}
        </div>
    );
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackType = 'movie',
  alt,
  ...props
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    return <FallbackPlaceholder type={fallbackType} />;
  }

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={src}
      {...props}
    />
  );
};

export default ImageWithFallback; 