import styled from "styled-components";

export const TableDIYStyle = styled.div`
  max-width: 100%;
  overflow-x: auto;

  table {
    border: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    border-spacing: 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid #e0e2e3;

    thead {
      background: #606060;

      th {
        text-transform: uppercase;
        line-height: 60px !important;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        color: white;
        padding-top: 0px !important;
        padding-bottom: 0px !important;
      }
    }

    tbody {
      background: #fff;

      tr {
        border-top: 1px solid #e5e5e5;
        height: 60px;

        td:first-child {
          padding-left: 45px;
          // padding-left: 45px;
        }

        td {
          height: 60px;
          // line-height: 60px !important;
          text-align: left;
          padding: 0 10px;
          font-size: 14px;

          i {
            margin-right: 8px;
          }
        }
      }
    }
  }
  .scrollbar::-webkit-scrollbar {
    border-radius: 8px;
    width: 5px;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  @media screen and (max-width: 900px) {
    max-height: 500px;

    table {
      border: 1px solid transparent;
      box-shadow: none;

      thead {
        display: none;
      }

      tbody {
        tr {
          border-bottom: 5px solid #ddd;
          td:first-child {
            padding-left: 10px;
          }
          &:nth-child(2) {
            justify-content: right;
          }
          td:before {
            content: attr(data-label);
            float: left;
            font-size: 13px;
            text-transform: uppercase;
            font-weight: bold;
          }
          .picture {
            justify-content: right;
          }
          td {
            img {
              width: 48px;
              height: 48px;
              border-radius: 50px;
            }
            display: block;
            text-align: right;
            font-size: 14px;
            padding: 0px 10px !important;
            box-shadow: 0 1px 1px #ddd;
          }
        }
      }
    }
  }
`;
