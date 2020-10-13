import { createStore } from 'vuex'

export default createStore({
	state: {
		todos: []
	},
	getters: {
		todos: (state) => state.todos,
		remaining: (state) => state.todos.filter(todo => !todo.completed).length
	},
	mutations: {
		ADD_TODO(state, payload) {
			state.todos.push({
				id: state.todos.length,
				title: payload,
				completed: false
			});
		},

		DELETE_TODO(state, payload) {
			state.todos.splice(state.todos.indexOf(payload),1);
		}
	},
	actions: {
		addTodo: ({commit}, payload) => {
			commit('ADD_TODO', payload)
		},

		deleteTodo: ({commit}, payload) => {
			commit('DELETE_TODO', payload)
		},
	},
	modules: {}
})