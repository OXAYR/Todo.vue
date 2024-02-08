<template>
	<div>
		<h2>All ToDos</h2>
		<ul ref="todosList">
			<Todo
				v-for="todo in allTodos"
				:key="todo.id"
				:todo="todo"
				@delete-todo="deleteTodo"
				@edit-todo="editTodo"
			/>
		</ul>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
	import { useTodoStore } from "@/stores/todoStore";
	import { useRouter } from "vue-router";
	import Todo from "@/components/Todo.vue";
	import axios from "axios";

	const router = useRouter();
	const todoStore = useTodoStore();
	const todosList = ref(null); // Reference to the <ul> element

	const allTodos = computed(() => todoStore.getTodos);

	const currentPage = computed(() => todoStore.getCurrentPage);

	const fetchTodos = async (page) => {
		await todoStore.fetchTodos(page);
	};

	const deleteTodo = async (todoId) => {
		await todoStore.deleteTodo(todoId);
	};

	const editTodo = async (todoId) => {
		await router.push({ path: `/todo/edit/${todoId}` });
	};

	const loadNextPage = async () => {
		const nextPage = todoStore.currentPage + 1;
		console.log("Next page:", nextPage);
		if (nextPage <= todoStore.lastPage) {
			await todoStore.fetchTodos(nextPage);
		}
	};
	onMounted(() => {
		fetchTodos(1); 
		window.addEventListener("scroll", getNextPageOnScroll);
	});

	const getNextPageOnScroll = () => {
		const bottomOfWindow =
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 1;

		console.log("bottom of the window:", bottomOfWindow);
		if (bottomOfWindow) {
			loadNextPage();
		}
	};
</script>
