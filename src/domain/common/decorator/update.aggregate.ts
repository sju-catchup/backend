import { AggregateRoot } from '../model.base';

/** 애그리거트에 추가해야만 기능하는 데코레이터 */
export const UpdateAggregate: MethodDecorator = (
  _,
  __,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const method = descriptor.value;
  descriptor.value = function (...args: any) {
    const res = method.apply(this, args);
    const instance = this as unknown;
    if (instance instanceof AggregateRoot<any>) {
      instance.updateUpdatedAt();
    }
    return res;
  };
};
