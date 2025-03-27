<template>
  <div class="home">
    <section class="hero is-primary mb-6">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Recherche de chercheurs</h1>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-thirds">
          <div class="box">
            <UserSearch @select="goToProfile"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserSearch from '@/components/UserSearch.vue'

export default {
  name: 'Home',
  components: { UserSearch },
  methods: {
    goToProfile(user) {
      this.$router.push({ name: 'Profile', params: { id: user.id } })
    }
  }
}
</script>

<style scoped>
.home {
  padding: 1.5rem;
}
</style>