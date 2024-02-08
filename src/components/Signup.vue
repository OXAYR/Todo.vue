<template>
	<div
		class="card bg-white mt-8 sm:mt-16 md:mt-32 Login px-4 sm:px-8 py-6 md:py-11 max-w-xs mx-auto"
	>
		<h2 class="text-3xl font-medium text-center">Sign Up</h2>
		<div>
			<input
				type="email"
				v-model="form.email"
				placeholder="Email"
				class="mt-4 p-2 border border-gray-300 rounded-md w-full"
			/>
			<p
				v-if="validationErrors.email"
				class="text-red-500 text-sm"
			>
				{{ validationErrors.email }}
			</p>

			<input
				type="password"
				v-model="form.password"
				placeholder="Password"
				class="mt-4 p-2 border border-gray-300 rounded-md w-full"
			/>
			<p
				v-if="validationErrors.password"
				class="text-red-500 text-sm"
			>
				{{ validationErrors.password }}
			</p>

			<input
				type="password"
				placeholder="Confirm Password"
				v-model="form.password_confirmation"
				class="mt-4 p-2 border border-gray-300 rounded-md w-full"
			/>
			<p
				v-if="validationErrors.password_confirmation"
				class="text-red-500 text-sm"
			>
				{{ validationErrors.password_confirmation }}
			</p>
		</div>
		<button
			class="mt-4 px-4 sm:px-24 py-2 sm:py-3 text-black hover:bg-gray-200 rounded"
			@click="toValidateForm"
		>
			Register
		</button>
	</div>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { useRouter } from "vue-router";
	import { useUserStore } from "@/stores/userStore";

	const form = ref({
		email: "",
		password: "",
		password_confirmation: "",
	});

	const userStore = useUserStore();
	const router = useRouter();

	const validationErrors = computed(() => userStore.validationErrors); 

	const toValidateForm = () => {
		if (
			form.email !== "" &&
			form.value.password !== "" &&
			form.value.password_confirmation !== ""
		) {
			userStore.clearValidationErrors();
			toStoreForm(form.value);
		} else {
			alert("fill the fields");
		}
	};

	const toStoreForm = async (formData) => {
		await userStore.register(formData);
		if (Object.keys(userStore.validationErrors).length === 0) {
			router.push("/login"); 
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
