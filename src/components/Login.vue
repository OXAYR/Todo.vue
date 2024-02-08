<template>
	<div
		class="card mt-8 sm:mt-16 md:mt-32 Login px-4 sm:px-8 py-6 md:py-11 max-w-xs mx-auto"
	>
		<h1 class="text-center text-2xl sm:text-3xl font-medium font-serif">
			Sign In
		</h1>
		<input
			type="email"
			placeholder="Email"
			v-model="formLogin.email"
			class="mt-4 p-2 sm:p-3 border border-gray-300 rounded-md w-full"
		/>
		<p
			v-if="validationErrors.email"
			class="text-red-500 text-sm"
		>
			{{ validationErrors.email }}
		</p>

		<input
			type="password"
			placeholder="Password"
			v-model="formLogin.password"
			class="mt-4 p-2 sm:p-3 border border-gray-300 rounded-md w-full"
		/>
		<p
			v-if="validationErrors.password"
			class="text-red-500 text-sm"
		>
			{{ validationErrors.password }}
		</p>

		<p
			v-if="loginErrorMessage"
			class="text-red-500 text-sm"
		>
			{{ loginErrorMessage }}
		</p>
		<!-- Display login error message -->

		<button
			class="mt-4 px-12 py-2 sm:px-24 sm:py-3 bg-rose-400 text-black hover:bg-rose-300 rounded-lg"
			@click="toValidateForm"
		>
			<p class="text-black font-serif text-center">SignIn</p>
		</button>

		<router-link
			to="/signup"
			class="block mt-2"
		>
			<button
				class="Register px-12 py-2 sm:px-24 sm:py-3 text-black hover:bg-gray-200 rounded-lg"
			>
				<p class="text-black font-serif ml-2">SignUp</p>
			</button>
		</router-link>
	</div>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { useRouter } from "vue-router";
	import { useUserStore } from "@/stores/userStore";

	const formLogin = ref({
		email: "",
		password: "",
	});
	const userStore = useUserStore();
	const router = useRouter();
	const validationErrors = computed(() => userStore.validationErrors);
	const loginErrorMessage = computed(() => userStore.loginErrorMessage); 

	const toValidateForm = async () => {
		if (formLogin.value.email !== "" && formLogin.value.password !== "") {
			await userStore.loginAuth(formLogin.value);
			if (
				Object.keys(userStore.validationErrors).length === 0 &&
				!userStore.loginErrorMessage
			) {
				router.push("/");
			}
		}
	};
</script>

<style scoped></style>
