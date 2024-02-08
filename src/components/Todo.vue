<template>
	<li class="bg-white rounded-lg shadow-md p-4 mb-4">
		<strong class="text-xl font-semibold">{{ todo.title }}</strong>
		<p class="text-gray-600">{{ todo.description }}</p>
		<button
			@click="deleteTodo(todo.id)"
			class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
		>
			Delete
		</button>
		<button
			@click="editTodo(todo.id)"
			class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
		>
			Edit
		</button>
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
