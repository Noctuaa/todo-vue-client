<script setup>
    import { useTodoStore } from '@/stores/todoStore';

    const todoStore = useTodoStore();

    const handleToggle = (todoId) => {
        todoStore.toggleTodo(todoId)
    }

</script>

<template>
    <ul class="tasks" v-if="todoStore.allTodos.length > 0">
        <li class="task d-flex a-items-center p-relative" v-for="todo in todoStore.allTodos" :key="todo.id">
            <input class="toggle-task btn-action" type="checkbox" :checked="todo.completed" @change="handleToggle(todo.id)" aria-label="Marquer la tâche comme terminée">
            <label class="task-label w-100">{{ todo.title }}</label>
            <button class="destroy btn-action" aria-label="Supprimer la tâche"></button>
        </li>
    </ul>
</template>

<style>


.tasks{
    padding: 0 20px;
    margin-top: 20px;
}

.task{
    list-style: none;
    padding: 15px 0;
}

.task:hover .destroy{
    opacity: 1;   
}

.btn-action{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}


/*===== BUTTON COMPLETED ====*/

.toggle-task{
    cursor: pointer;
    appearance: none;
    width: 30px;
    height: 25px;
    margin-right: 1em;
    border-radius:50%;
    border: 1px solid var(--border-color);
    transition: var(--transition-fast);
}

.toggle-task:checked{
    background-color: var(--purple);
    border: 1px solid var(--purple);
    border: none;
}


.toggle-task::after{
    content: "";
    position: absolute;
}


.toggle-task::after{
    width: 15px;
    height: 8px;
    border-left: 3px solid #fff;
    border-bottom: 3px solid #fff;
    transform: rotate(-45deg);
    opacity: 0;
}

.toggle-task:checked::after{
    opacity: 1;
}

.toggle-task:checked+label{
    text-decoration: line-through;
    color: #ccc;
    transition-duration: .3s ;
}

/*===== BUTTON DESTROY ====*/

.destroy {
    background: #ff4954;
    border: none;
    border-radius: 100%;
    cursor: pointer;
    opacity: 0;
    padding: 0;
    transition: var(--transition-fast);
    width: 30px;
    height: 25px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.destroy:after, .destroy:before {
    content: " ";
    display: block;
    position: absolute;
    width: 15px;
    opacity: 1;
    border-top: 3px solid #fff;
}

.destroy:before {
    transform: rotate(-45deg);
}

.destroy:after {
    transform: rotate(45deg);
}
</style>