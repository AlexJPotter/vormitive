# informl

Simple form primitives for Vue 3, inspired by Formik.

## Installation

### NPM

```
npm install informl --save
```

### Yarn

```
yarn add informl
```

## Usage

Call `useForm` with appropriate parameters to create a new form context that is available to all child components.

The return value of `useForm` contains a bunch of helpful things you can use. In particular, the `handleSubmit` helper when called will mark all the fields on the form as touched, run the validation, and mark the form as submitting while your handler is running.

```tsx
// -- `MyForm.vue`

<script setup lang="ts">
// Import the necessary functionality
import { useForm, type ValidationResult } from 'informl';

// Define the shape of your form model
type FormModel = { fullName: string };

// Specify initial values for your form model
const initialValues: FormModel = { fullName: '' };

// Specify a `validate` function that maps each field to an error message (or `null`)
const validate = (values: FormModel): ValidationResult<FormModel> => ({
  fullName: values.fullName === '' ? 'Please enter your full name' : null
});

const { handleSubmit } = useForm<FormModel>({ initialValues, validate });

const onSubmit = () => {
  handleSubmit(async (values: FormModel) => {
    console.log('Form was submitted', values);
    await new Promise(resolve => setTimeout(resolve, 1_000)); // Simulate some async work
  });
}
</script>

<template>
<form @submit.prevent="onSubmit">
  <TextInputField field-name="fullName" />
  <button type="submit">Submit</button>
</form>
</template>
```

In the above example, the `<TextInputField />` component is a **custom form field**. Unlike many other libraries, `informl` does not define any Vue components, but instead leaves you to define them yourself.

```tsx
// -- `TextInputField.vue`

<script setup lang="ts">
import { toRef, computed } from 'vue';
import { useFormContext, useField } from 'informl';

type Props = {
  fieldName: string;
};
const props = defineProps<Props>();

const fieldNameRef = toRef(props, 'fieldName');

// Note: the use of `unknown` below is due to Vue not supporting generic components
const { isSubmitting, validate } = useFormContext<unknown>();

const {
  value,
  setFieldValue,
  setFieldTouched,
  error,
  isTouched,
} = useField<unknown>(fieldNameRef);

const shouldShowError = computed(() => isTouched.value && error.value != null);
</script>

<template>
TODO
</template>
```
