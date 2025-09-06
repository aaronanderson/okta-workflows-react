
import { useCallback } from "react";
import { DataView, DataGetDataType, DataColumns } from "@okta/odyssey-react-mui/labs";
import { ResourceAccess, Application, EntitlementBundle, useGetAccessQuery } from "../apiSlice";
import { Button } from "@okta/odyssey-react-mui";

export const AccessList = () => {

  const columns: DataColumns<ResourceAccess> = [
    {
      accessorKey: "login",
      header: "Login",      
    },
     {
      accessorKey: "contractNumber",
      header: "Contract Number",      
    },
    {
      accessorKey: "application",
      header: "Application", 
      Cell: ({ cell }) => cell.getValue<Application>().name
    },
    {
      accessorKey: "bundles",
      header: "Bundles",
      Cell: ({ cell, row }) => <div>{cell.getValue<EntitlementBundle[]>().map((e)=><>{e.name}<br/></>)}</div>
    },
    
  ];


  const {
    data: access = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAccessQuery();

  const actionButton = undefined//(<Button variant="primary" label="Add Contract" />)
   


  // const rowActions = useCallback(
  //   () => <Button variant="secondary" label="Action" size="small" />,
  //   [],
  // );


  //https://odyssey-storybook.okta.design/?path=/docs/labs-components-dataview--docs#data-handling-functions    
  const getData = useCallback(
    ({ filters, page, resultsPerPage, search, sort }: DataGetDataType) => {

      let filteredData = access;
      // if (filters) {
      //   filteredData = filteredData.filter((row) =>
      //     filters.every((filter) => {
      //       // Implement filter logic here
      //     }),
      //   );
      // }

      if (sort && sort.length > 0) {
        filteredData.sort((a, b) => {
          return a.login.localeCompare(b.login);
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
    [access],
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

export function Access() {
    return (
      <div>
  
        <h3>Access</h3>

           <AccessList />
      </div>
  
    );
  }
  