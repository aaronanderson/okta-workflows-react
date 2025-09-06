import React, { FormEvent, SyntheticEvent, useRef, useState } from "react";
import { Contract, Person, useCreatePersonMutation, useGetContractsQuery, useGetPeopleQuery } from "../apiSlice";
import { Form, Autocomplete, Button, TextField, Callout, calloutRoleValues, calloutSeverityValues } from "@okta/odyssey-react-mui";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./../../app.module.css";


export interface CalloutStatus {
  role: (typeof calloutRoleValues)[number]
  severity: (typeof calloutSeverityValues)[number]
  title: string
  text: string
}



export function PersonView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;

  let [calloutStatus, setCalloutStatus] = useState<CalloutStatus | undefined>(undefined);


  const [contractOptions, setContractOptions] = useState<any[]>([]);
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [contractError, setContractError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [complete, setComplete] = useState(false);
  const {
    data: contracts = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetContractsQuery();

  if (isSuccess && contractOptions.length == 0) {
    setContractOptions(contracts.map((c: Contract) => ({ ...c, label: c.contractNumber + " - " + c.name })));
  }

  const [createPerson, { isLoading: isLoading2 }] = useCreatePersonMutation();

  const handleReset = () => {

  }



  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default browser form submission
    //const { elements }: {elements: any} = event.currentTarget;
    //const contractNumber2 = elements.contractNumber.value;

    let valid = true;
    if (!contract) {
      setContractError("Contract Number is required");
      valid = false;
    }
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    }
    if (!firstName) {
      setFirstNameError("First Name is required");
      valid = false;
    }
    if (!lastName) {
      setLastNameError("Last Name is required");
      valid = false;
    }
    if (valid && contract) {
      const result = await createPerson({
        contractId: contract.id,
        email: email,
        firstName: firstName,
        lastName: lastName
      });
      console.log(result);
      setCalloutStatus({ role: "status", severity: "success", title: "Person Created", text: `${firstName} ${lastName} successfully created.` });
      setComplete(true);
    } else {
      setCalloutStatus({ role: "alert", severity: "error", title: "Form is invalid!", text: "Please check the fields..." });

    }

  }
  console.log(contract);
  let content: React.ReactNode

  if (userId) {

  } else {

    content = (
      <>
        <Form name="new-person" noValidate onSubmit={handleSubmit}
          alert={calloutStatus ? <Callout role={calloutStatus.role} severity={calloutStatus.severity} title={calloutStatus.title}>{calloutStatus.text}</Callout> : undefined}
          formActions={<><Button label="Reset" variant="secondary" onClick={handleReset} isDisabled={!!complete} /><Button label="Submit" type="submit" variant="primary" isDisabled={!!complete} /></>}
          title="New Person">
          <div className={styles.formFields}>

            <Autocomplete
              hint="Select a contract number."
              id="contractNumber"
              label="Contract Number"
              onChange={(_, value: Contract) => { setContract(value); setContractError(""); setCalloutStatus(undefined); }}
              errorMessage={contractError}
              options={contractOptions}
            />

            {contract? 
            (<dl>
              <dt>Start Date</dt>
              <dd>{new Date(contract.startDate).toLocaleDateString()}</dd>
              <dt>End Date</dt>
              <dd>{new Date(contract.endDate).toLocaleDateString()}</dd>
            </dl>): undefined}


            <TextField
              autoCompleteType="work email"
              defaultValue=""
              label="Email"
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); setCalloutStatus(undefined); }}
              errorMessage={emailError}
            />

            <TextField
              defaultValue=""
              label="First Name"
              onChange={(e) => { setFirstName(e.target.value); setFirstNameError(""); setCalloutStatus(undefined); }}
              errorMessage={firstNameError}
            />

            <TextField
              defaultValue=""
              label="Last Name"
              onChange={(e) => { setLastName(e.target.value); setLastNameError(""); setCalloutStatus(undefined); }}
              errorMessage={lastNameError}
            />
          </div>
        </Form>
      </>



    )
  }
  return (
    <div>
      {content}
    </div>

  );
}



