/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onVerifyUser = /* GraphQL */ `
  mutation OnVerifyUser($input: VerifyUserInput!) {
    onVerifyUser(input: $input) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      fileURL
      personalStatement
      transcript
      amcasForm
      createdAt
      updatedAt
    }
  }
`;
export const changePersonalStatement = /* GraphQL */ `
  mutation ChangePersonalStatement($input: ChangePersonalStatementInput!) {
    changePersonalStatement(input: $input) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      fileURL
      personalStatement
      transcript
      amcasForm
      createdAt
      updatedAt
    }
  }
`;
export const changeFileURL = /* GraphQL */ `
  mutation ChangeFileURL($input: ChangeFileURLInput!) {
    changeFileURL(input: $input) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      fileURL
      personalStatement
      transcript
      amcasForm
      createdAt
      updatedAt
    }
  }
`;
export const changeTranscript = /* GraphQL */ `
  mutation ChangeTranscript($input: ChangeTranscriptInput!) {
    changeTranscript(input: $input) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      fileURL
      personalStatement
      transcript
      amcasForm
      createdAt
      updatedAt
    }
  }
`;
export const changeProfilePicture = /* GraphQL */ `
  mutation ChangeProfilePicture($input: ChangeProfilePictureInput!) {
    changeProfilePicture(input: $input) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      fileURL
      personalStatement
      transcript
      amcasForm
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      fileURL
      personalStatement
      transcript
      amcasForm
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      fileURL
      personalStatement
      transcript
      amcasForm
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      fileURL
      personalStatement
      transcript
      amcasForm
      createdAt
      updatedAt
    }
  }
`;
export const createApplicantForm = /* GraphQL */ `
  mutation CreateApplicantForm(
    $input: CreateApplicantFormInput!
    $condition: ModelApplicantFormConditionInput
  ) {
    createApplicantForm(input: $input, condition: $condition) {
      userId
      fullName
      cwid
      cellPhone
      email
      major
      minor
      createdAt
      updatedAt
    }
  }
`;
export const updateApplicantForm = /* GraphQL */ `
  mutation UpdateApplicantForm(
    $input: UpdateApplicantFormInput!
    $condition: ModelApplicantFormConditionInput
  ) {
    updateApplicantForm(input: $input, condition: $condition) {
      userId
      fullName
      cwid
      cellPhone
      email
      major
      minor
      createdAt
      updatedAt
    }
  }
`;
export const deleteApplicantForm = /* GraphQL */ `
  mutation DeleteApplicantForm(
    $input: DeleteApplicantFormInput!
    $condition: ModelApplicantFormConditionInput
  ) {
    deleteApplicantForm(input: $input, condition: $condition) {
      userId
      fullName
      cwid
      cellPhone
      email
      major
      minor
      createdAt
      updatedAt
    }
  }
`;
