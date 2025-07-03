type HttpResponse<T> = {
  data: T;
  meta: Meta;
};

type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
type Filter<T> = {
  field: string;

  operator?:
    | '$eq' // Equal
    | '$eqi' // Equal (case-insensitive)
    | '$ne' // Not equal
    | '$nei' // Not equal (case-insensitive)
    | '$lt' // Less than
    | '$lte' // Less than or equal to
    | '$gt' // Greater than
    | '$gte' // Greater than or equal to
    | '$in' // Included in an array
    | '$notIn' // Not included in an array
    | '$contains' // Contains
    | '$notContains' // Does not contain
    | '$containsi' // Contains (case-insensitive)
    | '$notContainsi' // Does not contain (case-insensitive)
    | '$null' // Is null
    | '$notNull' // Is not null
    | '$between' // Is between
    | '$startsWith' // Starts with
    | '$startsWithi' // Starts with (case-insensitive)
    | '$endsWith' // Ends with
    | '$endsWithi' // Ends with (case-insensitive)
    | '$or' // Joins the filters in an "or" expression
    | '$and' // Joins the filters in an "and" expression
    | '$not'; // Joins the filters in an "not" expression
  value: string;
  type?: 'or' | 'and';
};

type Article = {
  documentId?: number;
  title: string;
  shortSummary: string;
  content: string;
  tags: string;
  isArchived?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};
