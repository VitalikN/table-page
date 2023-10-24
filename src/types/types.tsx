export type ResponseData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TableData[];
};

export type TableData = {
  id?: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};
export type QueryArg = number;

export type ApiResponse = {
  data: {
    token?: string;
  };
};

export interface IProps {
  children: React.ReactNode;
}

export type RootState = {
  auth: {
    token: string | null;
  };
  table: any;
  pagination: {
    currentPage: number;
  };
};

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ErrorFeedbackProps {
  name: string;
}
export type Action = "POST" | "PUT" | "PATCH" | null;

export interface AddTableRowFormProps {
  action: Action;
  selectedId: number | null;
}
