<template>
	<div>
		<h2>All ToDos</h2>
		<ul>
			<li
				v-for="todo in allTodos"
				:key="todo.id"
			>
				{{ todo.title }} - {{ todo.description }}
				<button @click="deleteTodo(todo.id)">Delete</button>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
	import { useTodoStore } from "@/stores/todoStore";

	const { getTodos, deleteTodo, fetchTodos } = useTodoStore();
	const todos = ref([]);

	const allTodos = computed(() => getTodos);

	onMounted(async () => {
		await fetchTodos();
	});
</script>
