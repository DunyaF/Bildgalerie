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


function loadPostsFromPocketbase() {
    /** 
     * Aufgabe 1: 
     * Schreibe Code, welcher alle Posts aus Pocketbase lädt. 
     * Sobald die Daten geladen wurden, soll die Funktion "insertPostsIntoHtml()" aufgerufen werden. 
     * */
    fetch('https://me22e-6.hbevf6.easypanel.host/api/collections/bildgallerie_nico_caro_dunya_louisa/records')
        .then(response => response.json())
        .then(data => {
            insertPostsIntoHtml(data.items);
        })
}

function insertPostsIntoHtml(posts) {
    /** 
     * Aufgabe 2: 
     * Schreibe Code, welcher die Posts in das HTML einfügt. 
     * Die Posts sollen als Liste dargestellt werden und in den div Container mit der ID "posts" eingefügt werden.
     * */
    let htmlToInsert = '';
    for (const post of posts) {
        const imageUrl = getImageUrlForImageName(post.id, post.images);
        const htmlCodeForOnePost = `
            <div style="margin-top: 2rem; border: 1px solid gray;">
                <img src="${imageUrl}" style="width: 300px;">
            </div>
        `;
        htmlToInsert += htmlCodeForOnePost;
    }
    document.getElementById('images').innerHTML = htmlToInsert;
}


        /**
         * Diese Funktion gibt die URL für ein Bild zurück.
         * @param {string} recordId: Die ID des Records
         * @param {string} imageName: Der Name des Bildes
         * 
         * WICHTIG: Die Folgenden Werte sind Platzhalter und müssen ersetzt werden.
         * - COLLECTION_ID_OR_NAME: Der Name der Collection
         * - RECORD_ID: Die ID des Records
         * - FILENAME: Der Name des Bildes (imageName)
         * - Die Domain mit der eigenen Pocketbase Instanz
         * */
        function getImageUrlForImageName(recordId, imageName) {
            // https://bzz-admin.hbevf6.easypanel.host/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
            return `https://me22e-6.hbevf6.easypanel.host/api/files/bildgallerie_nico_caro_dunya_louisa/${recordId}/${imageName}`;
        }
