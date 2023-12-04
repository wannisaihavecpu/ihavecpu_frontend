import styled from "styled-components";

export const TableDIYStyle = styled.div`
  max-width: 100%;
  overflow-x: auto;

  .table-container {
    display: flex;
  }

  thead {
    flex: 1;
    background-color: #606060;
  }

  .body {
    flex: 1;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e0e2e3;
  }

  th {
    color: white;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    padding: 8px;
    border-bottom: 1px solid #e0e2e3;
  }

  td {
    font-size: 14px;

    padding: 10px;
    border-bottom: 1px solid #e0e2e3;
  }

  /* Alternate Row Background Color */
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  th.column1,
  td.column1 {
    width: 30%;
    text-align: left;
    padding-left: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
    font-size: 14px;
    font-weight: 300;
    color: #010f1c;
    background-color: #f9f9f9;
  }

  th.column2,
  td.column2 {
    width: 70%;
    color: #55585b;
    padding-left: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
    font-size: 14px;
    background-color: #fff;
    text-align: left;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    table {
      font-size: 14px;
    }

    th,
    td {
      padding: 8px;
      text-align: center;
    }
  }
`;
