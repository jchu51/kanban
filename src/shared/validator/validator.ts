export class Validator {
  isString = (value: any): boolean => {
    return typeof value === "string";
  };

  isEmptyString = (value: any): boolean => {
    return this.isString(value) && value.length === 0;
  };
}
