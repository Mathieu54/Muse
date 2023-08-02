import { defineStore } from 'pinia'
export const generalStore = defineStore('generalStore', {
    state: () => {
        return {
            showResult: false,
            showMusicChoose: false,
            musicSelectedUser: [],
            musicGenreStore: [],
            musicListStore: [],
            recommendationsNumberStore: 2
        }
    },
    getters: {
        getRecommendationsNumberStore: (state) => {
            return state.recommendationsNumberStore;
        },
        getMusicListStore: (state) => {
            return state.musicListStore;
        },
        getMusicGenreStore: (state) => {
            return state.musicGenreStore;
        },
        getMusicSelectedUser: (state) => {
            return state.musicSelectedUser;
        },
        getShowResult: (state) => {
            return state.showResult;
        },
        getShowMusicChoose: (state) => {
            return state.showMusicChoose;
        },
    },
})