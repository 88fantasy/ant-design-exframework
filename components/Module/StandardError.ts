class StandardError extends Error {
  public code?: number;
  public msg: string; 
  constructor(msg: string, code?: number) {
    super();
    this.code = code;
    this.msg = msg;
  }
}

export default StandardError

