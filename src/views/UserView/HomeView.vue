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
	const checkTokenExpiration = async () => {
		const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");
		const currentTime = Date.now() / 1000;
		const token = localStorage.getItem("userAuth");
		console.log("token time---------->", tokenExpirationTime);
		console.log("token time---------->", token);
		console.log("token time---------->", currentTime);
		if (tokenExpirationTime && currentTime > tokenExpirationTime) {
			try {
				await userStore.refreshToken(token);
			} catch (error) {
				alert("Server caught into some Issue Kindly sign in again");
				router.go();
				localStorage.clear();
			}
		}
	};

	const startTokenRefresh = () => {
		checkTokenExpiration();
		setInterval(checkTokenExpiration, 55 * 60 * 1000);
	};

	import { onMounted } from "vue";
	onMounted(() => {
		startTokenRefresh();
	});
</script>
