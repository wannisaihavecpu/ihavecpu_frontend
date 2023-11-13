interface menuDropdown {
  displayCategoryID: number;
  categoryID: number;
  title_th: string;
  title_gb: string;
  icon: string;
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
