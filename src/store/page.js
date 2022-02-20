export default {
    namespaced: true,
    state:{
        authData: {},
        authToken: localStorage.getItem("auth_token"),
    },
    getters:{
        auth_user: (state) => state.authData
    },
    mutations:{
        fetchData(state, authData) {
            state.authData = authData;
        },
    },
    actions:{
        getAuthData({ commit }) {
            const text = localStorage.getItem("auth_user");
            const clientDetails = JSON.parse(text);
            commit("fetchData", clientDetails);
        },
    }
}