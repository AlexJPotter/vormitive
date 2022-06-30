import { DeepReadonly, UnwrapNestedRefs, Ref } from 'vue';

export type ReadonlyRef<T> = DeepReadonly<UnwrapNestedRefs<Ref<T>>>;
