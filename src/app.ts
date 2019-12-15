import { renderTodos } from './utils';
import * as fromStore from './store';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer,
};

const store = new fromStore.Store(reducers);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const todo = {label:input.value,complete:false};

    store.dispatch(new fromStore.AddTodo(todo));

    input.value = '';
  },
  false
);

const unsubscribe = store.subscribe(state=> {
  renderTodos(state.todos.data);
});

destroy.addEventListener('click',unsubscribe,false);

todoList.addEventListener('click', (event:any)=> {
  let target:any = null;
  if(event.target.getAttribute('type') === 'button'){
    target = event.target as HTMLButtonElement;
    const todo = JSON.parse(target.getAttribute('data-todo') as any);
    store.dispatch(new fromStore.RemoveTodo(todo));
  }else if(event.target.getAttribute('type') === 'checkbox'){
    target = event.target as HTMLInputElement;
    let x:any = document.createElement("INPUT");  
    let inviaMod = document.createElement("BUTTON");
    inviaMod.innerHTML = 'Modify Todo';
    let valore = JSON.parse(target.value);
    x.setAttribute("type", "text");
    x.setAttribute("value",valore.label);
    todoList.appendChild(x);
    inviaMod.addEventListener('click',function(e){
      valore.label = x.value;
      console.log('valore',x.value);
        store.dispatch(new fromStore.ModifyTodo(valore));
    });
    todoList.appendChild(inviaMod);
  }
 
});


store.subscribe(state=> console.log('STATE:::',state));