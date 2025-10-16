(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();const L="AIzaSyBhX713KBYiK4uUXSHJtYUS2TIlWdOi59s";let f,p="es",E=[],g,m,C=[];function b(t){const e=t.CountryCode?.toLowerCase();return e?`https://flagcdn.com/w80/${e}.png`:"https://flagcdn.com/w80/un.png"}function I(){return(navigator.language||navigator.userLanguage).startsWith("es")?"es":"en"}function h(t){p=t;const e=document.getElementById("logo-img");e&&(t==="es"?e.src="img/UN80_Logo_Lockup_white_S.png":e.src="img/UN80_Logo_Lockup_white_E.png");const s=document.getElementById("btn-es"),n=document.getElementById("btn-en");s&&n&&(t==="es"?(s.classList.add("active"),n.classList.remove("active")):(n.classList.add("active"),s.classList.remove("active")));const o=document.getElementById("search-input"),i=document.querySelector("[data-label-countries]");o&&(o.placeholder=t==="es"?"Buscar país...":"Search country..."),i&&(i.textContent=t==="es"?"Países":"Countries"),localStorage.setItem("preferredLanguage",t),g&&g.close(),y()}window.setLanguage=h;window.addEventListener("DOMContentLoaded",function(){const e=localStorage.getItem("preferredLanguage")||I();h(e)});function r(t,e){const s=p==="es"?`${e}_ES`:`${e}_EN`,n=t[s];return n&&n!==""&&n!==null&&n!==void 0?n:null}function v(t){return t||""}function $(t){const e=p==="es",s=r(t,"Country"),n=r(t,"Year"),o=r(t,"Agencies"),i=r(t,"Staff"),a=r(t,"Work"),l=r(t,"Message"),u=r(t,"Presence");let d=`
    <div class="info-window-modern">
        <div class="info-header">
            <div class="country-flag-large">
                <img src="${b(t)}" alt="${s}" class="flag-img-large" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <h2>
            ${s||(e?"País":"Country")}
            </h2>
        </div>
`;return n&&(d+=`
        <div class="info-section year-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-calendar-days"></i></span>
                    ${e?"Año de Adhesión":"Year of Joining"}
                </h3>
                <p>${v(n)}</p>
            </div>
        </div>
        `),o&&(d+=`
        <div class="info-section agencies-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-building-columns"></i></span>
                    ${e?"Agencias y Programas":"Agencies and Programs"}
                </h3>
                <p>${v(o)}</p>
            </div>
        </div>
        `),i&&(d+=`
        <div class="info-section staff-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-users"></i></span>
                    ${e?"Personal":"Staff"}
                </h3>
                <p>${i}</p>
            </div>
        </div>
        `),a&&(d+=`
        <div class="info-section work-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-briefcase"></i></span>
                    ${e?"Áreas de Trabajo":"Work Areas"}
                </h3>
                <div class="scrollable-content">
                    <p>${v(a)}</p>
                </div>
            </div>
        </div>
        `),l&&(d+=`
        <div class="info-section message-section">
            <div class="section-content">
                <h3>
                    <span class="section-icon"><i class="fa-solid fa-message"></i></span>
                    ${e?"Mensaje 80º Aniversario":"80th Anniversary Message"}
                </h3>
                <p class="message-text">${v(l)}</p>
                <span class="anniversary-badge">2025</span>
            </div>
        </div>
        `),u&&(d+=`
        <div class="info-footer">
            <a href="${u}" target="_blank" class="visit-link">
                <span>${e?"Visitar sitio web":"Visit website"}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
        `),d+="</div>",d}function y(){const t=document.getElementById("search-input").value.toLowerCase(),e=document.getElementById("countries-list");e.innerHTML="";const s=C.filter(n=>r(n,"Country")?.toLowerCase().includes(t)||!1);if(document.getElementById("countries-count").textContent=s.length,s.length===0){e.innerHTML=`
            <div class="no-results">
                <div><i class="fas fa-search"></i></div>
                <p>${p==="es"?"No se encontraron países":"No countries found"}</p>
            </div>
        `;return}s.forEach(n=>{const o=r(n,"Country"),i=r(n,"Year"),a=b(n),l=document.createElement("div");l.className="country-item",l.innerHTML=`
            <div class="flag-circle">
                <img src="${a}" alt="${o}" class="flag-img" onerror="this.src='https://flagcdn.com/w80/un.png'">
            </div>
            <div class="country-info">
                <div class="country-name">${o}</div>
                <div class="country-year">${p==="es"?"Año: ":"Year: "}${i}</div>
            </div>
        `,l.onclick=()=>T(n),e.appendChild(l)})}function T(t){const e=E.find(s=>s.countryData===t);if(e){f.panTo(e.position),f.setZoom(6),google.maps.event.trigger(e,"click");const s=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle");s.classList.contains("active")&&(s.classList.remove("active"),n.style.opacity="1",n.style.pointerEvents="auto")}}function w(t){if(!t)return null;let e=String(t);e=e.replace(/−/g,"-"),e=e.replace(/\u2212/g,"-");const s=parseFloat(e);return isNaN(s)?null:s}function B(t){C=t,m={path:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fillColor:"#0066CC",fillOpacity:1,strokeColor:"#FFFFFF",strokeWeight:2,scale:1.8,anchor:new google.maps.Point(12,24)};const e=[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#a8daff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#f5f5f5"}]}];f=new google.maps.Map(document.getElementById("map-container"),{center:{lat:-8,lng:-55},zoom:3,styles:e,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!0,zoomControl:!0,gestureHandling:"greedy"}),g=new google.maps.InfoWindow({maxWidth:450,pixelOffset:new google.maps.Size(0,-40)}),t.forEach(a=>{const l=w(a.Latitude),u=w(a.Longitude);if(l===null||u===null){console.warn("Coordenadas inválidas para:",r(a,"Country"));return}const c=new google.maps.Marker({position:{lat:l,lng:u},map:f,title:r(a,"Country"),icon:m,animation:google.maps.Animation.DROP,optimized:!1});c.countryData=a,c.addListener("click",()=>{g.close();const d=$(a);g.setContent(d),g.open(f,c),c.setAnimation(google.maps.Animation.BOUNCE),setTimeout(()=>c.setAnimation(null),750)}),c.addListener("mouseover",()=>{c.setIcon({...m,fillColor:"#0099FF",scale:2.2})}),c.addListener("mouseout",()=>{c.setIcon(m)}),E.push(c)}),y(),document.getElementById("search-input").addEventListener("input",y);const s=document.getElementById("sidebar-toggle"),n=document.getElementById("sidebar");s.addEventListener("click",()=>{const a=n.classList.contains("active");n.classList.toggle("active"),a?(s.style.opacity="1",s.style.pointerEvents="auto"):setTimeout(()=>{s.style.opacity="0",s.style.pointerEvents="none"},300)}),document.getElementById("map-container").addEventListener("click",()=>{n.classList.contains("active")&&(n.classList.remove("active"),s.style.opacity="1",s.style.pointerEvents="auto")});const i=localStorage.getItem("preferredLanguage")||I();h(i)}async function A(){try{const t=await fetch("/countries.json");if(!t.ok)throw new Error(`Error al cargar countries.json: ${t.status}`);const e=await t.json();window.initGoogleMap=function(){B(e)};const s=document.createElement("script");s.src=`https://maps.googleapis.com/maps/api/js?key=${L}&loading=async&callback=initGoogleMap`,s.async=!0,s.defer=!0,s.onerror=()=>{document.getElementById("map-container").innerHTML=`<div class="error-message">
                    <h2>⚠️ Error al cargar Google Maps</h2>
                    <p>Verificar API Key y configuración</p>
                </div>`},document.head.appendChild(s)}catch(t){document.getElementById("map-container").innerHTML=`<div class="error-message">
                <h2>❌ Error</h2>
                <p>${t.message}</p>
            </div>`}}A();
