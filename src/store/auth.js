export default {
    namespaced: true,
    state:{
        isLoggedIn: localStorage.getItem('auth_token') || null,
        auth_token: null,
        auth_data: null
    },
    mutations:{
        setAuthData: (state, data) => {
            state.auth_token=data.token
            state.auth_data=data.data
        }
    },
    actions:{
        getAuthData({commit}) {
            const token  = localStorage.getItem('auth_token') || null;
            const data  = JSON.parse(localStorage.getItem('auth_user') || null);

            commit('setAuthData', {token,data})
        },
       
    }
}