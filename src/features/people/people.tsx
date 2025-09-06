import { useCallback } from "react";
import { DataView, DataGetDataType, DataColumns, TableLayoutProps } from "@okta/odyssey-react-mui/labs";
import { Person, useGetPeopleQuery } from "../apiSlice";
import { Button, MenuItem } from "@okta/odyssey-react-mui";
import { useNavigate } from "react-router-dom";



export const PeopleList = () => {

  const navigate = useNavigate();

  const columns: DataColumns<Person> = [
    {
      accessorKey: "login",
      header: "Okta Login",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "contracts",
      header: "Contracts",
      Cell: ({ cell }) => <div>{cell.getValue<string[]>().map(e=> <p key={e}>{e}</p>)}</div>
    },

  ];


  const {
    data: people = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPeopleQuery();

  const actionButton = <Button variant="primary" label="Add Person" onClick={()=>navigate("/person",{ state: { userId: undefined} })}/>

    const actionMenuItems: TableLayoutProps<Person>["rowActionMenuItems"] = (
      selectedRows,
    ) => (
      <>
        <MenuItem onClick={() => console.log(selectedRows)}>Add Contract</MenuItem>
        <MenuItem onClick={() => console.log(selectedRows)}>Remove Contract</MenuItem>
        <MenuItem onClick={() => console.log(selectedRows)}>Deactivate</MenuItem>
      </>
    );

  //https://odyssey-storybook.okta.design/?path=/docs/labs-components-dataview--docs#data-handling-functions    
  const getData = useCallback(
    ({ filters, page, resultsPerPage, search, sort }: DataGetDataType) => {

      let filteredData = people;
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
    [people],
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
        rowActionMenuItems: actionMenuItems
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

export function People() {
  return (
    <div>

      <h3>People</h3>

      <PeopleList />

    </div>

  );
}



