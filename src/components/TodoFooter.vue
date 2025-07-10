<script setup>
   import { useTodoStore } from '@/stores/todoStore';
   const todoStore = useTodoStore();

   const filters = [
      { key: 'all', label: 'Tous' },
      { key: 'active', label: 'Actif' },
      { key: 'completed', label: 'Compléter' }
   ]

   const handleFilter = (filter) => {
      todoStore.setFilter(filter)
   }

</script>

<template>
   <footer class="todo-footer d-flex j-content-between a-items-center">
      <span>{{ todoStore.remainingCount }} Tâches.</span>
      <nav class="todo-filters d-flex">
         <button v-for="filter in filters" :key="filter.key" @click="handleFilter(filter.key)" 
         class="filter-btn" :class="{ active: todoStore.filter === filter.key }">
            {{ filter.label }}
         </button>
      </nav>
   </footer>
</template>

<style>
   .todo-footer {
      border-top: 1px solid var(--border-color);
      padding: .6em .9em;
   }

   .todo-filters{
      gap: 5px;
      transition: all .3s ease-in;
   }

   .todo-filters .active{
      background-color: var(--purple);
      color: var(--text-color-soft);
      border-radius: .25rem;
   }

   .filter-btn{
      padding: .5em .6em;
      font-size: .9rem;
      background: none;
      border:none;
      cursor: pointer;
   }
</style>