<template>
	<Navbar />
	<div>
		<RouterView />
	</div>
</template>
<script setup>
	import Navbar from "@/components/layout/Navbar.vue";
	import { useRouter } from "vue-router";
	import { useUserStore } from "@/stores/userStore";
	const userStore = useUserStore();
	const router = useRouter();

	// checking either the tokken is expired or not by the expiration time we stored at the time of login

	const checkTokenExpiration = async () => {
		const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");
		const currentTime = Date.now() / 1000;
		const token = localStorage.getItem("userAuth");

		// if tokken is expired then send the request to refresh the token
		if (tokenExpirationTime && currentTime > tokenExpirationTime) {
			try {
				await userStore.refreshToken(token);
			} catch (error) {
				// handled the error case if the response from the server was not right then logout the user by showing appropriate message
				alert("Server caught into some Issue Kindly sign in again");
				router.go();
				localStorage.clear();
			}
		}
	};

	// to check for the token refresh
	const startTokenRefresh = () => {
		checkTokenExpiration();
		setInterval(checkTokenExpiration, 55 * 60 * 1000);
	};

	import { onMounted } from "vue";

	//kept it in on mounted so that it runs everytimes the page reload
	onMounted(() => {
		startTokenRefresh();
	});
</script>
