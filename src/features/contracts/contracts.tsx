import { useCallback } from "react";
import { DataView, DataGetDataType, DataColumns } from "@okta/odyssey-react-mui/labs";
import { Contract, useGetContractsQuery } from "../apiSlice";
import { Button } from "@okta/odyssey-react-mui";

const dateFormat = (entry: any) => new Date(entry.cell.getValue()).toLocaleDateString();

export const ContractsList = () => {

  const columns: DataColumns<Contract> = [
    {
      accessorKey: "contractNumber",
      header: "Contract Number",      
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      Cell: dateFormat
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      Cell: dateFormat
    },
  ];


  const {
    data: contracts = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetContractsQuery();

  const actionButton = undefined//(<Button variant="primary" label="Add Contract" />)
   


  // const rowActions = useCallback(
  //   () => <Button variant="secondary" label="Action" size="small" />,
  //   [],
  // );


  //https://odyssey-storybook.okta.design/?path=/docs/labs-components-dataview--docs#data-handling-functions    
  const getData = useCallback(
    ({ filters, page, resultsPerPage, search, sort }: DataGetDataType) => {

      let filteredData = contracts;
      // if (filters) {
      //   filteredData = filteredData.filter((row) =>
      //     filters.every((filter) => {
      //       // Implement filter logic here
      //     }),
      //   );
      // }

      if (sort && sort.length > 0) {
        filteredData.sort((a, b) => {
          return a.name.localeCompare(b.name);
          // Implement sorting logic here
        });
      }

      // Apply pagination
      if (page && resultsPerPage) {
        const startIndex = (page - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        return filteredData.slice(startIndex, endIndex);
      }
      return filteredData;
    },
    [contracts],
  );

  let content: React.ReactNode

  // Show loading states based on the hook status flags
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess) {
    content = <DataView
      availableLayouts={["table"]}
      getData={getData}
      hasFilters={true}
      tableLayoutOptions={{
        hasColumnResizing: true,
        columns: columns,
        //rowActionButtons: rowActions,
      }}
       additionalActionButton={actionButton}
    />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section>
      {content}
    </section>
  )
}

export function Contracts() {
  return (
    <div>

      <h3>Contracts</h3>

      <ContractsList />

    </div>

  );
}
