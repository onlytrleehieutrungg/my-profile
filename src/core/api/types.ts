export interface IGenericResponse {
  status: string;
  message: string;
}

export interface Search {
  searchValue: string;
}

export interface BufferedResponse {
  result: ArrayBuffer;
}
