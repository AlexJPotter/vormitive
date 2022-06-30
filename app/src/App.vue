<script setup lang="ts">
import { useForm, ValidationResult } from 'informl';
import { FormModel } from './FormModel';
import { getRandomId } from './helpers';
import TestForm from './TestForm.vue';

const initialValues: FormModel = {
  firstName: '',
  lastName: '',
  todos: [{ formKey: getRandomId(), value: '' }],
};

const validate = (formModel: FormModel): ValidationResult<FormModel> => ({
  firstName: formModel.firstName.trim() === '' ? 'Please enter your first name' : null,
  lastName: formModel.lastName.trim() === '' ? 'Please enter your last name' : null,
});

const { handleSubmit, values } = useForm<FormModel>({
  initialValues,
  validate,
});

const onSubmit = () => {
  handleSubmit(async (formModel: FormModel) => {
    console.log('Submitted', formModel);
    return await new Promise((resolve) => setTimeout(resolve, 500));
  });
};
</script>

<template>
  <TestForm @submit="onSubmit" />
  <pre style="font-size: 10px">
    {{ JSON.stringify(values, null, 2) }}
  </pre>
</template>

<style>
#app {
  padding: 16px 32px;
  font-family: 'Roboto', sans-serif;
}
</style>
