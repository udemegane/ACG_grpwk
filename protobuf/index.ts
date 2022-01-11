export * as pb from './compiled_pb2'

// const message = Message.create({ message: 'hello' });
// const x = Message.encode(message).finish();
// const buffer = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);
export function toBuffer(mClass, mContent) {
  const x = mClass.encode(mContent).finish()
  return new Uint8Array(x.buffer, x.byteOffset, x.byteLength)
}
