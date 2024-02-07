<template>
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
</script>
