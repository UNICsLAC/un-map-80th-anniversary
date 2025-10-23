(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=o(s);fetch(s.href,i)}})();const b="AIzaSyBhX713KBYiK4uUXSHJtYUS2TIlWdOi59s";let u,g="es",C=[],p,v,T=[];const M=1e4;let E=null;function S(){const e=document.getElementById("welcome-modal"),t=document.getElementById("modal-close"),o=document.getElementById("modal-overlay"),n=document.getElementById("btn-explore"),s=document.getElementById("progress-bar");if(localStorage.getItem("hideWelcomeModal")==="true"){e.classList.add("hidden");return}B(),e.classList.remove("hidden");let i=0;const r=100/(M/100);E=setInterval(()=>{i+=r,i>=100?a():s.style.width=i+"%"},100);function a(){clearInterval(E),e.classList.add("hidden")}t.addEventListener("click",a),o.addEventListener("click",a),n.addEventListener("click",a),document.addEventListener("keydown",m=>{m.key==="Escape"&&!e.classList.contains("hidden")&&a()})}function B(){const e=g==="es";document.getElementById("modal-title").textContent=e?"80 Años de Naciones Unidas en América Latina y el Caribe":"80 Years of United Nations in Latin America and the Caribbean",document.getElementById("modal-description").textContent=e?"Los países de América Latina y el Caribe se han unido para conmemorar el 80º aniversario de las Naciones Unidas con la creación de un mapa interactivo. Los invitamos a explorar el impacto y el trabajo de la ONU en cada país de la región.":"The countries of Latin America and the Caribbean have come together to commemorate the 80th anniversary of the United Nations with the creation of an interactive map. We invite you to explore the impact and work of the UN in each country in the region.",document.getElementById("btn-explore-text").textContent=e?"Explorar Mapa":"Explore Map";const t=document.getElementById("modal-video-container"),o="video/UN_80th_Anniversary_No_Text_Square.mp4";t.innerHTML=`
        <video autoplay muted loop playsinline>
            <source src="${o}" type="video/mp4">
            Tu navegador no soporta el elemento de video.
        </video>
    `}function $(e){const t=e.CountryCode?.toLowerCase();return t?`https://flagcdn.com/w80/${t}.png`:"https://flagcdn.com/w80/un.png"}function A(){return(navigator.language||navigator.userLanguage).startsWith("es")?"es":"en"}function L(e){g=e;const t=document.getElementById("logo-img");t&&(e==="es"?t.src="img/UN80_Logo_Lockup_white_S.png":t.src="img/UN80_Logo_Lockup_white_E.png");const o=document.getElementById("btn-es"),n=document.getElementById("btn-en");o&&n&&(e==="es"?(o.classList.add("active"),n.classList.remove("active")):(n.classList.add("active"),o.classList.remove("active")));const s=document.getElementById("search-input"),i=document.querySelector("[data-label-countries]");s&&(s.placeholder=e==="es"?"Buscar país...":"Search country..."),i&&(i.textContent=e==="es"?"Países":"Countries"),localStorage.setItem("preferredLanguage",e),p&&p.close(),B(),h()}window.setLanguage=L;window.addEventListener("DOMContentLoaded",function(){const t=localStorage.getItem("preferredLanguage")||A();L(t),setTimeout(()=>{S()},500)});function l(e,t){const o=g==="es"?`${t}_ES`:`${t}_EN`,n=e[o];return n&&n!==""&&n!==null&&n!==void 0?n:null}function y(e){return e||""}function k(e){if(!e)return null;const t=[/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/];for(const o of t){const n=e.match(o);if(n&&n[1])return`https://www.youtube.com/embed/${n[1]}`}return null}function N(){setTimeout(()=>{const e=document.querySelector(".gm-style-iw-d"),t=document.querySelector(".scroll-indicator-popup");if(e&&t){const o=()=>{const n=e.scrollTop,s=e.scrollHeight,i=e.clientHeight;s-n-i<80?t.style.opacity="0":t.style.opacity="1"};o(),e.addEventListener("scroll",o)}},100)}function _(e){const t=g==="es",o=l(e,"Country"),n=l(e,"Year"),s=l(e,"Agencies"),i=l(e,"Staff"),r=l(e,"Work"),a=l(e,"Message"),m=l(e,"Presence"),f=$(e),c=l(e,"YoutubeUrl");let d=`
    <div class="info-window-modern">
        <div class="info-header">
            <div class="country-flag-large">
                <img src="${f}" alt="${o}" class="flag-img-large" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <h2>
            ${o||(t?"País":"Country")}
            </h2>
        </div>
`;if(c){const w=k(c);w&&(d+=`
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
            `)}return n&&(d+=`
        <div class="info-section year-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-calendar-days"></i></span>
                    ${t?"Año de Adhesión":"Year of Joining"}
                </h3>
                <p>${y(n)}</p>
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
        `),m&&(d+=`
        <div class="info-footer">
            <a href="${m}" target="_blank" class="visit-link">
                <span>${t?"Visitar sitio web":"Visit website"}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
        `),d+=`</div>
    <div class="scroll-indicator-popup">
  <i class="fa-solid fa-chevron-down"></i>
</div>`,d}function h(){const e=document.getElementById("search-input").value.toLowerCase(),t=document.getElementById("countries-list");t.innerHTML="";const o=T.filter(n=>l(n,"Country")?.toLowerCase().includes(e)||!1);if(document.getElementById("countries-count").textContent=o.length,o.length===0){t.innerHTML=`
            <div class="no-results">
                <div><i class="fas fa-search"></i></div>
                <p>${g==="es"?"No se encontraron países":"No countries found"}</p>
            </div>
        `;return}o.forEach(n=>{const s=l(n,"Country"),i=l(n,"Year"),r=$(n),a=document.createElement("div");a.className="country-item",a.innerHTML=`
            <div class="flag-circle">
                <img src="${r}" alt="${s}" class="flag-img" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <div class="country-info">
                <div class="country-name">${s}</div>
                <div class="country-year">${g==="es"?"Año: ":"Year: "}${i}</div>
            </div>
        `,a.onclick=()=>U(n),t.appendChild(a)})}function U(e){const t=C.find(o=>o.countryData===e);if(t){u.panTo(t.position),u.setZoom(6),google.maps.event.trigger(t,"click");const o=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle");o.classList.contains("active")&&(o.classList.remove("active"),n.style.opacity="1",n.style.pointerEvents="auto")}}function I(e){if(!e)return null;let t=String(e);t=t.replace(/−/g,"-"),t=t.replace(/\u2212/g,"-");const o=parseFloat(t);return isNaN(o)?null:o}function x(e){T=e,v={path:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fillColor:"#0066CC",fillOpacity:1,strokeColor:"#FFFFFF",strokeWeight:2,scale:1.8,anchor:new google.maps.Point(12,24)};const t=[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#a8daff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#f5f5f5"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"}]}],o=new google.maps.LatLngBounds(new google.maps.LatLng(-60,-140),new google.maps.LatLng(85,-20));u=new google.maps.Map(document.getElementById("map-container"),{zoom:4,styles:t,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!1,zoomControl:!0,gestureHandling:"greedy",minZoom:0,maxZoom:20}),u.setCenter({lat:-15,lng:-60}),u.setZoom(4),u.setOptions({restriction:{latLngBounds:o,strictBounds:!0}}),p=new google.maps.InfoWindow({maxWidth:700,pixelOffset:new google.maps.Size(0,0)}),e.forEach(a=>{const m=I(a.Latitude),f=I(a.Longitude);if(m===null||f===null){console.warn("Coordenadas inválidas para:",l(a,"Country"));return}const c=new google.maps.Marker({position:{lat:m,lng:f},map:u,title:l(a,"Country"),icon:v,animation:google.maps.Animation.DROP,optimized:!1});c.countryData=a,c.addListener("click",()=>{p.close();const d=_(a);p.setContent(d),p.open(u,c),c.setAnimation(google.maps.Animation.BOUNCE),setTimeout(()=>c.setAnimation(null),750),N()}),c.addListener("mouseover",()=>{c.setIcon({...v,fillColor:"#0099FF",scale:2.2})}),c.addListener("mouseout",()=>{c.setIcon(v)}),C.push(c)}),h(),document.getElementById("search-input").addEventListener("input",h);const n=document.getElementById("sidebar-toggle"),s=document.getElementById("sidebar");n.addEventListener("click",()=>{const a=s.classList.contains("active");s.classList.toggle("active"),a?(n.style.opacity="1",n.style.pointerEvents="auto"):setTimeout(()=>{n.style.opacity="0",n.style.pointerEvents="none"},300)}),document.getElementById("map-container").addEventListener("click",()=>{s.classList.contains("active")&&(s.classList.remove("active"),n.style.opacity="1",n.style.pointerEvents="auto")});const r=localStorage.getItem("preferredLanguage")||A();L(r)}async function O(){try{const e=await fetch("data/countries.json");if(!e.ok)throw new Error(`Error al cargar countries.json: ${e.status}`);const t=await e.json();window.initGoogleMap=function(){x(t)};const o=document.createElement("script");o.src=`https://maps.googleapis.com/maps/api/js?key=${b}&loading=async&callback=initGoogleMap`,o.async=!0,o.defer=!0,o.onerror=()=>{document.getElementById("map-container").innerHTML=`<div class="error-message">
                    <h2>⚠️ Error al cargar Google Maps</h2>
                    <p>Verificar API Key y configuración</p>
                </div>`},document.head.appendChild(o)}catch(e){document.getElementById("map-container").innerHTML=`<div class="error-message">
                <h2>❌ Error</h2>
                <p>${e.message}</p>
            </div>`}}O();
