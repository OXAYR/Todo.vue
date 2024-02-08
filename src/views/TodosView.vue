<template>
	<div class="bg-gray-100 p-4 rounded-lg shadow-md">
		<h2 class="text-2xl font-bold mb-4">All ToDos</h2>
		<ul ref="todosList">
			<div
				v-show="loading"
				class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-50"
			>
				<Loader />
			</div>
			<div
				v-for="todo in allTodos"
				:key="todo.id"
				class="bg-white rounded-lg shadow-md p-4 mb-4"
			>
				<Todo
					:todo="todo"
					@delete-todo="deleteTodo"
					@edit-todo="editTodo"
				/>
			</div>
		</ul>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
	import { useTodoStore } from "@/stores/todoStore";
	import { useRouter } from "vue-router";
	import Todo from "@/components/Todo.vue";
	import Loader from "@/components/Loader.vue";

	const router = useRouter();
	const todoStore = useTodoStore();
	const todosList = ref(null);

	const allTodos = computed(() => todoStore.getTodos);
	const loading = computed(() => todoStore.isLoading);

	const fetchTodos = async (page) => {
		await todoStore.fetchTodos(page);
	};

	const deleteTodo = async (todoId) => {
		await todoStore.deleteTodo(todoId);
	};

	const editTodo = async (todoId) => {
		await router.push({ path: `home/todo/edit/${todoId}` });
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
		if (bottomOfWindow && !loading.value) {
			loadNextPage();
		}
	};
</script>
