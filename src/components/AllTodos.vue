<template>
	<div>
		<h2>All ToDos</h2>
		<ul>
			<li
				v-for="todo in allTodos"
				:key="todo.id"
			>
				<strong>{{ todo.title }}</strong>
				<p>{{ todo.description }}</p>
				<!-- <button @click="deleteTodo(todo.id)">Delete</button> -->
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
    import { useTodoStore } from "@/stores/todoStore";

    const todoStore = useTodoStore();
    const todos = ref([]);

    const allTodos = computed(() => todoStore.getTodos);
    console.log("All todos----->", allTodos);

    const fetchTodos = async () => {
        await todoStore.fetchTodos();
    };

    onMounted(fetchTodos);
</script>
