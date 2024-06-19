import { useState } from 'react';

function FileType() {
    const [fileType, setFileType] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) {
            console.log('No file selected')
            return;
        }

        const file = event.target.files[0];
        if (file) {
            console.log(file);
            console.log("Type: ", file.type);
            setFileType(file.type);
        }
    }

    const typeDeterminer = (mime: string) => {
        if (mime.includes('image')) {
            return 'image';
        }
        if (mime.includes('video')) {
            return 'video';
        }
        if (mime.includes('audio')) {
            return 'audio';
        }
        if (mime.includes('text') || mime.includes('pdf') || mime.includes('rtf')) {
            return 'document';
        }

        return 'unknown';
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {fileType && <p>File type: {fileType}</p>}
            {fileType && <p>File category: {typeDeterminer(fileType)}</p>}
        </div>
    );
}

export default FileType;