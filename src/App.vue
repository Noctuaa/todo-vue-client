<template>
	<div class="hero">
		<section class="container">		
			<Todolist></Todolist>
		</section>
	</div>
</template>

<script>
	import Todolist from './components/Todo.vue'

	export default {
		name: 'App',
		components: {
			Todolist
		}
	}
</script>



<style lang="scss">
	@import '@/sass/app.scss';
</style>