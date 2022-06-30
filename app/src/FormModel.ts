export type FormModel = {
  firstName: string;
  lastName: string;
  todos: Array<TodoFormModel>;
};

export type TodoFormModel = { formKey: string; value: string };
