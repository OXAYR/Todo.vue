<template>
  <div>
    <h2>All ToDos</h2>
    <ul>
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
  import { computed, onMounted } from "vue";
  import { useTodoStore } from "@/stores/todoStore";
  import { useRouter } from "vue-router";
  import Todo from "@/components/Todo.vue";

  const router = useRouter();
  const todoStore = useTodoStore();

  const allTodos = computed(() => todoStore.getTodos);

  const fetchTodos = async () => {
    await todoStore.fetchTodos();
  };

  const deleteTodo = async (todoId) => {
    await todoStore.deleteTodo(todoId);
  };

  const editTodo = async (todoId) => {
    await router.push({ path: `/todo/edit/${todoId}` });
  };

  onMounted(fetchTodos);
</script>
