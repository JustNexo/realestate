var xhr = new XMLHttpRequest();
const token = localStorage.getItem('token');

function editProp(event) {

}

window.onload = function () {
     var showFormBtn = document.getElementById('show-form-btn');
     var propertyForm = document.getElementById('property-form-wrapper');
     var propertylist = document.getElementById('property-list');
     var closeFormBtn = document.getElementById('close-form-button');
     var addPropertyBtn = document.getElementById('property-form');
     var logoutBtn = document.getElementById('logout');
     var editBtn = document.getElementById('edit-button');

     editBtn.addEventListener('click', editProp(event));

     logoutBtn.addEventListener('click', function () {
         localStorage.removeItem('token');
         window.location.href = '/realestate/login.html';
     })
         
     addPropertyBtn.addEventListener('submit', function (event) {
         event.preventDefault();

         var formData = {
             token: localStorage.getItem('token'),
             name: document.getElementById('property-name').value,
             address: document.getElementById('property-address').value,
             price: document.getElementById('property-price').value,
             description: document.getElementById('property-description').value,
             images: []
         };

         var imageFiles = Array.from(document.querySelector('#property-image').files);
         for (var i = 0; i < imageFiles.length; i++) {
             var reader = new FileReader();
             reader.onloadend = function () {
                 formData.images.push(reader.result);
                 if (formData.images.length === imageFiles.length) {

                     var xhr = new XMLHttpRequest();
                     xhr.withCredentials = true;
                     xhr.open('POST', 'add_property.php', true);
                     xhr.setRequestHeader('Content-Type', 'application/json');

                     xhr.onload = function() {
                         if (xhr.status === 200) {
                             console.log(xhr.response);
                         } else {
                             console.error('Error:', xhr.statusText);
                         }
                     };

                     xhr.send(JSON.stringify(formData));
                 }
             };
             reader.readAsDataURL(imageFiles[i]);
         }
     })
     closeFormBtn.addEventListener('click', function () {
         propertyForm.style.display = 'none';
         propertylist.style.display = 'block';
     })
     showFormBtn.addEventListener('click', function() {
        propertyForm.style.display = 'block';
        propertylist.style.display = 'none';
    });

}

if (!token) {
    window.location.href = '/realestate/login.html';
} else {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
            } else {
                localStorage.removeItem('token');
                window.location.href = '/realestate/login.html';
            }
        } else {
            console.error(`Error checking login: ${xhr.status}`);
        }
    };
    xhr.send(`token=` + token);
}

xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        properties = JSON.parse(xhr.responseText);
        propertyList = document.getElementById('property-list');

        placeProps(properties, propertyList);
    }
};
xhr.open('POST', 'get_properties.php');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(`token=`+token);

function placeProps(properties, propertyList){
    for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        var images = property.images ? property.images.split(',') : [];

        var propertyElement = document.createElement('li');
        propertyElement.className = 'property';
        propertyElement.innerHTML = '<a href="property.html?id=' + property.id + '" data-id="' + property.id + '">' +
            '<div class="property-images">' +
            (images.length > 0 ? '<img src="uploads/' + images[0] + '" alt="' + property.name + '">' : '') +
            (images.length > 1 ? '<button class="prev-button">&lt;</button><button class="next-button">&gt;</button>' : '') +
            '</div>' +
            '<div class="property-details">' +
            '<h3>' + property.name + '</h3>' +
            '<p>' + property.address + '</p>' +
            '<p>' + property.description + '</p>' +
            '<p class="property-price">' + formatPrice(property.price) + ' руб.</p>' +
            '</div>' +
            '</a>'+
            '<button id="edit-button">Ред.</button>';

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

function formatPrice(price) {
    var parts = price.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    if (parts[1] && parts[1].length > 0) {
        parts[1] = parts[1].padEnd(2, '0');
    }
    return parts.join('.');
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
