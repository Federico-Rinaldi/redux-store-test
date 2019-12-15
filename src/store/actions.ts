export const ADD_TODO = '[Todo] Add Todo';
export const REMOVE_TODO = '[Todo] Remove Todo';
export const MODIFY_TODO = '[Todo] Modify Todo';

export class AddTodo {
    readonly type = ADD_TODO;
    constructor(private payload:any){}

}

export class RemoveTodo{
    readonly type = REMOVE_TODO;
    constructor(private payload:any){}
}

export class ModifyTodo{
    readonly type = MODIFY_TODO;
    constructor(private payload:any){}
}