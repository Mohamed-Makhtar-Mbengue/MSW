import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: '',
    searchResults: [],
    currentUser: null,
    isLoading: false,
  },
  mutations: {
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async searchUsers({ commit }, query) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get(`/api/users/search?query=${query}`);
        commit('SET_SEARCH_RESULTS', response.data);
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchUserProfile({ commit }, userId) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get(`/api/users/${userId}`);
        commit('SET_CURRENT_USER', response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
});