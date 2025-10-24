(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();let l,m="es",p=[],S=[];const x=1e4;let T=null;function P(){const e=document.getElementById("welcome-modal"),t=document.getElementById("modal-close"),s=document.getElementById("modal-overlay"),n=document.getElementById("btn-explore"),o=document.getElementById("progress-bar");if(localStorage.getItem("hideWelcomeModal")==="true"){e.classList.add("hidden");return}B(),e.classList.remove("hidden");let r=0;const c=100/(x/100);T=setInterval(()=>{r+=c,r>=100?a():o.style.width=r+"%"},100);function a(){clearInterval(T),e.classList.add("hidden")}t.addEventListener("click",a),s.addEventListener("click",a),n.addEventListener("click",a),document.addEventListener("keydown",u=>{u.key==="Escape"&&!e.classList.contains("hidden")&&a()})}function B(){const e=m==="es";document.getElementById("modal-title").textContent=e?"80 Años de Naciones Unidas en América Latina y el Caribe":"80 Years of United Nations in Latin America and the Caribbean",document.getElementById("modal-description").textContent=e?"Los países de América Latina y el Caribe se han unido para conmemorar el 80º aniversario de las Naciones Unidas con la creación de un mapa interactivo. Los invitamos a explorar el impacto y el trabajo de la ONU en cada país de la región.":"The countries of Latin America and the Caribbean have come together to commemorate the 80th anniversary of the United Nations with the creation of an interactive map. We invite you to explore the impact and work of the UN in each country in the region.",document.getElementById("btn-explore-text").textContent=e?"Explorar Mapa":"Explore Map";const t=document.getElementById("modal-video-container"),s="video/UN_80th_Anniversary_No_Text_Square.mp4";t.innerHTML=`
        <video autoplay muted loop playsinline>
            <source src="${s}" type="video/mp4">
            Tu navegador no soporta el elemento de video.
        </video>
    `}function N(e){const t=e.CountryCode?.toLowerCase();return t?`https://flagcdn.com/w80/${t}.png`:"https://flagcdn.com/w80/un.png"}function A(){return(navigator.language||navigator.userLanguage).startsWith("es")?"es":"en"}function I(e){m=e;const t=document.getElementById("logo-img");t&&(e==="es"?t.src="img/UN80_Logo_Lockup_white_S.png":t.src="img/UN80_Logo_Lockup_white_E.png");const s=document.getElementById("btn-es"),n=document.getElementById("btn-en");s&&n&&(e==="es"?(s.classList.add("active"),n.classList.remove("active")):(n.classList.add("active"),s.classList.remove("active")));const o=document.getElementById("search-input"),r=document.querySelector("[data-label-countries]");o&&(o.placeholder=e==="es"?"Buscar Estados y Territorios...":"Search States and Territories..."),r&&(r.textContent=e==="es"?"Estados y Territorios":"States and Territories"),localStorage.setItem("preferredLanguage",e),l&&l.closePopup(),p.forEach(c=>{const a=C(c.countryData);c.setPopupContent(a)}),B(),M(),w()}window.setLanguage=I;window.addEventListener("DOMContentLoaded",function(){const t=localStorage.getItem("preferredLanguage")||A();I(t),setTimeout(()=>{P()},500)});function d(e,t){const s=m==="es"?`${t}_ES`:`${t}_EN`,n=e[s];return n&&n!==""&&n!==null&&n!==void 0?n:null}function y(e){return e||""}function _(e){if(!e)return null;const t=[/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/];for(const s of t){const n=e.match(s);if(n&&n[1])return`https://www.youtube.com/embed/${n[1]}`}return null}function E(){setTimeout(()=>{const e=document.querySelector(".leaflet-popup-content"),t=document.querySelector(".scroll-indicator-popup");if(e&&t){const s=()=>{const n=e.scrollTop,o=e.scrollHeight,r=e.clientHeight;o-n-r<80?t.style.opacity="0":t.style.opacity="1"};s(),e.addEventListener("scroll",s)}},100)}function C(e){const t=m==="es",s=d(e,"Country"),n=d(e,"Year"),o=d(e,"Agencies"),r=d(e,"Staff"),c=d(e,"Work"),a=d(e,"Message"),u=d(e,"Presence"),v=N(e),f=d(e,"YoutubeUrl");let i=`
    <div class="info-window-modern" >
        <button class="custom-close-button" onclick="this.closest('.leaflet-popup-content-wrapper').parentElement.remove()">
            <i class="fa-solid fa-times"></i>
        </button>
        <div class="info-header">
            <div class="country-flag-large">
                <img src="${v}" alt="${s}" class="flag-img-large" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <h2>
            ${s||(t?"País":"Country")}
            </h2>
        </div>
`;if(f){const h=_(f);h&&(i+=`
            <div class="info-section video-section">
                <div class="section-content">
                    <h3>
                        <span class="section-icon"><i class="fa-brands fa-youtube"></i></span>
                        Video
                    </h3>
                    <div class="video-container">
                        <iframe 
                            src="${h}" 
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
            `)}return n&&(i+=`
        <div class="info-section year-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-calendar-days"></i></span>
                    ${t?"Año de Adhesión":"Year of Joining"}
                </h3>
                <p>${y(n)}</p>
            </div>
        </div>
        `),o&&(i+=`
        <div class="info-section agencies-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-building-columns"></i></span>
                    ${t?"Agencias y Programas":"Agencies and Programs"}
                </h3>
                <p>${y(o)}</p>
            </div>
        </div>
        `),r&&(i+=`
        <div class="info-section staff-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-users"></i></span>
                    ${t?"Personal":"Staff"}
                </h3>
                <p>${r}</p>
            </div>
        </div>
        `),c&&(i+=`
        <div class="info-section work-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-briefcase"></i></span>
                    ${t?"Áreas de Trabajo":"Work Areas"}
                </h3>
                <div class="scrollable-content">
                    <p>${y(c)}</p>
                </div>
            </div>
        </div>
        `),a&&(i+=`
        <div class="info-section message-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-message"></i></span>
                    ${t?"Mensaje 80º Aniversario":"80th Anniversary Message"}
                </h3>
                <p class="message-text">${y(a)}</p>
                <span class="anniversary-badge">2025</span>
            </div>
        </div>
        `),u&&(i+=`
        <div class="info-footer">
            <a href="${u}" target="_blank" class="visit-link">
                <span>${t?"Visitar sitio web":"Visit website"}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
        `),i+=`</div>
    <div class="scroll-indicator-popup">
  <i class="fa-solid fa-chevron-down"></i>
</div>`,i}function w(){const e=document.getElementById("search-input").value.toLowerCase(),t=document.getElementById("countries-list");t.innerHTML="";const s=S.filter(n=>d(n,"Country")?.toLowerCase().includes(e)||!1);if(document.getElementById("countries-count").textContent=s.length,s.length===0){t.innerHTML=`
            <div class="no-results">
                <div><i class="fas fa-search"></i></div>
                <p>${m==="es"?"No se encontraron países":"No countries found"}</p>
            </div>
        `;return}s.forEach(n=>{const o=d(n,"Country"),r=d(n,"Year"),c=N(n),a=document.createElement("div");a.className="country-item",a.innerHTML=`
            <div class="flag-circle">
                <img src="${c}" alt="${o}" class="flag-img" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <div class="country-info">
                <div class="country-name">${o}</div>
                <div class="country-year">${m==="es"?"Año: ":"Year: "}${r}</div>
            </div>
        `,a.onclick=()=>U(n),t.appendChild(a)})}function U(e){const t=p.find(s=>s.countryData===e);if(t){b(),l.closePopup(),l.setView(t.getLatLng(),6),setTimeout(()=>{const o=C(e);t.setPopupContent(o),t.openPopup(),setTimeout(()=>{E()},150)},300);const s=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle");window.innerWidth<=768&&s&&s.classList.contains("active")&&(s.classList.remove("active"),n.style.opacity="1",n.style.pointerEvents="auto")}}function k(e){if(!e)return null;let t=String(e);t=t.replace(/−/g,"-"),t=t.replace(/\u2212/g,"-");const s=parseFloat(t);return isNaN(s)?null:s}function H(){document.body.insertAdjacentHTML("beforeend",`
        <div id="disclaimer-alert" class="disclaimer-alert">
            <p id="disclaimer-text"></p>
            <button id="close-disclaimer" class="close-disclaimer" aria-label="Close disclaimer">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
    `);const t=document.getElementById("close-disclaimer"),s=document.getElementById("disclaimer-alert");M(),t.addEventListener("click",()=>{s.style.animation="slideDown 0.3s ease-out",setTimeout(()=>{s.remove()},300)})}function M(){const e=document.getElementById("disclaimer-text");if(!e)return;const t=m==="es";e.innerHTML=t?`Los límites y nombres que aparecen en este mapa, así como las denominaciones utilizadas, no implican su reconocimiento o aceptación oficial por parte de las Naciones Unidas.<br>
  La frontera definitiva entre la República de Sudán y la República de Sudán del Sur aún no se ha determinado.<br>
  * Territorio no autónomo.<br>
  ** La línea punteada representa aproximadamente la línea de control en Jammu y Cachemira acordada por la India y Pakistán. Las partes aún no han acordado el estatus definitivo de Jammu y Cachemira.<br>
  *** Existe una disputa entre los Gobiernos de Argentina y el Reino Unido de Gran Bretaña e Irlanda del Norte sobre la soberanía de las Islas Malvinas (Falkland).`:`The boundaries and names shown and the designations used on this map do not imply official endorsement or acceptance by the United Nations.<br>
  Final boundary between the Republic of Sudan and the Republic of South Sudan has not yet been determined.<br>
  * Non-Self-Governing Territory<br>
  ** Dotted line represents approximately the Line of Control in Jammu and Kashmir agreed upon by India and Pakistan. The final status of Jammu and Kashmir has not yet been agreed upon by the parties.<br>
  *** A dispute exists between the Governments of Argentina and the United Kingdom of Great Britain and Northern Ireland concerning sovereignty over the Falkland Islands (Malvinas).`}function O(e){S=e;const t=L.divIcon({className:"custom-marker",html:'<div class="marker-pin"></div>',iconSize:[20,20],iconAnchor:[10,20]}),s=L.divIcon({className:"custom-marker hover",html:'<div class="marker-pin"></div>',iconSize:[24,24],iconAnchor:[12,24]});l=L.map("map-container",{zoomControl:!1,minZoom:3,maxZoom:6,tap:!0,touchZoom:!0,doubleClickZoom:!0,scrollWheelZoom:!0}).setView([-15,-70],2),L.esri.tiledMapLayer({url:"https://geoservices.un.org/arcgis/rest/services/ClearMap_WebPlain/MapServer",minZoom:3,maxZoom:6}).addTo(l),p.forEach(a=>{l.removeLayer(a)}),p=[],e.forEach((a,u)=>{const v=k(a.Latitude),f=k(a.Longitude);if(v===null||f===null)return;const i=L.marker([v,f],{icon:t,title:d(a,"Country"),riseOnHover:!1,riseOffset:0}).addTo(l);i.countryData=a,i.countryIndex=u,i.isHovered=!1;const h=C(a);i.bindPopup(h,{maxWidth:700,className:"custom-popup",closeButton:!1,autoClose:!1,closeOnClick:!1,keepInView:!1});const $=g=>{g.originalEvent.stopPropagation(),g.originalEvent.preventDefault(),l.closePopup(),b(),i.openPopup(),E()};i.on("click",$),i.on("touchend",g=>{g.originalEvent.stopPropagation(),g.originalEvent.preventDefault(),l.closePopup(),b(),i.openPopup(),E()}),i.on("mouseover",()=>{i.isHovered||(i.setIcon(s),i.isHovered=!0)}),i.on("mouseout",()=>{i.isHovered&&(i.setIcon(t),i.isHovered=!1)}),p.push(i)}),l.on("click",a=>{(a.originalEvent.target.classList.contains("leaflet-container")||a.originalEvent.target.classList.contains("leaflet-map-pane"))&&(l.closePopup(),b())}),l.on("dragend",()=>{l.dragging.enable()}),w(),document.getElementById("search-input").addEventListener("input",w);const n=document.getElementById("sidebar-toggle"),o=document.getElementById("sidebar");n.addEventListener("click",a=>{a.stopPropagation(),o.classList.contains("active")?(o.classList.remove("active"),n.style.opacity="1",n.style.pointerEvents="auto"):(o.classList.add("active"),n.style.opacity="0",n.style.pointerEvents="none")}),document.getElementById("map-container").addEventListener("click",()=>{o.classList.contains("active")&&(o.classList.remove("active"),n.style.opacity="1",n.style.pointerEvents="auto")}),document.addEventListener("click",a=>{o.classList.contains("active")&&!o.contains(a.target)&&!n.contains(a.target)&&(o.classList.remove("active"),n.style.opacity="1",n.style.pointerEvents="auto")});const c=localStorage.getItem("preferredLanguage")||A();I(c)}async function D(){try{const e=await fetch("data/countries.json");if(!e.ok)throw new Error(`Error al cargar countries.json: ${e.status}`);const t=await e.json();O(t),H()}catch(e){document.getElementById("map-container").innerHTML=`<div class="error-message">
                <h2>❌ Error</h2>
                <p>${e.message}</p>
            </div>`}}D();function b(){const e=L.divIcon({className:"custom-marker",html:'<div class="marker-pin"></div>',iconSize:[20,20],iconAnchor:[10,20]});p.forEach(t=>{t.setIcon(e),t.isHovered=!1})}
