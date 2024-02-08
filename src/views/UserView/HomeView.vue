<template>
	<Navbar />
	<div>
		<RouterView />
	</div>
</template>
<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

let isLoggedIn = false;
let tokenRefreshInterval;

const checkTokenExpiration = () => {
    // Get token expiration time from localStorage
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if token has expired
    if (tokenExpirationTime && currentTime > tokenExpirationTime) {
        // Token has expired, refresh it
        refreshAccessToken();
    }
};

const refreshAccessToken = async () => {
    try {
        // Make a request to the token refresh endpoint
        const response = await axios.post('/api/refresh_token');
        const newAccessToken = response.data.access_token;

        // Update the localStorage with the new access token and expiration time
        localStorage.setItem('userAuth', newAccessToken);
        const tokenExpirationTime = Date.now() / 1000 + 3600; // Assuming token expires in 1 hour
        localStorage.setItem('tokenExpirationTime', tokenExpirationTime);

        // Update isLoggedIn state
        isLoggedIn = true;
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Handle error (e.g., logout user)
    }
};

// Function to start the token refresh mechanism
const startTokenRefresh = () => {
    // Refresh token every 55 minutes to ensure it doesn't expire while in use
    tokenRefreshInterval = setInterval(() => {
        refreshAccessToken();
    }, 55 * 60 * 1000);
};

// Function to stop the token refresh mechanism
const stopTokenRefresh = () => {
    clearInterval(tokenRefreshInterval);
};

// Check if user is logged in and start token refresh mechanism
if (isLoggedIn) {
    startTokenRefresh();
}


</script>
