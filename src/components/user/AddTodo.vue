<template>
	<div class="bg-gray-100 p-4 rounded-lg shadow-md">
		<h2 class="text-2xl font-bold mb-4">
			{{ mode === "add" ? "Add New ToDo" : "Edit ToDo" }}
		</h2>
		<form @submit.prevent="handleSubmit">
			<label
				for="title"
				class="block mb-2 font-semibold"
				>Title:</label
			>
			<input
				v-model="newTodo.title"
				id="title"
				type="text"
				required
				class="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
			/>

			<label
				for="description"
				class="block mb-2 font-semibold"
				>Description:</label
			>
			<textarea
				v-model="newTodo.description"
				id="description"
				class="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
			></textarea>

			<button
				type="submit"
				class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
			>
				{{ mode === "add" ? "Add ToDo" : "Update ToDo" }}
			</button>
		</form>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
	import { useTodoStore } from "@/stores/todoStore";
	import router from "@/router";
	// getting the todo pinia store to work on it
	const todoStore = useTodoStore();
	// getting this to get the current route for edit todo mode
	const route = router.currentRoute;
	// computed property to call the getter of the todo it will work always when the dependencies changes
	const selectedTodo = computed(() => todoStore.getSelectedTodo);
	// checking the route on runtime to make the adjustment accordingly
	const mode = computed(() =>
		route.value.path.includes("/edit/") ? "edit" : "add"
	);
	// if it is in edit mode give it the pervios selected todo value otherwise give it the null values
	const newTodo = ref({
		title: selectedTodo.value?.title || "",
		description: selectedTodo.value?.description || "",
	});
	// if it is the in the edit mode it should fetch the selected todo by getting the todo id from the params
	onMounted(() => {
		if (mode.value === "edit") {
			const todoId = route.value.params.id;
			todoStore.fetchTodoById(todoId);
		}
	});
	// handles the submission of the todo if the fields are not empty
	async function handleSubmit() {
		if (!newTodo.value.title.trim()) {
			alert("Please enter a valid title.");
			return;
		}
		// if in add mode it should invoke the pinia store add function
		if (mode.value === "add") {
			await todoStore.addTodo(newTodo.value);
		} else {
			// if in edit mode it should invoke the pinia store edit function
			await todoStore.updateTodo(newTodo.value, route.value.params.id);
		}
		router.push("/");
		// assinging new null values to empty the fields
		newTodo.value = { title: "", description: "" };
	}
</script>
