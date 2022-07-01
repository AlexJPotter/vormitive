<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useFormContext, useField } from 'vormitive';
import {
  textInputFieldErrorTestId,
  textInputFieldInputTestId,
  textInputFieldLabelTestId,
} from './textInputFieldTestIds';

type Props = {
  fieldName: string;
  label: string;
};
const props = defineProps<Props>();

const fieldNameRef = toRef(props, 'fieldName');

const { isSubmitting, validate } = useFormContext<unknown>();

const { value, setFieldValue, setFieldTouched, error, isTouched } = useField<unknown>(fieldNameRef);

const shouldShowError = computed(() => isTouched.value && error.value != null);

const inputHandler = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  setFieldValue(props.fieldName, newValue);
  validate();
};

const blurHandler = () => {
  setFieldTouched(props.fieldName, true);
  validate();
};
</script>

<template>
  <div style="margin-bottom: 16px">
    <div>
      <label :for="props.fieldName" :data-testid="textInputFieldLabelTestId(props.fieldName)">{{ props.label }}</label>
    </div>
    <div>
      <input
        :name="props.fieldName"
        :id="props.fieldName"
        :disabled="isSubmitting"
        :value="value ?? ''"
        :data-testid="textInputFieldInputTestId(props.fieldName)"
        @input="inputHandler"
        @blur="blurHandler"
      />
    </div>
    <div v-if="shouldShowError" style="color: red" :data-testid="textInputFieldErrorTestId(props.fieldName)">
      {{ error }}
    </div>
  </div>
</template>
