# vormitive

Simple form primitives for Vue 3, inspired by Formik.

## Installation

### NPM

```
npm install vormitive --save
```

### Yarn

```
yarn add vormitive
```

## Usage

### Custom fields

Unlike many other libraries, `vormitive` does not define any Vue components, but instead leaves you to define them yourself using a number of form primitives exposed as composables.

This gives you **total control** over the look, feel, and behaviour of your form components. It also allows you to build the form abstractions that suit your specific needs, instead of requiring you to bend existing abstractions to your will.

```vue
// File: `TextInputField.vue`
<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useFormContext, useField } from 'vormitive';

type Props = { fieldName: string; label?: string; };
const props = defineProps<Props>();

const { isSubmitting, validate } = useFormContext<unknown>();

const fieldNameRef = toRef(props, 'fieldName');

const {
  value,
  setFieldValue,
  setFieldTouched,
  error,
  isTouched,
} = useField<unknown>(fieldNameRef);

const shouldShowError = computed(() =>
  isTouched.value && error.value != null
);

const handleInput = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  setFieldValue(props.fieldName, newValue);
  validate();
};

const handleBlur = () => {
  setFieldTouched(props.fieldName, true);
  validate();
};
</script>

<template>
  <label v-if="props.label != null" :for="props.fieldName">
    {{ props.label }}
  </label>
  <input
    :name="props.fieldName"
    :id="props.fieldName"
    :value="value ?? ''"
    :disabled="isSubmitting"
    @input="handleInput"
    @blur="handleBlur"
  />
  <div v-if="shouldShowError" style="color: red">
    {{ error }}
  </div>
</template>
```

### Building forms

Call `useForm` with appropriate parameters to create a new form context within the current component that is made available to all child components (using Vue's `provide`/`inject` APIs under the hood).

The return value of `useForm` contains a bunch of helpful things. In particular, the `handleSubmit` helper which, when called, will mark all the fields on the form as touched, run the validation, and mark the form as submitting while your handler is running.

```vue
// File: `MyForm.vue`
<script setup lang="ts">
import { useForm, type ValidationResult } from 'vormitive';

type FormModel = { fullName: string };

const initialValues: FormModel = { fullName: '' };

// A `validate` function should map each field to an error message (if the
// field is invalid), otherwise the field should be omitted from the result
// (or set to `null | undefined`). See the docs for more complex examples.
const validate = (values: FormModel): ValidationResult<FormModel> => ({
  fullName: values.fullName === '' ? 'Please enter your full name' : null
});

const { handleSubmit, isSubmitting} = useForm<FormModel>({
  initialValues,
  validate,
});

const onSubmit = () => {
  handleSubmit(async (values: FormModel) => {
    console.log('Form was submitted', values);
    await new Promise(resolve => setTimeout(resolve, 1_000));
  });
}
</script>

<template>
<form @submit.prevent="onSubmit">
  <TextInputField field-name="fullName" label="Full name" />
  <button type="submit" :disabled="isSubmitting">Submit</button>
</form>
</template>
```

