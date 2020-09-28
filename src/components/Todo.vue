<template>
	<section class="todoapp">
		<header>
			<h1>NocTodo</h1>
		</header>
		<input type="text" name="newTodo" id="newTodo" placeholder="Add new task" v-model="newTodo"
			@keyup.enter="addTodo">
		<div class="todoslist">
			<ul :style="{margin: !todos.length ? 0 : ''}">
				<li v-for="todo in todos" :key="todo.id" :data-testid="todo.id">
					<input class="toggle" type="checkbox" v-model="todo.completed">
					<label>
						{{todo.title}}
					</label>
					<button class="destroy" @click="deleteTodo(todo)"></button>
				</li>
			</ul>
			<footer v-show="todos.length" v-cloak>
				<span class="todo_count">
					<strong>{{remaining}}</strong>
					{{pluralize}}
				</span>
			</footer>
		</div>
	</section>
</template>

<script>
let storageKey = 'todos_vuejs_3';
	export default {
		data() {
			return {
				todos: [],
				newTodo: '',
			}
		},

		methods: {

			addTodo() {
				if (this.newTodo !== "") {
					this.newTodo = this.newTodo.charAt(0).toUpperCase() + this.newTodo.slice(1); // First letter of a string uppercase

					this.todos.push({
						id: this.todos.length,
						title: this.newTodo,
						completed: false
					});

					this.newTodo = "";
				}

			},

			deleteTodo(todo) {
				this.todos.splice(this.todos.indexOf(todo), 1);
			}
		},

		computed: {
			/**
			 * Pluralize if there is more than one task to do.
			 */
			pluralize() {
				return this.remaining <= 1 ? 'Task' : 'Tasks';
			},

			/**
			 * Return the number of tasks to do.
			 */
			remaining() {
				return this.todos.filter(todo => !todo.completed).length;
			}
		},

		
		watch: {
			/**
			 * Watch todos change for localStorage update
			 */
			todos: {
				handler: function (todos) {
					localStorage.setItem(storageKey, JSON.stringify(todos));
				},
				deep: true
			}
		},

		mounted() {
			/**
			 * Get todos in localStorage.
			 */
			this.todos = JSON.parse(localStorage.getItem(storageKey) || "[]");
		}

	}
</script>
