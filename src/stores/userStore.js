// userStore.js

import { defineStore } from 'pinia';
import axios from "axios";
export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        isLoading: false,
    }),
    getters: {
        getUser(state) {
            console.log("in the get user---->", state.user);
            return state.user;
        },
    },
    actions: {
        async loginAuth(payload) {
            try {
                this.isLoading = true;
                console.log("Payload--------->", payload);
                const { data } = await axios.post("/api/login", payload);
                this.Loading = false;
                console.log("data------------>", data)
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("userAuth", data.user.token);
                this.user = data.data; // Directly modify the state
            } catch (error) {
                console.log(error);
            }
        },
    },


    async registerUser(payload) {
        try {
            const { data } = await axios.post("/users/register", payload);
            console.log("in the register---> ", data.status);
            if (data.status == 200) {
                commit("SET_VALIDATION_ERRORS", null);
            }
        } catch (error) {
            if (error.response.status == 403) {
                commit("SET_VALIDATION_ERRORS", error.response.data.errors);
            }
            console.error("Error registering user:", error.response.data.errors);
            console.error("Error registering user:", error);
            //alert(error.response.data.message)
        }
    },


},
);