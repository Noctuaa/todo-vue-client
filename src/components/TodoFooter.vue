<script setup>
   import { useTodoStore } from '@/stores/todoStore';
   const todoStore = useTodoStore();

   const filters = [
      { key: 'all', label: 'Tous' },
      { key: 'active', label: 'Actives' },
      { key: 'completed', label: 'Terminées' }
   ]

   const handleFilter = (filter) => {
      todoStore.setFilter(filter)
   }

</script>

<template>
   <footer class="todo-footer d-flex j-content-between a-items-center" v-if="todoStore.allTodos.length > 0">
      <span>  
         {{ todoStore.remainingCount === 0 ? 'Aucune tâche' :  todoStore.remainingCount === 1 ? '1 tâche' : `${todoStore.remainingCount} tâches` }}.
      </span>
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
      transition: all var(--duration-fast) ease-in;
   }

   .todo-filters .active{
      background-color: var(--primary);
      color: var(--text-secondary);
      border-radius: var(--radius-md);
   }

   .filter-btn{
      padding: .5em .6em;
      font-size: .9rem;
      background: none;
      border:none;
      cursor: pointer;
   }
</style>