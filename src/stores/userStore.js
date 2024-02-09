// userStore.js

import { defineStore } from 'pinia';
import axios from "axios";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        isLoading: false,
        validationErrors: {},
    }),
    getters: {
        getUser(state) {
            console.log("in the get user---->", state.user);
            return state.user;
        },
        getValidationErrors(state) {
            return state.validationErrors;
        },
    },
    actions: {
        async loginAuth(payload) {
            try {
                this.isLoading = true;
                console.log("Payload--------->", payload);
                const { data } = await axios.post("/api/login", payload);
                this.isLoading = false;
                console.log("data------------>", data);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("userAuth", data.user.token);
                const tokenExpirationTime = Date.now() / 1000 + 3600;
                localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
                this.user = data.data;
                this.loginErrorMessage = '';
            } catch (error) {
                this.isLoading = false;
                console.log(error);
                if (error.response && error.response.data && error.response.data.error) {
                    const errors = error.response.data.error;
                    this.validationErrors = {};
                    errors.forEach((errorMsg) => {
                        if (errorMsg.includes("email")) {
                            console.log("error-->", errorMsg);
                            this.validationErrors.email = errorMsg;
                        } else if (errorMsg.includes("password")) {
                            this.loginErrorMessage = "Invalid password";
                        }
                    });
                }
                throw error;
            }
        },
        async register(payload) {
            try {
                const response = await axios.post("/api/register", payload);
                console.log("in the register---> ", response.data);
                alert(response.data.message);
                this.validationErrors = {};
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    const errors = error.response.data.error;
                    this.validationErrors = {};
                    errors.forEach((errorMsg) => {
                        if (errorMsg.includes("email")) {
                            console.log("error-->", errorMsg);
                            this.validationErrors.email = errorMsg;
                        }
                        if (errorMsg.includes("password confirmation")) {
                            this.validationErrors.password_confirmation = errorMsg;
                            console.log("error-->", errorMsg);
                        }
                    });
                }
            }
        },
        clearValidationErrors() {
            this.validationErrors = {};
        },
        async logout(token) {
            try {
                this.isLoading = true;
                console.log("Payload--------->", token);
                const { data } = await axios.post("/api/logout", { token });
                this.isLoading = false;
                console.log("data------------>", data);
                localStorage.clear();
            }
            catch (error) {
                console.log(error);
            }
        },

        async refreshToken(token) {
            try {
                console.log("token in the action-------->", token)
                const response = await axios.post(
                    `/api/refresh-token/${token}`,
                    null,
                );
                console.log("respone-------->token", response);
                const newAccessToken = response.data.access_token;
                localStorage.setItem('userAuth', newAccessToken);
                const tokenExpirationTime = Date.now() / 1000 + 3600;
                localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
            } catch (error) {
                console.error('Error refreshing token:', error);
                throw error;
            }
        }
    }
});
