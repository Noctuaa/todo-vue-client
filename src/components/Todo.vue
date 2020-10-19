<template>
	<section class="todoapp">
		<header>
			<h1>NocTodo</h1>
		</header>
		<input type="text" name="newTodo" id="newTodo" placeholder="Add new task" v-model="newTodo"
			@keyup.enter="addTodo">
		<div class="todoslist">
			<div class="wrapper_task">
				<ul :style="{margin: !todos.length ? 0 : ''}">
					<li v-for="todo in filteredTodo" :key="todo.id" :data-testid="todo.id">
						<input class="toggle" type="checkbox" v-model="todo.completed">
						<label>
							{{todo.title}}
						</label>
						<button class="destroy" @click="deleteTodo(todo)"></button>
					</li>
				</ul>
			</div>
			<footer v-show="todos.length" v-cloak>
				<span class="todo_count">
					<strong>{{remainingCount}}</strong>
					{{pluralize}} left.
				</span>
				<ul class="filters">
					<li>
						<a href="#all" id="all" :class="{selected : filter === 'all'}" @click.prevent="this.filter = 'all'">All</a>
					</li>
					<li>
						<a href="#" id="active" :class="{selected : filter === 'active'}" @click.prevent="this.filter = 'active'">Active</a>
					</li>
					<li>
						<a href="#" id="done" :class="{selected : filter === 'done'}" @click.prevent="this.filter = 'done'">Done</a>
					</li>
				</ul>
			</footer>
		</div>
	</section>
</template>

<script>
	import store from '../store/index.js'
	import Vuex from 'vuex'
	let storageKey = 'todos_vuejs_3';
	export default {
		data() {
			return {
				newTodo: '',
				filter: 'all'
			}
		},

		methods: {

			...Vuex.mapActions({
				addTodoStore: 'addTodo',
				deleteTodoStore: 'deleteTodo'
			}),

			addTodo() {
				if (this.newTodo !== "") {
					// First letter of a string uppercase
					this.newTodo = this.newTodo.charAt(0).toUpperCase() + this.newTodo.slice(1); 
					this.addTodoStore(this.newTodo);
					this.newTodo = "";
				}

			},

			deleteTodo(todo) {
				this.deleteTodoStore(todo);
			}
		},

		computed: {
			...Vuex.mapGetters([
				'todos',
				'remaining',
				'remainingCount',
				'done'
			]),
			/**
			 * Pluralize if there is more than one task to do.
			 */
			pluralize() {
				return this.remainingCount <= 1 ? 'Task' : 'Tasks';
			},

			filteredTodo() {
				if(this.filter === 'active'){
					return this.remaining;
				}else if(this.filter === 'done'){				
					return this.done;
				}
				return this.todos;
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
			store.state.todos = JSON.parse(localStorage.getItem(storageKey) || "[]");
		}

	}
</script>
