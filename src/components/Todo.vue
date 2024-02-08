<template>
	<li>
		<strong>{{ todo.title }}</strong>
		<p>{{ todo.description }}</p>
		<button @click="deleteTodo(todo.id)">Delete</button>
		<button @click="editTodo(todo.id)">Edit</button>
	</li>
</template>

<script setup>
	const props = defineProps({
		todo: Object,
	});
	const emit = defineEmits(["delete-todo", "edit-todo"]);
	const deleteTodo = (todoId) => {
		console.log(todoId);
		var answer = confirm("Do you really want to delete the Todo?");
		if (answer) {
			emit("delete-Todo", todoId);
		}
	};

	const editTodo = (todoId) => {
		console.log("todoId", todoId);
		emit("edit-todo", todoId);
	};
</script>
