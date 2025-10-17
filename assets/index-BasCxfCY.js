(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();const b="AIzaSyBDy4toAmILhmU1XcpkQLV5dKvZVPu7UEU";let f,p="es",C=[],u,v,I=[];function $(e){const t=e.CountryCode?.toLowerCase();return t?`https://flagcdn.com/w80/${t}.png`:"https://flagcdn.com/w80/un.png"}function T(){return(navigator.language||navigator.userLanguage).startsWith("es")?"es":"en"}function w(e){p=e;const t=document.getElementById("logo-img");t&&(e==="es"?t.src="img/UN80_Logo_Lockup_white_S.png":t.src="img/UN80_Logo_Lockup_white_E.png");const s=document.getElementById("btn-es"),n=document.getElementById("btn-en");s&&n&&(e==="es"?(s.classList.add("active"),n.classList.remove("active")):(n.classList.add("active"),s.classList.remove("active")));const o=document.getElementById("search-input"),i=document.querySelector("[data-label-countries]");o&&(o.placeholder=e==="es"?"Buscar país...":"Search country..."),i&&(i.textContent=e==="es"?"Países":"Countries"),localStorage.setItem("preferredLanguage",e),u&&u.close(),h()}window.setLanguage=w;window.addEventListener("DOMContentLoaded",function(){const t=localStorage.getItem("preferredLanguage")||T();w(t)});function c(e,t){const s=p==="es"?`${t}_ES`:`${t}_EN`,n=e[s];return n&&n!==""&&n!==null&&n!==void 0?n:null}function y(e){return e||""}function A(e){if(!e)return null;const t=[/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/];for(const s of t){const n=e.match(s);if(n&&n[1])return`https://www.youtube.com/embed/${n[1]}`}return null}function k(e){const t=p==="es",s=c(e,"Country"),n=c(e,"Year"),o=c(e,"Agencies"),i=c(e,"Staff"),a=c(e,"Work"),l=c(e,"Message"),g=c(e,"Presence"),r=$(e),m=c(e,"YoutubeUrl");let d=`
    <div class="info-window-modern">
        <div class="info-header">
            <div class="country-flag-large">
                <img src="${r}" alt="${s}" class="flag-img-large" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <h2>
            ${s||(t?"País":"Country")}
            </h2>
        </div>
`;if(m){const L=A(m);L&&(d+=`
            <div class="info-section video-section">
                <div class="section-content">
                    <h3>
                        <span class="section-icon"><i class="fa-brands fa-youtube"></i></span>
                        Video
                    </h3>
                    <div class="video-container">
                        <iframe 
                            src="${L}" 
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
        `),o&&(d+=`
        <div class="info-section agencies-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-building-columns"></i></span>
                    ${t?"Agencias y Programas":"Agencies and Programs"}
                </h3>
                <p>${y(o)}</p>
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
        `),a&&(d+=`
        <div class="info-section work-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-briefcase"></i></span>
                    ${t?"Áreas de Trabajo":"Work Areas"}
                </h3>
                <div class="scrollable-content">
                    <p>${y(a)}</p>
                </div>
            </div>
        </div>
        `),l&&(d+=`
        <div class="info-section message-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-message"></i></span>
                    ${t?"Mensaje 80º Aniversario":"80th Anniversary Message"}
                </h3>
                <p class="message-text">${y(l)}</p>
                <span class="anniversary-badge">2025</span>
            </div>
        </div>
        `),g&&(d+=`
        <div class="info-footer">
            <a href="${g}" target="_blank" class="visit-link">
                <span>${t?"Visitar sitio web":"Visit website"}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
        `),d+="</div>",d}function h(){const e=document.getElementById("search-input").value.toLowerCase(),t=document.getElementById("countries-list");t.innerHTML="";const s=I.filter(n=>c(n,"Country")?.toLowerCase().includes(e)||!1);if(document.getElementById("countries-count").textContent=s.length,s.length===0){t.innerHTML=`
            <div class="no-results">
                <div><i class="fas fa-search"></i></div>
                <p>${p==="es"?"No se encontraron países":"No countries found"}</p>
            </div>
        `;return}s.forEach(n=>{const o=c(n,"Country"),i=c(n,"Year"),a=$(n),l=document.createElement("div");l.className="country-item",l.innerHTML=`
            <div class="flag-circle">
                <img src="${a}" alt="${o}" class="flag-img" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <div class="country-info">
                <div class="country-name">${o}</div>
                <div class="country-year">${p==="es"?"Año: ":"Year: "}${i}</div>
            </div>
        `,l.onclick=()=>B(n),t.appendChild(l)})}function B(e){const t=C.find(s=>s.countryData===e);if(t){f.panTo(t.position),f.setZoom(6),google.maps.event.trigger(t,"click");const s=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle");s.classList.contains("active")&&(s.classList.remove("active"),n.style.opacity="1",n.style.pointerEvents="auto")}}function E(e){if(!e)return null;let t=String(e);t=t.replace(/−/g,"-"),t=t.replace(/\u2212/g,"-");const s=parseFloat(t);return isNaN(s)?null:s}function M(e){I=e,v={path:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fillColor:"#0066CC",fillOpacity:1,strokeColor:"#FFFFFF",strokeWeight:2,scale:1.8,anchor:new google.maps.Point(12,24)};const t=[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#a8daff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#f5f5f5"}]}];f=new google.maps.Map(document.getElementById("map-container"),{center:{lat:-8,lng:-55},zoom:3,styles:t,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!0,zoomControl:!0,gestureHandling:"greedy"}),u=new google.maps.InfoWindow({maxWidth:450,pixelOffset:new google.maps.Size(0,-40)}),e.forEach(a=>{const l=E(a.Latitude),g=E(a.Longitude);if(l===null||g===null){console.warn("Coordenadas inválidas para:",c(a,"Country"));return}const r=new google.maps.Marker({position:{lat:l,lng:g},map:f,title:c(a,"Country"),icon:v,animation:google.maps.Animation.DROP,optimized:!1});r.countryData=a,r.addListener("click",()=>{u.close();const m=k(a);u.setContent(m),u.open(f,r),r.setAnimation(google.maps.Animation.BOUNCE),setTimeout(()=>r.setAnimation(null),750)}),r.addListener("mouseover",()=>{r.setIcon({...v,fillColor:"#0099FF",scale:2.2})}),r.addListener("mouseout",()=>{r.setIcon(v)}),C.push(r)}),h(),document.getElementById("search-input").addEventListener("input",h);const s=document.getElementById("sidebar-toggle"),n=document.getElementById("sidebar");s.addEventListener("click",()=>{const a=n.classList.contains("active");n.classList.toggle("active"),a?(s.style.opacity="1",s.style.pointerEvents="auto"):setTimeout(()=>{s.style.opacity="0",s.style.pointerEvents="none"},300)}),document.getElementById("map-container").addEventListener("click",()=>{n.classList.contains("active")&&(n.classList.remove("active"),s.style.opacity="1",s.style.pointerEvents="auto")});const i=localStorage.getItem("preferredLanguage")||T();w(i)}async function P(){try{const e=await fetch("countries.json");if(!e.ok)throw new Error(`Error al cargar countries.json: ${e.status}`);const t=await e.json();window.initGoogleMap=function(){M(t)};const s=document.createElement("script");s.src=`https://maps.googleapis.com/maps/api/js?key=${b}&loading=async&callback=initGoogleMap`,s.async=!0,s.defer=!0,s.onerror=()=>{document.getElementById("map-container").innerHTML=`<div class="error-message">
                    <h2>⚠️ Error al cargar Google Maps</h2>
                    <p>Verificar API Key y configuración</p>
                </div>`},document.head.appendChild(s)}catch(e){document.getElementById("map-container").innerHTML=`<div class="error-message">
                <h2>❌ Error</h2>
                <p>${e.message}</p>
            </div>`}}P();
