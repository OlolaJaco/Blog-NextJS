'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';
import Image from 'next/image';

type ImageUploadProps = {
  onUploadSuccess: (url: string) => void;
  value?: string;
};

type UploadResult = {
  info?: {
    secure_url?: string;
  } | string;
};

export default function ImageUpload({ onUploadSuccess, value }: ImageUploadProps) {
  const handleUpload = useCallback((result: UploadResult) => {
    if (typeof result.info !== 'string' && result.info?.secure_url) {
      onUploadSuccess(result.info.secure_url);
    }
  }, [onUploadSuccess]);

  return (
    <div className="flex flex-col gap-4">
      <CldUploadWidget 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => open()}
              className="btn btn-outline"
            >
              Upload Image
            </button>
            
            {value && (
              <div className="relative w-96 h-72">
                <Image
                  src={value}
                  alt="Upload"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
}