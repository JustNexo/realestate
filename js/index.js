// Make an AJAX request to get the properties data
var xhr = new XMLHttpRequest()
xhr.withCredentials = false;
var properties;
var propertyList;
window.onload = function () {
    var filterInput = document.getElementById('filter-input');
    var sortAscButton = document.getElementById('sort-asc');
    var sortDescButton = document.getElementById('sort-desc');
    var loginButton = document.getElementById('login');
    
    
    loginButton.addEventListener('click', function () {
        window.location = "login.html";
    })
    filterInput.addEventListener('input', filterProperties);
    sortAscButton.addEventListener('click', sortProperties('asc'));
    sortDescButton.addEventListener('click', sortProperties('desc'));
}

function filterProperties() {
    var filterValue = document.getElementById('filter-input').value;

    for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        var propertyElement = propertyList.children[i];
        if (property.address.includes(filterValue)) {
            propertyElement.style.display = 'block';
        } else {
            propertyElement.style.display = 'none';
        }
    }
}

function sortProperties(order) {
    return function () {
        if (!properties) return;

        properties.sort(function (a, b) {
            if (order === 'asc') {
                return a.price - b.price;
            } else if (order === 'desc') {
                return b.price - a.price;
            }
        });

        propertyList.innerHTML = '';

        placeProps(properties, propertyList);
    }
}
xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        properties = JSON.parse(xhr.responseText);
        propertyList = document.getElementById('property-list');

       placeProps(properties, propertyList);
    }
};

function placeProps(properties, propertyList){
    for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        var images = property.images ? property.images.split(',') : [];

        var propertyElement = document.createElement('li');
        propertyElement.className = 'property';
        propertyElement.innerHTML = '<a href="property.html?id=' + property.id + '">' +
            '<div class="property-images">' +
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
    var propertyImages = propertyElement.querySelector('.property-images');
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
xhr.open('GET', 'get_properties.php');
xhr.send();