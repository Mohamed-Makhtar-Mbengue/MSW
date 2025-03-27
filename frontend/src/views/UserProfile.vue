<template>
    <div class="user-profile">
      <div class="columns">
        <!-- Colonne gauche -->
        <div class="column is-one-quarter">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img :src="currentUser.avatar" alt="Photo profil">
                  </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
                    <p class="subtitle is-6 has-text-weight-normal">
                        <span class="icon is-small">
                        <i class="fas fa-envelope"></i>
                        </span>
                        {{ currentUser.email }}
                    </p>
                </div>
              </div>
  
              <div class="content">
                <button class="button is-small is-info mb-4" @click="switchUser">
                  Changer de profil
                </button>
  
                <h4 class="title is-5">Affiliations</h4>
                <div v-for="(affiliation, index) in currentUser.affiliations" :key="index" class="mb-4">
                  <p><strong>{{ affiliation.organization }}</strong></p>
                  <p v-if="affiliation.team">Équipe: {{ affiliation.team }}</p>
                  <p>Pays: {{ affiliation.country }}</p>
                </div>
  
                <h4 class="title is-5">Centres d'intérêt</h4>
                <div class="tags">
                  <span v-for="(interest, index) in currentUser.researchInterests" :key="index" class="tag is-primary">
                    {{ interest }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Colonne droite -->
        <div class="column">
          <div class="tabs is-boxed">
            <ul>
              <li :class="{ 'is-active': activeTab === 'profile' }">
                <a @click="activeTab = 'profile'">
                  <span class="icon is-small"><i class="fas fa-user"></i></span>
                  <span>Profil</span>
                </a>
              </li>
              <li :class="{ 'is-active': activeTab === 'publications' }">
                <a @click="activeTab = 'publications'">
                  <span class="icon is-small"><i class="fas fa-book"></i></span>
                  <span>Publications</span>
                </a>
              </li>
            </ul>
          </div>
  
          <div v-if="activeTab === 'profile'" class="box">
            <h3 class="title is-4">Informations complémentaires</h3>
            <p>Contenu du profil...</p>
          </div>
  
          <div v-if="activeTab === 'publications'" class="box">
            <PublicationsList :publications="currentUser.publications || []"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PublicationsList from '@/components/PublicationsList.vue'
  
  export default {
    name: 'UserProfile',
    components: { PublicationsList },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        activeTab: 'profile',
        currentUserIndex: 0,
        users: [
          {
            firstName: 'Mohamed',
            lastName: 'Mbengue',
            email: 'mohmed.mbengue62@yahoo.fr',
            avatar: 'https://bulma.io/images/placeholders/96x96.png',
            researchInterests: ['Technologies', 'Voyages'],
            affiliations: [
              {
                organization: 'CNRS',
                team: 'full-stack',
                country: 'France',
                startDate: '2020-01-01'
              }
            ],
            publications: [
              {
                id: 1,
                title: "Une étude sur les AI",
                authors: ['Mohamed Mbengue', 'Baye Omar Mbengue'],
                year: 2023,
                language: 'Français'
              }
            ]
          },
          {
            firstName: 'Mame Diarra',
            lastName: 'Thiao',
            email: 'djidja.thiao@gmail.com',
            avatar: 'https://bulma.io/images/placeholders/96x96.png',
            researchInterests: ['Aviation', 'Gastronomie'],
            affiliations: [
              {
                organization: 'CNRS',
                team: 'full-stack',
                country: 'France',
                startDate: '2020-01-01'
              }
            ],
            publications: [
              {
                id: 2,
                title: "Une étude sur l'aviation",
                authors: ['Mame Diarra Thiao', 'Mohamed Mbengue'],
                year: 2023,
                language: 'Français'
              } 
            ]
          }
        ]
      }
    },
    computed: {
      currentUser() {
        return this.users[this.currentUserIndex]
      }
    },
    methods: {
  async switchUser() {
    const newIndex = this.currentUserIndex === 0 ? 1 : 0;
    const newUserId = this.users[newIndex].publications[0].id;
    
    // Vérifie si la navigation est nécessaire
    if (this.$route.params.id !== String(newUserId)) {
      await this.$router.push(`/profile/${newUserId}`);
    }
    
    this.currentUserIndex = newIndex;
  }
}
  }
  </script>
  
  <style scoped>
  .user-profile {
    padding: 2rem;
  }
  
  .button.mb-4 {
    margin-bottom: 1.5rem;
  }
  .subtitle.is-6 {
  font-size: 1rem;
  color: #4a4a4a;
  margin-top: 0.5rem;
}

.fa-envelope {
  margin-right: 0.5rem;
  color: #3273dc;
}
  </style>