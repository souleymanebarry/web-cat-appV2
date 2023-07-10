export enum ProductActionsTypes {

  FETCH_ALL_PRODUCTS="FETCH_ALL_PRODUCTS",
  SELECTED_PRODUCTS="SELECTED_PRODUCTS",
  AVAILABLE_PRODUCTS="AVAILABLE_PRODUCTS",
  SEARCH_PRODUCTS="SEARCH_PRODUCTS",
  GET_SELECTED_PRODUCT="GET_SELECTED_PRODUCT",
  CREATE_NEW_PRODUCT="CREATE_NEW_PRODUCT",
  EDIT_PRODUCT="EDIT_PRODUCT",
  DELETE_PRODUCT="DELETE_PRODUCT"
}

export interface ActionEvent {
  type: ProductActionsTypes,
  payload?: any
}
export enum DataStateEnum {

  LOADING= "LOADING",
  LOADED= "LOADED",
  ERROR= "ERROR"
}

export interface AppDataState<T> {

  dataState?: DataStateEnum,
  data?: T,
  errorMessage?: string

}

