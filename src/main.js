import './style.css';
const API_KEY = import.meta.env.VITE_API_KEY;

let map;
let currentLanguage = 'es';
let markers = [];
let infowindow;
let customMarkerIcon;
let allCountries = [];

function getCountryFlagUrl(country) {
    const code = country.CountryCode?.toLowerCase();
    if (!code) {
        return 'https://flagcdn.com/w80/un.png';
    }
    return `https://flagcdn.com/w80/${code}.png`;
}

function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('es') ? 'es' : 'en';
}

function setLanguage(lang) {
    currentLanguage = lang;
    
    const logoImg = document.getElementById('logo-img');
    if (logoImg) {
        if (lang === 'es') {
            logoImg.src = 'img/UN80_Logo_Lockup_white_S.png'; 
        } else {
            logoImg.src = 'img/UN80_Logo_Lockup_white_E.png'; 
        }
    }
    
    const btnEs = document.getElementById('btn-es');
    const btnEn = document.getElementById('btn-en');
    
    if (btnEs && btnEn) {
        if (lang === 'es') {
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnEs.classList.remove('active');
        }
    }
    
    const searchInput = document.getElementById('search-input');
    const labelCountries = document.querySelector('[data-label-countries]');
    
    if (searchInput) {
        searchInput.placeholder = lang === 'es' ? 'Buscar país...' : 'Search country...';
    }
    
    if (labelCountries) {
        labelCountries.textContent = lang === 'es' ? 'Países' : 'Countries';
    }
    
    localStorage.setItem('preferredLanguage', lang);
    
    if (infowindow) infowindow.close();
    
    updateCountriesList();
}

window.setLanguage = setLanguage;

window.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    const initialLang = savedLang || detectBrowserLanguage();
    setLanguage(initialLang);
});

function getFieldValue(country, fieldBase) {
    const field = currentLanguage === 'es' ? `${fieldBase}_ES` : `${fieldBase}_EN`;
    const value = country[field];
    return value && value !== '' && value !== null && value !== undefined ? value : null;
}

function truncateText(text) {
    return text || '';
}

function getInfoWindowContent(country) {
    const isES = currentLanguage === 'es';
    const countryName = getFieldValue(country, 'Country');
    const year = getFieldValue(country, 'Year');
    const agencies = getFieldValue(country, 'Agencies');
    const staff = getFieldValue(country, 'Staff');
    const work = getFieldValue(country, 'Work');
    const message = getFieldValue(country, 'Message');
    const presence = getFieldValue(country, 'Presence');
    const flagUrl = getCountryFlagUrl(country);

    let content = `
    <div class="info-window-modern">
        <div class="info-header">
            <div class="country-flag-large">
                <img src="${flagUrl}" alt="${countryName}" class="flag-img-large" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <h2>
            ${countryName || (isES ? 'País' : 'Country')}
            </h2>
        </div>
`;

    if (year) {
        content += `
        <div class="info-section year-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-calendar-days"></i></span>
                    ${isES ? 'Año de Adhesión' : 'Year of Joining'}
                </h3>
                <p>${truncateText(year, 200)}</p>
            </div>
        </div>
        `;
    }

    if (agencies) {
        content += `
        <div class="info-section agencies-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-building-columns"></i></span>
                    ${isES ? 'Agencias y Programas' : 'Agencies and Programs'}
                </h3>
                <p>${truncateText(agencies, 200)}</p>
            </div>
        </div>
        `;
    }

    if (staff) {
        content += `
        <div class="info-section staff-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-users"></i></span>
                    ${isES ? 'Personal' : 'Staff'}
                </h3>
                <p>${staff}</p>
            </div>
        </div>
        `;
    }

    if (work) {
        content += `
        <div class="info-section work-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-briefcase"></i></span>
                    ${isES ? 'Áreas de Trabajo' : 'Work Areas'}
                </h3>
                <div class="scrollable-content">
                    <p>${truncateText(work, 400)}</p>
                </div>
            </div>
        </div>
        `;
    }

    if (message) {
        content += `
        <div class="info-section message-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-message"></i></span>
                    ${isES ? 'Mensaje 80º Aniversario' : '80th Anniversary Message'}
                </h3>
                <p class="message-text">${truncateText(message, 300)}</p>
                <span class="anniversary-badge">2025</span>
            </div>
        </div>
        `;
    }

    if (presence) {
        content += `
        <div class="info-footer">
            <a href="${presence}" target="_blank" class="visit-link">
                <span>${isES ? 'Visitar sitio web' : 'Visit website'}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
        `;
    }

    content += `</div>`;
    return content;
}

function updateCountriesList() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const countriesList = document.getElementById('countries-list');
    countriesList.innerHTML = '';

    const filtered = allCountries.filter(country => {
        const name = getFieldValue(country, 'Country');
        return name?.toLowerCase().includes(searchTerm) || false;
    });

    document.getElementById('countries-count').textContent = filtered.length;

    if (filtered.length === 0) {
        countriesList.innerHTML = `
            <div class="no-results">
                <div><i class="fas fa-search"></i></div>
                <p>${currentLanguage === 'es' ? 'No se encontraron países' : 'No countries found'}</p>
            </div>
        `;
        return;
    }

    filtered.forEach(country => {
        const name = getFieldValue(country, 'Country');
        const year = getFieldValue(country, 'Year');
        const flagUrl = getCountryFlagUrl(country);

        const item = document.createElement('div');
        item.className = 'country-item';
        item.innerHTML = `
            <div class="flag-circle">
                <img src="${flagUrl}" alt="${name}" class="flag-img" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <div class="country-info">
                <div class="country-name">${name}</div>
                <div class="country-year">${currentLanguage === 'es' ? 'Año: ' : 'Year: '}${year}</div>
            </div>
        `;
        item.onclick = () => selectCountry(country);
        countriesList.appendChild(item);
    });
}

function selectCountry(country) {
    const marker = markers.find(m => m.countryData === country);
    if (marker) {
        map.panTo(marker.position);
        map.setZoom(6);

        google.maps.event.trigger(marker, 'click');

        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarToggle.style.opacity = '1';
            sidebarToggle.style.pointerEvents = 'auto';
        }
    }
}

function cleanCoordinate(coord) {
    if (!coord) return null;
    let str = String(coord);
    str = str.replace(/−/g, '-');
    str = str.replace(/\u2212/g, '-');
    const num = parseFloat(str);
    return isNaN(num) ? null : num;
}

function initMap(countryData) {

    allCountries = countryData;

    customMarkerIcon = {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: '#0066CC',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 1.8,
        anchor: new google.maps.Point(12, 24),
    };

    const mapStyles = [
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#a8daff" }]
        },
        {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
        }
    ];

    map = new google.maps.Map(document.getElementById("map-container"), {
        center: { lat: -8, lng: -55 },
        zoom: 3,
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'greedy'  

    });

    infowindow = new google.maps.InfoWindow({
        maxWidth: 450,
        pixelOffset: new google.maps.Size(0, -40)
    });

    let markersCreated = 0;

    countryData.forEach(country => {
        const lat = cleanCoordinate(country.Latitude);
        const lng = cleanCoordinate(country.Longitude);

        if (lat === null || lng === null) {
            console.warn('Coordenadas inválidas para:', getFieldValue(country, 'Country'));
            return;
        }

        const marker = new google.maps.Marker({
            position: { lat, lng },
            map,
            title: getFieldValue(country, 'Country'),
            icon: customMarkerIcon,
            animation: google.maps.Animation.DROP,
            optimized: false
        });

        marker.countryData = country;

        marker.addListener("click", () => {
            infowindow.close();
            const content = getInfoWindowContent(country);
            infowindow.setContent(content);
            infowindow.open(map, marker);

            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => marker.setAnimation(null), 750);
        });

        marker.addListener("mouseover", () => {
            marker.setIcon({
                ...customMarkerIcon,
                fillColor: '#0099FF',
                scale: 2.2
            });
        });

        marker.addListener("mouseout", () => {
            marker.setIcon(customMarkerIcon);
        });

        markers.push(marker);
        markersCreated++;
    });


    updateCountriesList();

    document.getElementById('search-input').addEventListener('input', updateCountriesList);

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    sidebarToggle.addEventListener('click', () => {
        const wasActive = sidebar.classList.contains('active');
        sidebar.classList.toggle('active');
        
        if (!wasActive) {
            setTimeout(() => {
                sidebarToggle.style.opacity = '0';
                sidebarToggle.style.pointerEvents = 'none';
            }, 300);
        } else {
            sidebarToggle.style.opacity = '1';
            sidebarToggle.style.pointerEvents = 'auto';
        }
    });

    document.getElementById('map-container').addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarToggle.style.opacity = '1';
            sidebarToggle.style.pointerEvents = 'auto';
        }
    });

    const savedLang = localStorage.getItem('preferredLanguage');
    const initialLang = savedLang || detectBrowserLanguage();
    setLanguage(initialLang);
}

async function loadDataAndInitMap() {
    try {

        if (!API_KEY) {
            throw new Error('API_KEY no está configurado');
        }

        const response = await fetch('/countries.json');
        if (!response.ok) {
            throw new Error(`Error al cargar countries.json: ${response.status}`);
        }

        const data = await response.json();

        window.initGoogleMap = function () {
            initMap(data);
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&loading=async&callback=initGoogleMap`;
        script.async = true;
        script.defer = true;

        script.onerror = () => {
            document.getElementById("map-container").innerHTML =
                `<div class="error-message">
                    <h2>⚠️ Error al cargar Google Maps</h2>
                    <p>Verificar API Key y configuración</p>
                </div>`;
        };

        document.head.appendChild(script);

    } catch (error) {
        document.getElementById("map-container").innerHTML =
            `<div class="error-message">
                <h2>❌ Error</h2>
                <p>${error.message}</p>
            </div>`;
    }
}

loadDataAndInitMap();