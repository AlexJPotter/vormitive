<script setup lang="ts">
import { useFieldArray, useFormContext } from 'vormitive';
import { ref } from 'vue';
import TextInputField from './components/TextInputField.vue';
import { TodoFormModel } from './FormModel';
import { getRandomId } from './helpers';

type Emits = {
  (e: 'submit'): void;
};
const emit = defineEmits<Emits>();

const { isSubmitting } = useFormContext();

const todosFieldNameRef = ref('todos');
const todos = useFieldArray<TodoFormModel>(todosFieldNameRef);
</script>

<template>
  <div id="app">
    <h1>Test App</h1>
    <form @submit.prevent="emit('submit')">
      <TextInputField field-name="firstName" label="First name" />
      <TextInputField field-name="lastName" label="Last name" />
      <div v-auto-animate>
        <div v-for="(todo, index) in todos.values.value" :key="todo.formKey" class="todo-row">
          <TextInputField :field-name="`todos[${index}].value`" label="" />
          <button type="button" @click="todos.moveLeft(index)" :disabled="index === 0">^</button>
          <button type="button" @click="todos.moveRight(index)" :disabled="index === todos.values.value.length - 1">
            v
          </button>
        </div>
      </div>
      <button type="button" @click="todos.push({ formKey: getRandomId(), value: '' })">Add TODO</button>
      <button type="submit" :disabled="isSubmitting">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.todo-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}
</style>
