var xhr = new XMLHttpRequest();
window.onload = function () {
    var backButton = document.getElementById('back-page');
    backButton.addEventListener('click', function () {
        window.location = "index.html";
    })
}

xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        properties = JSON.parse(xhr.responseText);
        propertyList = document.getElementById('single-property-list');

       placeProps(properties, propertyList)
    }
};
xhr.open('GET', 'get_properties.php?id=' + getQueryParam('id'));
xhr.send();

function placeProps(properties, propertyList){
    for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        var images = property.images ? property.images.split(',') : [];

        var propertyElement = document.createElement('li');
        propertyElement.className = 'property';
        propertyElement.innerHTML = '<a href="property.html?id=' + property.id + '">' +
            '<div class="single-property-images">' +
            (images.length > 0 ? '<img src="uploads/' + images[0] + '" alt="' + property.name + '">' : '') +
            (images.length > 1 ? '<button class="prev-button">&lt;</button><button class="next-button">&gt;</button>' : '') +
            '</div>' +
            '<div class="property-details">' +
            '<h3>' + property.name + '</h3>' +
            '<p>' + property.address + '</p>' +
            '<p>' + property.description + '</p>' +
            '<p class="property-price">' + property.price + ' руб.</p>' +
            '</div>' +
            '</a>';

        propertyList.appendChild(propertyElement);

        propertyElement.querySelector('a').addEventListener('click', function(event) {
            if (event.target.classList.contains('prev-button') || event.target.classList.contains('next-button')) {
                event.preventDefault();
            }
        });

        if (images.length > 1) {
            createSlideshow(propertyElement, images);
        }
    }
}

function createSlideshow(propertyElement, images) {
    var propertyImages = propertyElement.querySelector('.single-property-images');
    var propertyImg = propertyImages.querySelector('img');
    var imageIndex = 0;

    propertyImg.src = 'uploads/' + images[imageIndex];

    propertyElement.querySelector('.next-button').addEventListener('click', function() {
        imageIndex = (imageIndex + 1) % images.length;
        propertyImg.src = 'uploads/' + images[imageIndex];
    });

    propertyElement.querySelector('.prev-button').addEventListener('click', function() {
        imageIndex = (imageIndex - 1 + images.length) % images.length;
        propertyImg.src = 'uploads/' + images[imageIndex];
    });
}

function getQueryParam(name) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    return urlParams.get(name);
}