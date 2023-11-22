interface SubFilter {
  filter_id: number;
  name_th: string;
  name_gb: string | null;
}

interface getGroupSearch {
  filter_id: number;
  name_th: string;
  sub_filter: SubFilter[];
}

export default getGroupSearch;
