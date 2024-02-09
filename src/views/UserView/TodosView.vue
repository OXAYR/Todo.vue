<template>
	<div class="bg-gray-100 p-4 rounded-lg shadow-md">
		<h2 class="text-2xl font-bold mb-4">All ToDos</h2>
		<div class="mb-4">
			<input
				type="text"
				v-model="searchQuery"
				placeholder="Search Todos"
				class="p-2 border border-gray-300 rounded-md w-full"
			/>
		</div>
		<ul ref="todosList">
			<div
				v-show="loading"
				class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-50"
			>
				<Loader />
			</div>
			<div
				v-for="todo in filteredTodos"
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
	import Todo from "@/components/user/Todo.vue";
	import Loader from "@/components/Loader.vue";

	const router = useRouter();
	const todoStore = useTodoStore();
	const todosList = ref(null);
	const searchQuery = ref("");

	// getting all todos from the pinia store
	const allTodos = computed(() => todoStore.getTodos);

	// filtered the todo if the user search for specific todo title

	const filteredTodos = computed(() => {
		const query = searchQuery.value.toLowerCase().trim();
		if (!query) {
			return allTodos.value;
		} else {
			return allTodos.value.filter((todo) =>
				todo.title.toLowerCase().includes(query)
			);
		}
	});

	// for loader

	const loading = computed(() => todoStore.isLoading);

	// custom function which invoke the pinia sstore fetch todo function
	const fetchTodos = async (page) => {
		await todoStore.fetchTodos(page);
	};

	// custom function which invoke the pinia sstore delete todo function emiting from the child
	const deleteTodo = async (todoId) => {
		await todoStore.deleteTodo(todoId);
	};

	// custom function which invoke the pinia sstore edit todo function emiting from the child

	const editTodo = async (todoId) => {
		await todoStore.fetchTodoById(todoId);
		await router.push({ path: `todo/edit/${todoId}` });
	};

	// for infinite scroll if the user reaches the bottom fetch more todos

	const loadNextPage = async () => {
		const nextPage = todoStore.currentPage + 1;

		if (nextPage <= todoStore.lastPage) {
			await todoStore.fetchTodos(nextPage);
		}
	};

	// on mounted fetching todo initially by hardcoding 1 which is for the page number 1
	//added an event listener on scroll which will listen if the windows is scrolled
	onMounted(() => {
		fetchTodos(1);
		window.addEventListener("scroll", getNextPageOnScroll);
	});

	// as the windows scroll it will check either the window is at the bottom or not if yes it will request to fetch more todo

	const getNextPageOnScroll = () => {
		const bottomOfWindow =
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 1;

		if (bottomOfWindow && !loading.value) {
			loadNextPage();
		}
	};
</script>

<style scoped>
	/* Add scoped styles here */
</style>
