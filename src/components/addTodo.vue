<!-- <template>
	<div>
		<h2>Add New ToDo</h2>
		<form @submit.prevent="addNewTodo">
			<label for="title">Title:</label>
			<input
				v-model="newTodo.title"
				id="title"
				type="text"
				required
			/>

			<label for="description">Description:</label>
			<textarea
				v-model="newTodo.description"
				id="description"
			></textarea>

			<button type="submit">Add ToDo</button>
		</form>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useTodoStore } from "@/stores/todoStore";

	const newTodo = ref({
		title: "",
		description: "",
	});

	const { addTodo } = useTodoStore();

	function addNewTodo() {
		// Validate input (e.g., check if title is not empty)
		if (!newTodo.value.title.trim()) {
			alert("Please enter a valid title.");
			return;
		}
		// for id we can do todos.length
		// Create a new ToDo item
		const todoItem = {
			id: Date.now(), // Generate a unique ID (you can use UUID or other methods)
			...newTodo.value,
		};

		// Add the new ToDo item to the store
		addTodo(todoItem);

		// Clear the form
		newTodo.value = {
			title: "",
			description: "",
		};
	}
</script> -->

<template>
	<div>
		<h2>{{ mode === "add" ? "Add New ToDo" : "Edit ToDo" }}</h2>
		<form @submit.prevent="handleSubmit">
			<label for="title">Title:</label>
			<input
				v-model="newTodo.title"
				id="title"
				type="text"
				required
			/>

			<label for="description">Description:</label>
			<textarea
				v-model="newTodo.description"
				id="description"
			></textarea>

			<button type="submit">
				{{ mode === "add" ? "Add ToDo" : "Update ToDo" }}
			</button>
		</form>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
	import axios from "axios";
	import { useTodoStore } from "./todoStore";
	import { useRoute, useRouter } from "vue-router";
	const route = useRoute();
	const router = useRouter();
	const currentRoute = ref(route.path);
	const { addTodo, updateTodo, getSelectedTodo } = useTodoStore();

	const mode = computed(() => {
		return currentRoute.value.includes("/edit/") ? "edit" : "add";
	});

	const selectedTodo = computed(() => getSelectedTodo);
	const newTodo = ref({
		title: "" || selectedTodo?.title,
		description: "" || selectedTodo?.description,
	});

	onMounted(async () => {
		if (mode.value === "edit") {
			const todoId = extractTodoIdFromRoute();
			await fetchTodoById(todoId);
		}
	});

	function handleSubmit() {
		if (!newTodo.value.title.trim()) {
			alert("Please enter a valid title.");
			return;
		}

		if (mode.value === "add") {
			const todoItem = {
				id: Date.now(),
				...newTodo.value,
			};
			addTodo(todoItem);
		} else {
			// Update an existing ToDo item
			// You'll need to implement the logic to find the specific ToDo item to update
			// and call the updateTodo action.
			// ...
		}

		newTodo.value = { title: "", description: "" };
	}

	function extractTodoIdFromRoute() {}
</script>
