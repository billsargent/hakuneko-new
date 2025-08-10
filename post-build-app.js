/**
 * This script ensures our customized files are correctly applied to the built application
 * AFTER the app.asar has been created but BEFORE the final ZIP packaging.
 */
const path = require('path');
const fs = require('fs-extra');

const files = [
    {
        source: 'src/web/lib/hakuneko/frontend@classic-dark/mangas.html',
        target: 'build/hakuneko-desktop_8.3.4_windows-portable_amd64/cache/lib/hakuneko/frontend@classic-dark/mangas.html'
    },
    {
        source: 'src/web/lib/hakuneko/frontend@classic-light/mangas.html',
        target: 'build/hakuneko-desktop_8.3.4_windows-portable_amd64/cache/lib/hakuneko/frontend@classic-light/mangas.html'
    }
];

async function copyFiles() {
    for(const file of files) {
        console.log(`Copying custom file: ${file.source} => ${file.target}`);
        await fs.copy(file.source, file.target, { overwrite: true });
    }
    console.log('All custom files copied successfully.');
}

// Run the copy operation
copyFiles().catch(err => {
    console.error('Error copying files:', err);
    process.exit(1);
});
