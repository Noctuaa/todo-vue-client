<script setup>

</script>

<template>
   <footer class="todo-footer d-flex j-content-between a-items-center">
      <span>3 Tâches.</span>
      <nav class="todo-filters d-flex">
         <button class="filter-btn active" aria-pressed="true">Tous</button>
         <button class="filter-btn">Actif</button>
         <button class="filter-btn">Compléter</button>
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