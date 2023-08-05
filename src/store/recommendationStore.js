import { defineStore } from 'pinia'
import axios from "axios";
export const recommendationStore = defineStore('recommendationStore', {
    state: () => {
        return {
            isDialogCreateOpen: false,
            isNavigationDrawerOpen: false,
            actualShowRecommendationGenerated: [],
            saveDataRecommendations: [{idSave: "ssfd", numberRecommendation: 2, musicsSelect: [], musicIASelect1: [], isRating: false}, {idSave: "Lasavedefou", numberRecommendation: 2, musicsSelect: [], musicIASelect1: [], isRating: true}, {idSave: "sdsdLasavedefou", numberRecommendation: 2, musicsSelect: [], musicIASelect1: [], isRating: true}, {idSave: "mais ouidefou", numberRecommendation: 2, musicsSelect: [], musicIASelect1: [], isRating: true}],
        }
    },
    getters: {
        getSaveDataRecommendations: (state) => {
            return state.saveDataRecommendations;
        },
        getActualShowRecommendationGenerated: (state) => {
            return state.actualShowRecommendationGenerated;
        },
        getIsNavigationDrawerOpen: (state) => {
            return state.isNavigationDrawerOpen;
        },
        getIsDialogCreateOpen: (state) => {
            return state.isDialogCreateOpen;
        },
    },
    actions: {
        async createRecommendation(numberRecommendation, musicSelectId) {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                };
                const params = {
                    "n_song": numberRecommendation,
                    "song_ids": musicSelectId
                };
                const response = await axios.post("https://api.augustindirand.com/music", params, { headers });
                return response;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async createRatings(numberRecommendation, numberMusicSelected, ratingsIA1, ratingsIA2) {
            let params = {
                "n_song": numberMusicSelected,
                "n_recs": numberRecommendation
            };
            if (ratingsIA1 !== null) {
                params["rating_1"] = ratingsIA1;
            }
            if (ratingsIA2 !== null) {
                params["rating_2"] = ratingsIA2;
            }
            try {
                const headers = {
                    'Content-Type': 'application/json',
                };
                const response = await axios.post("https://api.augustindirand.com/ratings", params, { headers });
                return response;
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    },
    persist: {
        storage: localStorage,
        paths: [],
    },
})