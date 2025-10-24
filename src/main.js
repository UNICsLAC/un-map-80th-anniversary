import './style.css';

let map;
let currentLanguage = 'es';
let markers = [];
let popup;
let allCountries = [];

const MODAL_DURATION = 10000;
let modalTimer = null;
let progressInterval = null;

function initWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const btnExplore = document.getElementById('btn-explore');
    const progressBar = document.getElementById('progress-bar');

    if (localStorage.getItem('hideWelcomeModal') === 'true') {
        modal.classList.add('hidden');
        return;
    }

    updateModalLanguage();

    modal.classList.remove('hidden');

    let progress = 0;
    const progressStep = 100 / (MODAL_DURATION / 100);

    progressInterval = setInterval(() => {
        progress += progressStep;
        if (progress >= 100) {
            closeModal();
        } else {
            progressBar.style.width = progress + '%';
        }
    }, 100);

    function closeModal() {
        clearInterval(progressInterval);
        modal.classList.add('hidden');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    btnExplore.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

function updateModalLanguage() {
    const isES = currentLanguage === 'es';

    document.getElementById('modal-title').textContent = isES
        ? '80 Años de Naciones Unidas en América Latina y el Caribe'
        : '80 Years of United Nations in Latin America and the Caribbean';

    document.getElementById('modal-description').textContent = isES
        ? 'Los países de América Latina y el Caribe se han unido para conmemorar el 80º aniversario de las Naciones Unidas con la creación de un mapa interactivo. Los invitamos a explorar el impacto y el trabajo de la ONU en cada país de la región.'
        : 'The countries of Latin America and the Caribbean have come together to commemorate the 80th anniversary of the United Nations with the creation of an interactive map. We invite you to explore the impact and work of the UN in each country in the region.';

    document.getElementById('btn-explore-text').textContent = isES
        ? 'Explorar Mapa'
        : 'Explore Map';

    const videoContainer = document.getElementById('modal-video-container');
    const videoSrc = isES
        ? 'video/UN_80th_Anniversary_No_Text_Square.mp4'
        : 'video/UN_80th_Anniversary_No_Text_Square.mp4';

    videoContainer.innerHTML = `
        <video autoplay muted loop playsinline>
            <source src="${videoSrc}" type="video/mp4">
            Tu navegador no soporta el elemento de video.
        </video>
    `;
}

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
        searchInput.placeholder = lang === 'es' ? 'Buscar Estados y Territorios...' : 'Search States and Territories...';
    }

    if (labelCountries) {
        labelCountries.textContent = lang === 'es' ? 'Estados y Territorios' : 'States and Territories';
    }

    localStorage.setItem('preferredLanguage', lang);

    if (map) map.closePopup();

    markers.forEach(marker => {
        const content = getInfoWindowContent(marker.countryData);
        marker.setPopupContent(content);
    });

    updateModalLanguage();
    updateDisclaimerLanguage();
    updateCountriesList();
}

window.setLanguage = setLanguage;

window.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('preferredLanguage');
    const initialLang = savedLang || detectBrowserLanguage();
    setLanguage(initialLang);

    setTimeout(() => {
        initWelcomeModal();
    }, 500);
});


function getFieldValue(country, fieldBase) {
    const field = currentLanguage === 'es' ? `${fieldBase}_ES` : `${fieldBase}_EN`;
    const rawValue = country[field];
    
    if (fieldBase === 'Country' && rawValue && rawValue.includes('*')) {
        const formattedValue = toTitleCase(rawValue);
        return formattedValue && formattedValue !== '' && formattedValue !== null && formattedValue !== undefined ? formattedValue : null;
    }
    
    return rawValue && rawValue !== '' && rawValue !== null && rawValue !== undefined ? rawValue : null;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        if (txt === '*' || txt === '(*' || txt === '*)') return txt;
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function truncateText(text) {
    return text || '';
}

function getYouTubeEmbedUrl(url) {
    if (!url) return null;

    const patterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
    }

    return null;
}

function setupScrollIndicator() {
    setTimeout(() => {
        const popupContent = document.querySelector('.leaflet-popup-content');
        const scrollIndicator = document.querySelector('.scroll-indicator-popup');

        if (popupContent && scrollIndicator) {
            const checkScroll = () => {
                const scrollTop = popupContent.scrollTop;
                const scrollHeight = popupContent.scrollHeight;
                const clientHeight = popupContent.clientHeight;
                const scrollBottom = scrollHeight - scrollTop - clientHeight;

                if (scrollBottom < 80) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            };

            checkScroll();
            popupContent.addEventListener('scroll', checkScroll);
        }
    }, 100);
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
    const youtubeUrl = getFieldValue(country, 'YoutubeUrl');

    let content = `
    <div class="info-window-modern" >
        <button class="custom-close-button" onclick="this.closest('.leaflet-popup-content-wrapper').parentElement.remove()">
            <i class="fa-solid fa-times"></i>
        </button>
        <div class="info-header">
            <div class="country-flag-large">
                <img src="${flagUrl}" alt="${countryName}" class="flag-img-large" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <h2>
            ${countryName || (isES ? 'País' : 'Country')}
            </h2>
        </div>
`;

    if (youtubeUrl) {
        const embedUrl = getYouTubeEmbedUrl(youtubeUrl);
        if (embedUrl) {
            content += `
            <div class="info-section video-section">
                <div class="section-content">
                    <h3>
                        <span class="section-icon"><i class="fa-brands fa-youtube"></i></span>
                        ${isES ? 'Video' : 'Video'}
                    </h3>
                    <div class="video-container">
                        <iframe 
                            src="${embedUrl}" 
                            width="100%" 
                            height="250" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            </div>
            `;
        }
    }

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

    content += `</div>
    <div class="scroll-indicator-popup">
  <i class="fa-solid fa-chevron-down"></i>
</div>`;
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
        resetAllMarkers();

        map.closePopup();

        map.setView(marker.getLatLng(), 6);

        setTimeout(() => {
            const content = getInfoWindowContent(country);
            marker.setPopupContent(content);
            marker.openPopup();

            setTimeout(() => {
                setupScrollIndicator();
            }, 150);
        }, 300);

        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');

        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('active')) {
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

function initDisclaimerAlert() {
    const alertHTML = `
        <div id="disclaimer-alert" class="disclaimer-alert">
            <p id="disclaimer-text"></p>
            <button id="close-disclaimer" class="close-disclaimer" aria-label="Close disclaimer">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', alertHTML);

    const closeBtn = document.getElementById('close-disclaimer');
    const alert = document.getElementById('disclaimer-alert');

    updateDisclaimerLanguage();

    closeBtn.addEventListener('click', () => {
        alert.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => {
            alert.remove();
        }, 300);
    });
}

function updateDisclaimerLanguage() {
    const disclaimerText = document.getElementById('disclaimer-text');
    if (!disclaimerText) return;

    const isES = currentLanguage === 'es';

    disclaimerText.innerHTML = isES
        ? `Los límites y nombres que aparecen en este mapa, así como las denominaciones utilizadas, no implican su reconocimiento o aceptación oficial por parte de las Naciones Unidas.<br>
  La frontera definitiva entre la República de Sudán y la República de Sudán del Sur aún no se ha determinado.<br>
  * Territorio no autónomo.<br>
  ** La línea punteada representa aproximadamente la línea de control en Jammu y Cachemira acordada por la India y Pakistán. Las partes aún no han acordado el estatus definitivo de Jammu y Cachemira.<br>
  *** Existe una disputa entre los Gobiernos de Argentina y el Reino Unido de Gran Bretaña e Irlanda del Norte sobre la soberanía de las Islas Malvinas (Falkland).`
        : `The boundaries and names shown and the designations used on this map do not imply official endorsement or acceptance by the United Nations.<br>
  Final boundary between the Republic of Sudan and the Republic of South Sudan has not yet been determined.<br>
  * Non-Self-Governing Territory<br>
  ** Dotted line represents approximately the Line of Control in Jammu and Kashmir agreed upon by India and Pakistan. The final status of Jammu and Kashmir has not yet been agreed upon by the parties.<br>
  *** A dispute exists between the Governments of Argentina and the United Kingdom of Great Britain and Northern Ireland concerning sovereignty over the Falkland Islands (Malvinas).`;
}

function initMap(countryData) {
    allCountries = countryData;

    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 20]
    });

    const customIconHover = L.divIcon({
        className: 'custom-marker hover',
        html: '<div class="marker-pin"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
    });

    map = L.map('map-container', {
        zoomControl: false,
        minZoom: 3,
        maxZoom: 6,
        tap: true,
        touchZoom: true,
        doubleClickZoom: true,
        scrollWheelZoom: true
    }).setView([-15, -70], 2);

    L.esri.tiledMapLayer({
        url: "https://geoservices.un.org/arcgis/rest/services/ClearMap_WebPlain/MapServer",
        minZoom: 3,
        maxZoom: 6
    }).addTo(map);

    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];

    countryData.forEach((country, index) => {
        const lat = cleanCoordinate(country.Latitude);
        const lng = cleanCoordinate(country.Longitude);

        if (lat === null || lng === null) {
            return;
        }

        const marker = L.marker([lat, lng], {
            icon: customIcon,
            title: getFieldValue(country, 'Country'),
            riseOnHover: false,
            riseOffset: 0
        }).addTo(map);

        marker.countryData = country;
        marker.countryIndex = index;
        marker.isHovered = false;

        const content = getInfoWindowContent(country);
        marker.bindPopup(content, {
            maxWidth: 700,
            className: 'custom-popup',
            closeButton: false,
            autoClose: false,
            closeOnClick: false,
            keepInView: false
        });

        const handleMarkerClick = (e) => {
            e.originalEvent.stopPropagation();
            e.originalEvent.preventDefault();

            map.closePopup();
            resetAllMarkers();

            marker.openPopup();
            setupScrollIndicator();
        };

        marker.on('click', handleMarkerClick);

        marker.on('touchend', (e) => {
            e.originalEvent.stopPropagation();
            e.originalEvent.preventDefault();

            map.closePopup();
            resetAllMarkers();

            marker.openPopup();
            setupScrollIndicator();
        });

        marker.on('mouseover', () => {
            if (!marker.isHovered) {
                marker.setIcon(customIconHover);
                marker.isHovered = true;
            }
        });

        marker.on('mouseout', () => {
            if (marker.isHovered) {
                marker.setIcon(customIcon);
                marker.isHovered = false;
            }
        });

        markers.push(marker);
    });

    map.on('click', (e) => {
        if (e.originalEvent.target.classList.contains('leaflet-container') ||
            e.originalEvent.target.classList.contains('leaflet-map-pane')) {
            map.closePopup();
            resetAllMarkers();
        }
    });

    map.on('dragend', () => {
        map.dragging.enable();
    });

    updateCountriesList();

    document.getElementById('search-input').addEventListener('input', updateCountriesList);

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = sidebar.classList.contains('active');

        if (wasActive) {
            sidebar.classList.remove('active');
            sidebarToggle.style.opacity = '1';
            sidebarToggle.style.pointerEvents = 'auto';
        } else {
            sidebar.classList.add('active');
            sidebarToggle.style.opacity = '0';
            sidebarToggle.style.pointerEvents = 'none';
        }
    });

    document.getElementById('map-container').addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarToggle.style.opacity = '1';
            sidebarToggle.style.pointerEvents = 'auto';
        }
    });

    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !sidebarToggle.contains(e.target)) {
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
        const response = await fetch('data/countries.json');
        if (!response.ok) {
            throw new Error(`Error al cargar countries.json: ${response.status}`);
        }

        const data = await response.json();
        initMap(data);
        initDisclaimerAlert();

    } catch (error) {
        document.getElementById("map-container").innerHTML =
            `<div class="error-message">
                <h2>❌ Error</h2>
                <p>${error.message}</p>
            </div>`;
    }
}

loadDataAndInitMap();

function resetAllMarkers() {
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 20]
    });

    markers.forEach(marker => {
        marker.setIcon(customIcon);
        marker.isHovered = false;
    });
}

function ensureMapInteraction() {
    if (map) {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
    }
}

function handleMarkerInteraction(country) {
    map.closePopup();

    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 20]
    });

    markers.forEach(m => {
        m.setIcon(customIcon);
        m.isHovered = false;
    });

    const marker = markers.find(m => m.countryData === country);
    if (marker) {
        const content = getInfoWindowContent(country);
        marker.bindPopup(content, {
            maxWidth: 700,
            className: 'custom-popup',
            closeButton: false,
            autoClose: false,
            closeOnClick: false,
            keepInView: true
        }).openPopup();

        setupScrollIndicator();

        setTimeout(() => {
            ensureMapInteraction();
        }, 100);
    }
}