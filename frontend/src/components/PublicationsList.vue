<template>
    <div>
      <div v-if="publications.length === 0" class="notification">
        Aucune publication disponible.
      </div>
      
      <div v-else v-for="pub in publications" :key="pub.id" class="box">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ pub.title }}</strong>
                <br>
                <small>{{ pub.authors.join(', ') }}</small>
                <br>
                {{ pub.year }} • {{ pub.language }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PublicationsList',
    props: {
      publications: {
        type: Array,
        required: true
      }
    }
  }
  </script>