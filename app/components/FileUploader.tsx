import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { formatBytes } from '~/lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({
    onFileSelect
}: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        const file: File = acceptedFiles[0] || null;
        onFileSelect?.(file);

      }, [onFileSelect]);

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop, 
        multiple: false, 
        accept: {
            'application/pdf': ['.pdf']
        },
        maxSize: 20 * 1024 * 1024
    })

    const file: File | null = acceptedFiles[0] || null;

  return (
    <div className='w-full gradient-border'>
        <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
            {
                file ? (
                    <div className="uploader-selected-file" onClick={event => {
                        event.stopPropagation();
                    }}>
                        <img src="/images/pdf.png" alt="pdf" className='size-10' />
                        <div className="flex items-center space-x-3">
                        <div>
                        <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                            {file.name}
                        </p>
                        <p className="text-gray-500 text-sm">{ formatBytes(file.size)}</p>
                        </div>
                    </div>
                        <button className='p-2 cursor-pointer' onClick={event => {
                            onFileSelect?.(null);
                        }}>
                            <img src="icons/cross.svg" alt="remove" className='w-4 h-4' />
                        </button>
                    </div>
                ) : (
                    <div>
                         <div className='mx-auto w-16 h-16 flex justify-center items-center'><img src="/icons/info.svg" alt="Upload" className='size-20' /></div>

                        <p className="text-gray-700 text-lg">
                            <span className="font-semibold">
                                Click to upload
                            </span> or Drag n Drop
                        </p>
                        <p className="text-gray-500 text-lg">PDF (max 20 MB only)</p>
                    </div>
                )
            }
        </div>
        </div>
    </div>
  )
}

export default FileUploader