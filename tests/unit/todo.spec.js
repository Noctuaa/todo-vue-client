import {mount} from '@vue/test-utils'
import Todolist from '@/components/Todo.vue'

describe('Todolist.vue', () => {
    let wrapper;

    it('should render correct contents', () => {
        wrapper = mount(Todolist); 
        expect(wrapper.find('#newTodo').element.placeholder).toBe('Add new task')
    })

    it('should set correct default data', () => {
        expect(wrapper.vm.todos).toEqual([]);
        expect(wrapper.vm.newTodo).toEqual('');
    })

    describe('user populates the text input field', () => {
        let input;

        beforeEach(() => {
            input = wrapper.find('#newTodo');
            input.element.value = 'New Todo';
            input.trigger('input');
        })

        it('should update "newTodo"', () => {
            expect(wrapper.vm.newTodo).toEqual('New Todo');
        })

        describe('and press Enter', () => {

            it('should add a new todo to "todos"', () => {
                input.trigger('keyup.enter');
                expect(wrapper.vm.todos).toEqual([{
                    "completed" : false,
                    "id": 0,
                    "title": "New Todo"
                }])
            })
            it('should get the number of tasks', () => {
                expect(wrapper.vm.remaining).toEqual(1);
            })

            it('should be in the singular', () => {
                expect(wrapper.vm.pluralize).toEqual('Task');
            })
        })

        describe('and completed todo', () => {
            it('should completed todo', () => {
                const checkbox = wrapper.find('.toggle');
                checkbox.trigger("click");
                expect(wrapper.vm.todos).toEqual([{
                    "completed": true,
                    "id":0,
                    "title": "New Todo"
                }])
            })
        })

        describe('and delete todo', () => {
            it('should delete the todo', async () => {
                const deleteButton = wrapper.find(".destroy");
                await deleteButton.trigger("click");
                expect(wrapper.vm.todos).toEqual([]);
            })
        })
    })
});