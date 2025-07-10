import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
   // State
   state: () => ({
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      filter: "all", // 'all', 'active', 'completed'
   }),

   // Actions
   actions: {

      /**
       * Adds a new todo item to the list.
       * @param {string} newTodo - The text content of the new todo
       * @returns {void}
       * @description This method checks if the newTodo input is not empty,
       * then pushes a new todo object into the todos array.
       * Each todo object contains an id, text, and completed status.
       */
      addTodo(newTodo = String) {
         if(newTodo && newTodo.trim()) {
            this.todos.push({
               id: Date.now(),
               title: newTodo.trim(),
               completed: false
            })

            localStorage.setItem('todos', JSON.stringify(this.todos));
         }
      },
   },

   getters: { 
      /**
       * Returns the list of todos based on the current filter.
       * @returns {Array} Filtered list of todos
       */
      allTodos: (state) => state.todos,

   }

})