<template>
	<Navbar />
	<div>
		<RouterView />
	</div>
</template>
<script setup>
	import Navbar from "@/components/layout/Navbar.vue";
	import { useUserStore } from "@/stores/userStore";
	const userStore = useUserStore();

	const checkTokenExpiration = async () => {
		const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");
		const currentTime = Date.now() / 1000;
		const token = localStorage.getItem("userAuth");
		if (tokenExpirationTime && currentTime > tokenExpirationTime) {
			await userStore.refreshToken(token);
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
