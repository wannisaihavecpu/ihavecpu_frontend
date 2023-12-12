import styled from "styled-components";

export const TableDIYStyle = styled.div`
  max-width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    border-radius: 8px;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
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
          img {
            width: 48px;
            height: 48px;
            border-radius: 50px;
          }
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

export const ModalNavListDIY = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  // align-items: center;
  // justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;

  /* modal content */
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  .exit-button {
    position: absolute;
    top: 10px;
    right: 10px;

    padding: 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  .text-left {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Display selected products */
  .selected-products {
    overflow-y: auto;
    max-height: 80vh;
    padding: 20px 10px 85px;
  }

  /* Buttons for creating specification and resetting */
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  /* Button styles */
  .button {
    /* Add styles for the buttons */
    cursor: pointer;
  }

  /* Prevent scrolling of body content when modal is open */
  body.modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
`;
