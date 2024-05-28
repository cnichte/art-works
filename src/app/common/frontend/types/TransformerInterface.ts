export default interface TransformerInterface {
  toView(data: any): void;
  toData(data: any): void;
}
