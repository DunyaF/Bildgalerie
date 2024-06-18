const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://your-pocketbase-url/api/files', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                const img = document.createElement('img');
                img.src = `http://your-pocketbase-url/api/files/${result.fileId}`;
                gallery.appendChild(img);
                fileInput.value = '';
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file');
        }
    } else {
        alert('Please select a file to upload');
    }
});

async function loadGallery() {
    try {
        const response = await fetch('http://your-pocketbase-url/api/files');
        const files = await response.json();
        files.forEach(file => {
            const img = document.createElement('img');
            img.src = `http://your-pocketbase-url/api/files/${file.id}`;
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadGallery);
