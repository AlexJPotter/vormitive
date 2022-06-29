import type { DeepReadonly, UnwrapNestedRefs, Ref } from '@vue/reactivity';

export type ReadonlyRef<T> = DeepReadonly<UnwrapNestedRefs<Ref<T>>>;
