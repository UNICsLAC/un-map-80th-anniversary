(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const b="AIzaSyBhX713KBYiK4uUXSHJtYUS2TIlWdOi59s";let m,p="es",C=[],g,v,T=[];const S=1e4;let E=null;function k(){const e=document.getElementById("welcome-modal"),t=document.getElementById("modal-close"),n=document.getElementById("modal-overlay"),o=document.getElementById("btn-explore"),s=document.getElementById("progress-bar");if(localStorage.getItem("hideWelcomeModal")==="true"){e.classList.add("hidden");return}B(),e.classList.remove("hidden");let i=0;const r=100/(S/100);E=setInterval(()=>{i+=r,i>=100?a():s.style.width=i+"%"},100);function a(){clearInterval(E),e.classList.add("hidden")}t.addEventListener("click",a),n.addEventListener("click",a),o.addEventListener("click",a),document.addEventListener("keydown",u=>{u.key==="Escape"&&!e.classList.contains("hidden")&&a()})}function B(){const e=p==="es";document.getElementById("modal-title").textContent=e?"80 Años de Naciones Unidas en América Latina y el Caribe":"80 Years of United Nations in Latin America and the Caribbean",document.getElementById("modal-description").textContent=e?"Los países de América Latina y el Caribe se han unido para conmemorar el 80º aniversario de las Naciones Unidas con la creación de un mapa interactivo. Los invitamos a explorar el impacto y el trabajo de la ONU en cada país de la región.":"The countries of Latin America and the Caribbean have come together to commemorate the 80th anniversary of the United Nations with the creation of an interactive map. We invite you to explore the impact and work of the UN in each country in the region.",document.getElementById("btn-explore-text").textContent=e?"Explorar Mapa":"Explore Map";const t=document.getElementById("modal-video-container"),n="video/UN_80th_Anniversary_No_Text_Square.mp4";t.innerHTML=`
        <video autoplay muted loop playsinline>
            <source src="${n}" type="video/mp4">
            Tu navegador no soporta el elemento de video.
        </video>
    `}function $(e){const t=e.CountryCode?.toLowerCase();return t?`https://flagcdn.com/w80/${t}.png`:"https://flagcdn.com/w80/un.png"}function A(){return(navigator.language||navigator.userLanguage).startsWith("es")?"es":"en"}function L(e){p=e;const t=document.getElementById("logo-img");t&&(e==="es"?t.src="img/UN80_Logo_Lockup_white_S.png":t.src="img/UN80_Logo_Lockup_white_E.png");const n=document.getElementById("btn-es"),o=document.getElementById("btn-en");n&&o&&(e==="es"?(n.classList.add("active"),o.classList.remove("active")):(o.classList.add("active"),n.classList.remove("active")));const s=document.getElementById("search-input"),i=document.querySelector("[data-label-countries]");s&&(s.placeholder=e==="es"?"Buscar país...":"Search country..."),i&&(i.textContent=e==="es"?"Países":"Countries"),localStorage.setItem("preferredLanguage",e),g&&g.close(),B(),M(),h()}window.setLanguage=L;window.addEventListener("DOMContentLoaded",function(){const t=localStorage.getItem("preferredLanguage")||A();L(t),setTimeout(()=>{k()},500)});function l(e,t){const n=p==="es"?`${t}_ES`:`${t}_EN`,o=e[n];return o&&o!==""&&o!==null&&o!==void 0?o:null}function y(e){return e||""}function x(e){if(!e)return null;const t=[/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/];for(const n of t){const o=e.match(n);if(o&&o[1])return`https://www.youtube.com/embed/${o[1]}`}return null}function N(){setTimeout(()=>{const e=document.querySelector(".gm-style-iw-d"),t=document.querySelector(".scroll-indicator-popup");if(e&&t){const n=()=>{const o=e.scrollTop,s=e.scrollHeight,i=e.clientHeight;s-o-i<80?t.style.opacity="0":t.style.opacity="1"};n(),e.addEventListener("scroll",n)}},100)}function U(e){const t=p==="es",n=l(e,"Country"),o=l(e,"Year"),s=l(e,"Agencies"),i=l(e,"Staff"),r=l(e,"Work"),a=l(e,"Message"),u=l(e,"Presence"),f=$(e),c=l(e,"YoutubeUrl");let d=`
    <div class="info-window-modern" >
        <div class="info-header">
            <div class="country-flag-large">
                <img src="${f}" alt="${n}" class="flag-img-large" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <h2>
            ${n||(t?"País":"Country")}
            </h2>
        </div>
`;if(c){const w=x(c);w&&(d+=`
            <div class="info-section video-section">
                <div class="section-content">
                    <h3>
                        <span class="section-icon"><i class="fa-brands fa-youtube"></i></span>
                        Video
                    </h3>
                    <div class="video-container">
                        <iframe 
                            src="${w}" 
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
            `)}return o&&(d+=`
        <div class="info-section year-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-calendar-days"></i></span>
                    ${t?"Año de Adhesión":"Year of Joining"}
                </h3>
                <p>${y(o)}</p>
            </div>
        </div>
        `),s&&(d+=`
        <div class="info-section agencies-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-building-columns"></i></span>
                    ${t?"Agencias y Programas":"Agencies and Programs"}
                </h3>
                <p>${y(s)}</p>
            </div>
        </div>
        `),i&&(d+=`
        <div class="info-section staff-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-users"></i></span>
                    ${t?"Personal":"Staff"}
                </h3>
                <p>${i}</p>
            </div>
        </div>
        `),r&&(d+=`
        <div class="info-section work-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-briefcase"></i></span>
                    ${t?"Áreas de Trabajo":"Work Areas"}
                </h3>
                <div class="scrollable-content">
                    <p>${y(r)}</p>
                </div>
            </div>
        </div>
        `),a&&(d+=`
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
        `),u&&(d+=`
        <div class="info-footer">
            <a href="${u}" target="_blank" class="visit-link">
                <span>${t?"Visitar sitio web":"Visit website"}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
        `),d+=`</div>
    <div class="scroll-indicator-popup">
  <i class="fa-solid fa-chevron-down"></i>
</div>`,d}function h(){const e=document.getElementById("search-input").value.toLowerCase(),t=document.getElementById("countries-list");t.innerHTML="";const n=T.filter(o=>l(o,"Country")?.toLowerCase().includes(e)||!1);if(document.getElementById("countries-count").textContent=n.length,n.length===0){t.innerHTML=`
            <div class="no-results">
                <div><i class="fas fa-search"></i></div>
                <p>${p==="es"?"No se encontraron países":"No countries found"}</p>
            </div>
        `;return}n.forEach(o=>{const s=l(o,"Country"),i=l(o,"Year"),r=$(o),a=document.createElement("div");a.className="country-item",a.innerHTML=`
            <div class="flag-circle">
                <img src="${r}" alt="${s}" class="flag-img" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <div class="country-info">
                <div class="country-name">${s}</div>
                <div class="country-year">${p==="es"?"Año: ":"Year: "}${i}</div>
            </div>
        `,a.onclick=()=>_(o),t.appendChild(a)})}function _(e){const t=C.find(n=>n.countryData===e);if(t){m.panTo(t.position),m.setZoom(6),google.maps.event.trigger(t,"click");const n=document.getElementById("sidebar"),o=document.getElementById("sidebar-toggle");n.classList.contains("active")&&(n.classList.remove("active"),o.style.opacity="1",o.style.pointerEvents="auto")}}function I(e){if(!e)return null;let t=String(e);t=t.replace(/−/g,"-"),t=t.replace(/\u2212/g,"-");const n=parseFloat(t);return isNaN(n)?null:n}function O(){document.body.insertAdjacentHTML("beforeend",`
        <div id="disclaimer-alert" class="disclaimer-alert">
            <p id="disclaimer-text"></p>
            <button id="close-disclaimer" class="close-disclaimer" aria-label="Close disclaimer">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
    `);const t=document.getElementById("close-disclaimer"),n=document.getElementById("disclaimer-alert");M(),t.addEventListener("click",()=>{n.style.animation="slideDown 0.3s ease-out",setTimeout(()=>{n.remove()},300)})}function M(){const e=document.getElementById("disclaimer-text");if(!e)return;const t=p==="es";e.textContent=t?"Las denominaciones empleadas y la presentación del material en este mapa no implican la expresión de ninguna opinión por parte de la Secretaría de las Naciones Unidas sobre la condición jurídica de ningún país, territorio, ciudad o área o de sus autoridades, ni respecto de la delimitación de sus fronteras o límites.":"The designations employed and the presentation of material on this map do not imply the expression of any opinion whatsoever on the part of the Secretariat of the United Nations concerning the legal status of any country, territory, city or area or its authorities, or concerning the delimitation of its frontiers or boundaries."}function H(e){T=e,v={path:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fillColor:"#0066CC",fillOpacity:1,strokeColor:"#FFFFFF",strokeWeight:2,scale:1.8,anchor:new google.maps.Point(12,24)};const t=[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#a8daff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#f5f5f5"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"}]}],n=new google.maps.LatLngBounds(new google.maps.LatLng(-60,-140),new google.maps.LatLng(85,-20));m=new google.maps.Map(document.getElementById("map-container"),{zoom:4,styles:t,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!1,zoomControl:!0,gestureHandling:"greedy",minZoom:0,maxZoom:20}),m.setCenter({lat:-15,lng:-60}),m.setZoom(4),m.setOptions({restriction:{latLngBounds:n,strictBounds:!0}}),g=new google.maps.InfoWindow({maxWidth:700,pixelOffset:new google.maps.Size(0,0)}),e.forEach(a=>{const u=I(a.Latitude),f=I(a.Longitude);if(u===null||f===null){console.warn("Coordenadas inválidas para:",l(a,"Country"));return}const c=new google.maps.Marker({position:{lat:u,lng:f},map:m,title:l(a,"Country"),icon:v,animation:google.maps.Animation.DROP,optimized:!1});c.countryData=a,c.addListener("click",()=>{g.close();const d=U(a);g.setContent(d),g.open(m,c),c.setAnimation(google.maps.Animation.BOUNCE),setTimeout(()=>c.setAnimation(null),750),N()}),c.addListener("mouseover",()=>{c.setIcon({...v,fillColor:"#0099FF",scale:2.2})}),c.addListener("mouseout",()=>{c.setIcon(v)}),C.push(c)}),h(),document.getElementById("search-input").addEventListener("input",h);const o=document.getElementById("sidebar-toggle"),s=document.getElementById("sidebar");o.addEventListener("click",()=>{const a=s.classList.contains("active");s.classList.toggle("active"),a?(o.style.opacity="1",o.style.pointerEvents="auto"):setTimeout(()=>{o.style.opacity="0",o.style.pointerEvents="none"},300)}),document.getElementById("map-container").addEventListener("click",()=>{s.classList.contains("active")&&(s.classList.remove("active"),o.style.opacity="1",o.style.pointerEvents="auto")});const r=localStorage.getItem("preferredLanguage")||A();L(r)}async function P(){try{const e=await fetch("data/countries.json");if(!e.ok)throw new Error(`Error al cargar countries.json: ${e.status}`);const t=await e.json();window.initGoogleMap=function(){H(t),O()};const n=document.createElement("script");n.src=`https://maps.googleapis.com/maps/api/js?key=${b}&loading=async&callback=initGoogleMap`,n.async=!0,n.defer=!0,n.onerror=()=>{document.getElementById("map-container").innerHTML=`<div class="error-message">
                    <h2>⚠️ Error al cargar Google Maps</h2>
                    <p>Verificar API Key y configuración</p>
                </div>`},document.head.appendChild(n)}catch(e){document.getElementById("map-container").innerHTML=`<div class="error-message">
                <h2>❌ Error</h2>
                <p>${e.message}</p>
            </div>`}}P();
