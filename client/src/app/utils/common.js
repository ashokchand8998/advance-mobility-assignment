export const openImageInNewTab = (url) => {
    var image = new Image();

    image.src = url;

    var _window = window.open('');
    _window.document.write(image.outerHTML);
}

// Convert file to base64 string
export const fileToBase64 = (filename, filepath) => {
    return new Promise(resolve => {
        var file = new File([filename], filepath);
        var reader = new FileReader();
        // Read file content on file loaded event
        reader.onload = function (event) {
            resolve(event.target.result);
        };

        // Convert data to base64 
        reader.readAsDataURL(file);
    });
};