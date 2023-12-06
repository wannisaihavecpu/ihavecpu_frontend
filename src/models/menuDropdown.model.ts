interface menuDropdown {
  displayCategoryID: number;
  categoryID: number;
  parent_id?: number;
  title_th: string;
  title_gb: string;
  icon: string;
  link: string;
  schema_link: string;
  subCategory: [
    {
      categoryID: number;
      parentID: number;
      icon: string;
      title_th: string;
      title_gb: string;
    }
  ];
}

export default menuDropdown;
