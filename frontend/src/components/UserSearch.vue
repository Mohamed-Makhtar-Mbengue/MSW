<template>
    <div class="user-search box">
      <b-field label="Rechercher un chercheur">
        <b-autocomplete
          v-model="searchQuery"
          :data="filteredResults"
          placeholder="Nom, prénom, email ou centre d'intérêt"
          field="fullName"
          :loading="isLoading"
          @input="onSearchInput"
          @select="onSelect">
          
          <template #default="{ option }">
            <div class="media">
              <div class="media-left">
                <figure class="image is-32x32">
                  <img :src="option.avatar || defaultAvatar" alt="Profil">
                </figure>
              </div>
              <div class="media-content">
                <strong>{{ option.firstName }} {{ option.lastName }}</strong>
                <br>
                <small>{{ option.email }}</small>
              </div>
            </div>
          </template>
        </b-autocomplete>
      </b-field>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserSearch',
    data() {
      return {
        searchQuery: '',
        isLoading: false,
        defaultAvatar: 'https://bulma.io/images/placeholders/32x32.png',
        searchResults: [
          {
            id: 1,
            firstName: 'Mohamed',
            lastName: 'Mbengue',
            email: 'mohamedmbengue62@yahoo.fr',
            researchInterests: ['Technologies'],
            avatar: ''
          },
          {
            id: 2,
            firstName: 'Mame Diarra',
            lastName: 'Thiao',
            email: 'djidjathiao@gmail.com',
            researchInterests: ['Aviation'],
            avatar: ''
          }
        ]
      }
    },
    computed: {
      filteredResults() {
        return this.searchResults.map(user => ({
          ...user,
          fullName: `${user.firstName} ${user.lastName}`
        }))
      }
    },
    methods: {
      onSearchInput() {
        if (this.searchQuery.length > 2) {
          this.isLoading = true
          // Simuler un appel API
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        }
      },
      onSelect(user) {
        this.$emit('select', user)
      }
    }
  }
  </script>
  
  <style scoped>
  .user-search {
    margin-bottom: 2rem;
  }
  </style>