import Store from '@/store/index.js'
import { mount } from '@vue/test-utils'
import Todolist from '@/components/Todo.vue'

describe('Todolist.vue', () => {
   
    let wrapper = mount(Todolist, {
        global: {
          plugins: [Store]
        }
      })

    it('Should render correct contents', () => {
        expect(wrapper.find('#newTodo').element.placeholder).toBe('Add new task')
    })

    it('Should set correct default data', () => {
        expect(wrapper.vm.todos).toEqual([])
        expect(wrapper.vm.newTodo).toEqual('');
    })

    describe('User populates the text input field', () => {
        let input;

        beforeEach(() => {
            input = wrapper.find('#newTodo');
            input.element.value = 'New Todo';
            input.trigger('input');
        })

        it('Should update "newTodo"', () => {
            expect(wrapper.vm.newTodo).toEqual('New Todo');
        })

        describe('And press Enter', () => {

            it('Should add a new todo to "todos"', () => {
                input.trigger('keyup.enter');
                expect(wrapper.vm.todos).toEqual([{
                    "completed" : false,
                    "id": 0,
                    "title": "New Todo"
                }])
            })
            it('Should get the number of tasks', () => {
                expect(wrapper.vm.remaining).toEqual(1);
            })

            it('Should be in the singular', () => {
                expect(wrapper.vm.pluralize).toEqual('Task');
            })
        })
    })

        describe('User clicks on the button completed a task', () => {
            it('Should completed the task', () => {
                const checkbox = wrapper.find('.toggle');
                checkbox.trigger("click");
                expect(wrapper.vm.todos).toEqual([{
                    "completed": true,
                    "id":0,
                    "title": "New Todo"
                }])
            })
        })

        describe('User click on the button delete', () => {
            it('Should delete the task', async () => {
                const deleteButton = wrapper.find(".destroy");
                await deleteButton.trigger("click");
                expect(wrapper.vm.todos).toEqual([]);
            })
        })
    
});