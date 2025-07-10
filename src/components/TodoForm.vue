<script setup>
   import { ref } from 'vue';
   import { useTodoStore } from '@/stores/todoStore';

   const newTodo = ref('');
   const todoStore = useTodoStore();
</script>

<template>
   <form class="todo-form" @submit.prevent="todoStore.addTodo(newTodo)">
      <input type="text" name="newTodo" id="newTodo" class="w-100" placeholder="Ajouter une nouvelle tâche..."
		v-model="newTodo" required>
   </form>
</template>

<style>
   #newTodo{
      background-color: var(--background-input);
      opacity: .8;
      padding: .9em 1.25em;
      border: none;
      transition: var(--transition-fast);
      font-size: 18px;
      border-radius: .25rem;
   }

   #newTodo:focus{
      outline: none;
      transform: scale(1.08);
      opacity: 1;
   }
</style>