<template lang="">
  
  <aside 
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 hide-on-small-only"
    id="sidenav-main"
  >
<div v-if="user.rol_id == 1 || user.rol_id == 2 || user.tipo==1">
  <div class="sidenav-header">
      <i
        class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
        aria-hidden="true"
        @click="hideSideNav()"
        id="iconSidenav"
      ></i>
      <div class="d-flex justify-content-center">
      <img src="/assets/img/Logo.jpg" alt="image" class=""
      style="width: 100px; height: 50px;" />
      </a>       
    </div>
  </div>
    <div class="sidenav-header">
    <hr class="horizontal dark mt-0" />
    <div class="collapse navbar-collapse  w-auto h-auto" id="sidenav-collapse-main" >
      <ul class="navbar-nav">    
        <li class="nav-item" v-if="user.rol_id == 1 || user.rol_id == 2">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            Dashboard
          </h6>
        </li>
        <li class="nav-item" v-if="user.rol_id == 1 || user.rol_id == 2">
          <a
            data-bs-toggle="collapse"
            href="#dashboard"
            class="nav-link"
            aria-controls="dashboard"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>office</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </a>
          <div class="collapse" id="dashboard">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/inicio"      
                >
                  <span class="sidenav-mini-icon"> D </span>
                  <span class="sidenav-normal"> Dashboard </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>
        
        <li v-if="user.rol_id == 1 || user.rol_id == 2" class="nav-item mt-3">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            EMPRESA
          </h6>
        </li>
        <li v-if="user.rol_id == 1 || user.rol_id == 2" class="nav-item">
          <a
            data-bs-toggle="collapse"
            href="#empresas"
            class="nav-link"
            aria-controls="empresas"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>EMPRESAS</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Empresas</span>
          </a>
          <div class="collapse" id="empresas">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/empresas/empresa"      
                >
                  <span class="sidenav-mini-icon"> E </span>
                  <span class="sidenav-normal"> Empresas </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/configuracion/sucursales"      
                >
                  <span class="sidenav-mini-icon"> S </span>
                  <span class="sidenav-normal"> Sucursal </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/empresas/archivos/formulario29"      
                >
                  <span class="sidenav-mini-icon"> F </span>
                  <span class="sidenav-normal"> Formulario 29 </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/empresas/archivos/formulario22"      
                >
                  <span class="sidenav-mini-icon"> F </span>
                  <span class="sidenav-normal"> Formulario 22 </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/empresas/archivos/estatutos"      
                >
                  <span class="sidenav-mini-icon"> E </span>
                  <span class="sidenav-normal"> Estatutos </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/empresas/archivos/carpeta_tributaria"      
                >
                  <span class="sidenav-mini-icon"> C </span>
                  <span class="sidenav-normal"> Carpeta Tributaria </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/empresas/archivos/balance"      
                >
                  <span class="sidenav-mini-icon"> B </span>
                  <span class="sidenav-normal"> Balances </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <li v-if="user.rol_id == 1 || user.rol_id == 2" class="nav-item mt-3">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            CLIENTES
          </h6>
        </li>
        <li v-if="user.rol_id == 1 || user.rol_id == 2" class="nav-item">
          <a
            data-bs-toggle="collapse"
            href="#clientes"
            class="nav-link"
            aria-controls="clientes"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>CLIENTES</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Clientes</span>
          </a>
          <div class="collapse" id="clientes">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/clientes/cliente"      
                >
                  <span class="sidenav-mini-icon"> C </span>
                  <span class="sidenav-normal"> Clientes </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/clientes/archivos/facturacion"      
                >
                  <span class="sidenav-mini-icon"> V </span>
                  <span class="sidenav-normal"> Ventas </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <li v-if="user.rol_id == 1 || user.rol_id == 2" class="nav-item mt-3">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            PREVENCION
          </h6>
        </li>
        <li v-if="user.rol_id == 1 || user.rol_id == 2" class="nav-item">
          <a
            data-bs-toggle="collapse"
            href="#prevencion"
            class="nav-link"
            aria-controls="prevencion"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>EMPRESAS</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Prevencion</span>
          </a>
          <div class="collapse" id="prevencion">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/prevencion/empleador/archivo"      
                >
                  <span class="sidenav-mini-icon"> E </span>
                  <span class="sidenav-normal"> Empledador </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/prevencion/trabajadores/"      
                >
                  <span class="sidenav-mini-icon"> T </span>
                  <span class="sidenav-normal"> Trabajadores </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>       
        <li class="nav-item" v-if="user.rol_id == 1 || user.rol_id == 2">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            TRABAJADORES
          </h6>
          <a
            data-bs-toggle="collapse"
            href="#trabajadores"
            class="nav-link"
            aria-controls="trabajadores"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>TABAJADORES</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Trabajadores</span>
          </a>
          <div class="collapse" id="trabajadores">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/configuracion/trabajadores"      
                >
                  <span class="sidenav-mini-icon"> T </span>
                  <span class="sidenav-normal"> Trabajadores </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
          <div v-if="user.rol_id == 1 || user.rol_id == 2 || user.trabajador_id > 0" class="collapse" id="trabajadores">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/configuracion/trabajadores/fichas/ficha"      
                >
                  <span class="sidenav-mini-icon"> F </span>
                  <span class="sidenav-normal"> Ficha </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.rol_id == 1 || user.rol_id == 2">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            ASISTENCIA
          </h6>
          <a
            data-bs-toggle="collapse"
            href="#asistencias"
            class="nav-link"
            aria-controls="asistencias"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>ASISTENCIA</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Asistencia</span>
          </a>
          <div v-if="user.rol_id == 1 || user.rol_id == 2 || user.trabajador_id > 0 " class="collapse" id="asistencias">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/asistencia"      
                >
                  <span class="sidenav-mini-icon"> A </span>
                  <span class="sidenav-normal"> Asistencia </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
          <div class="collapse" id="asistencias">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/asistencia/reporte"      
                >
                  <span class="sidenav-mini-icon"> R </span>
                  <span class="sidenav-normal"> Reporte </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.rol_id == 4">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            Colaborador
          </h6>
          <a
            data-bs-toggle="collapse"
            href="#asis"
            class="nav-link"
            aria-controls="asis"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>ASISTENCIA</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Asistencia</span>
          </a>
          <div v-if="user.rol_id == 4 || user.trabajador_id > 0" class="collapse" id="asis">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/asistencia"      
                >
                  <span class="sidenav-mini-icon"> A </span>
                  <span class="sidenav-normal"> Asistencia </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.rol_id == 4">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            Colaborador
          </h6>
          <a
            data-bs-toggle="collapse"
            href="#colaboradores"
            class="nav-link"
            aria-controls="colaboradores"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>COLABORADOR</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Colaborador</span>
          </a>
          <div v-if="user.rol_id == 4 || user.trabajador_id > 0" class="collapse" id="colaboradores">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/configuracion/trabajadores/fichas/ficha"      
                >
                  <span class="sidenav-mini-icon"> F </span>
                  <span class="sidenav-normal"> Ficha </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <li v-if="user.rol_id == 1 || user.rol_id == 2" class="nav-item mt-3">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            ADMINISTRACION
          </h6>
        </li>
        <li v-if="user.rol_id == 1 || user.rol_id == 2" class="nav-item">
          <a
            data-bs-toggle="collapse"
            href="#configuracion"
            class="nav-link"
            aria-controls="configuracion"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>office</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Configuración</span>
          </a>
          <div class="collapse" id="configuracion">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/usuarios/usuario"      
                >
                  <span class="sidenav-mini-icon"> U </span>
                  <span class="sidenav-normal"> Usuarios </span>
                </nuxtLink>
              </li>  
            </ul>
          </div>
        </li>

      </ul>
    </div>
  </div>
  <div v-if="user.tipo==2">
    <div class="sidenav-header">
      <i
        class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
        aria-hidden="true"
        @click="hideSideNav()"
        id="iconSidenav"
      ></i>
      <a
        class="navbar-brand m-0"
        href=" https://demos.creative-tim.com/soft-ui-dashboard-pro/pages/dashboards/default.html "
        target="_blank"
      >
        <span class="ms-1 font-weight-bold">GAS</span>
      </a>       
    </div>
    

    <hr class="horizontal dark mt-0" />
    <div class="collapse navbar-collapse  w-auto h-auto" id="sidenav-collapse-main" >
      <ul class="navbar-nav">    
        <li class="nav-item">
          
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            Dashboard
          </h6>
        </li>
        <li class="nav-item">
          <a
            data-bs-toggle="collapse"
            href="#dashboard"
            class="nav-link"
            aria-controls="dashboard"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>office</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </a>
          <div class="collapse" id="dashboard">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/Dashboardgas"      
                >
                  <span class="sidenav-mini-icon"> D </span>
                  <span class="sidenav-normal"> Dashboard Gas </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
        </li>
        
        <li class="nav-item">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6"
          >
            GAS
          </h6>
          <a
            data-bs-toggle="collapse"
            href="#comprasgas"
            class="nav-link"
            aria-controls="comprasgas"
            role="button"
            aria-expanded="false"
          >
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 42 42"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>GAS</title>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-1869.000000, -293.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <g transform="translate(1716.000000, 291.000000)">
                      <g
                        id="office"
                        transform="translate(153.000000, 2.000000)"
                      >
                        <path
                          class="color-background"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"
                        ></path>
                        <path
                          class="color-background"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-link-text ms-1">Gas</span>
          </a>
          <div class="collapse" id="comprasgas">
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/ventasgas"      
                >
                  <span class="sidenav-mini-icon"> N </span>
                  <span class="sidenav-normal"> Nueva Venta </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink 
                  class="nav-link"
                  to="/ventasgas/lista"      
                >
                  <span class="sidenav-mini-icon"> V </span>
                  <span class="sidenav-normal"> Ventas </span>
                </nuxtLink>
              </li>
            </ul>
          </div>
             
        </li>
        
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </aside>
  
</template>
<script>
export default{
  
data(){
  return {
    image:0,
    user:{}
  }
},
methods:{
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res
    },
    hideSideNav(){
      let side = document.getElementById('sidenav-main')
      side.classList.contains("d-none")? side.classList.remove("d-none"): side.classList.add("d-none");
      document.getElementById('sidenav-main').classList.remove(this.theme=='dark-version'?'bg-white':'bg-dark')
      document.getElementById('sidenav-main').classList.add(this.theme=='dark-version'?'bg-dark':'bg-white')
    },
  },
mounted() {
let user = localStorage.getItem('userAuth')
this.user = JSON.parse(user)
    

}
}
</script>