<template>
    <div id="app">
      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <strong>MyScienceWork</strong>
          </router-link>
        </div>
      </nav>
  
      <section class="section">
        <div class="container">
          <router-view/>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App'
  }
  </script>
  
  <style>
  @import '~bulma/css/bulma.min.css';
  @import '~@fortawesome/fontawesome-free/css/all.min.css';
  
  #app {
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .navbar {
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
  }
  </style>