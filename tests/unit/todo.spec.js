import Store from '@/store/index.js'
import {
    mount
} from '@vue/test-utils'
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
        expect(wrapper.vm.filteredTodo).toEqual([])
        expect(wrapper.vm.newTodo).toEqual('');
        expect(wrapper.vm.filter).toEqual('all');
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
                expect(wrapper.vm.filteredTodo).toEqual([{
                    "completed": false,
                    "id": 0,
                    "title": "New Todo"
                }])
            })

            it('Should get the number of tasks', () => {
                expect(wrapper.vm.remainingCount).toEqual(1);
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
            expect(wrapper.vm.filteredTodo).toEqual([{
                "completed": true,
                "id": 0,
                "title": "New Todo"
            }])
        })
    })

    describe('User click on the button delete', () => {
        it('Should delete the task', async () => {
            const deleteButton = wrapper.find(".destroy");
            await deleteButton.trigger("click");
            expect(wrapper.vm.filteredTodo).toEqual([]);
        })
    })

    describe('User uses filters', () => {

        beforeEach(() => {
            Store.state.todos = ([{
                    'id': 0,
                    'title': 'First todo',
                    'completed': false
                },
                {
                    'id': 1,
                    'title': 'Second Todo',
                    'completed': true
                }
            ])
        })

        describe('User clicks on the "all" button of the filter', () => {
            it('Should render the list "all" todo', () => {
                const allButton = wrapper.find('#all');
                allButton.trigger("click");
                expect(wrapper.vm.filter).toEqual('all');
                expect(wrapper.vm.filteredTodo).toEqual([{
                        'id': 0,
                        'title': 'First todo',
                        'completed': false
                    },
                    {
                        'id': 1,
                        'title': 'Second Todo',
                        'completed': true
                    }
                ])
            })
        })

        describe('User clicks on the "active" button of the filter', () => {
            it('Should render the list "active" todo', () => {
                const activeButton = wrapper.find('#active');
                activeButton.trigger("click");
                expect(wrapper.vm.filter).toEqual('active');
                expect(wrapper.vm.filteredTodo).toEqual([{
                    'id': 0,
                    'title': 'First todo',
                    'completed': false
                }])
            })
        })

        describe('User clicks on the "done" button of the filter', () => {
            it('Should render the list "done" todo', () => {
                const activeButton = wrapper.find('#done');
                activeButton.trigger("click");
                expect(wrapper.vm.filter).toEqual('done');
                expect(wrapper.vm.filteredTodo).toEqual([{
                    'id': 1,
                    'title': 'Second Todo',
                    'completed': true
                }])
            })
        })
    })
});