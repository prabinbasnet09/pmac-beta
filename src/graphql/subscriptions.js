/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onCreateUser(filter: $filter, username: $username) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      facultyRecommendation
      personalStatement
      transcript
      amcasForm
      applicantForm
      applicantReleaseForm
      schedule
      evaluators
      assignedApplicants
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onUpdateUser(filter: $filter, username: $username) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      facultyRecommendation
      personalStatement
      transcript
      amcasForm
      applicantForm
      applicantReleaseForm
      schedule
      evaluators
      assignedApplicants
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onDeleteUser(filter: $filter, username: $username) {
      id
      username
      email
      name
      groups
      verified
      profilePicture
      facultyRecommendation
      personalStatement
      transcript
      amcasForm
      applicantForm
      applicantReleaseForm
      schedule
      evaluators
      assignedApplicants
      createdAt
      updatedAt
    }
  }
`;
export const onCreateApplicantForm = /* GraphQL */ `
  subscription OnCreateApplicantForm(
    $filter: ModelSubscriptionApplicantFormFilterInput
    $userId: String
  ) {
    onCreateApplicantForm(filter: $filter, userId: $userId) {
      userId
      firstName
      lastName
      date
      cwid
      cellPhone
      country
      streetAddress
      city
      state
      zipCode
      email
      alternativeEmail
      major
      minor
      gpa
      expectedGraduation
      entranceDate
      entryExams
      examDate
      schoolApplication
      applicationID
      facultyEvaluators
      involvement
      workExperience
      fieldExperience
      honors
      labResearch
      volunteer
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateApplicantForm = /* GraphQL */ `
  subscription OnUpdateApplicantForm(
    $filter: ModelSubscriptionApplicantFormFilterInput
    $userId: String
  ) {
    onUpdateApplicantForm(filter: $filter, userId: $userId) {
      userId
      firstName
      lastName
      date
      cwid
      cellPhone
      country
      streetAddress
      city
      state
      zipCode
      email
      alternativeEmail
      major
      minor
      gpa
      expectedGraduation
      entranceDate
      entryExams
      examDate
      schoolApplication
      applicationID
      facultyEvaluators
      involvement
      workExperience
      fieldExperience
      honors
      labResearch
      volunteer
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteApplicantForm = /* GraphQL */ `
  subscription OnDeleteApplicantForm(
    $filter: ModelSubscriptionApplicantFormFilterInput
    $userId: String
  ) {
    onDeleteApplicantForm(filter: $filter, userId: $userId) {
      userId
      firstName
      lastName
      date
      cwid
      cellPhone
      country
      streetAddress
      city
      state
      zipCode
      email
      alternativeEmail
      major
      minor
      gpa
      expectedGraduation
      entranceDate
      entryExams
      examDate
      schoolApplication
      applicationID
      facultyEvaluators
      involvement
      workExperience
      fieldExperience
      honors
      labResearch
      volunteer
      createdAt
      updatedAt
    }
  }
`;
export const onCreateApplicantReleaseForm = /* GraphQL */ `
  subscription OnCreateApplicantReleaseForm(
    $filter: ModelSubscriptionApplicantReleaseFormFilterInput
    $userId: String
  ) {
    onCreateApplicantReleaseForm(filter: $filter, userId: $userId) {
      userId
      authorizeRelease
      allowEvaluation
      allowAdvertising
      fullName
      cwid
      signature
      date
      schoolDetails
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateApplicantReleaseForm = /* GraphQL */ `
  subscription OnUpdateApplicantReleaseForm(
    $filter: ModelSubscriptionApplicantReleaseFormFilterInput
    $userId: String
  ) {
    onUpdateApplicantReleaseForm(filter: $filter, userId: $userId) {
      userId
      authorizeRelease
      allowEvaluation
      allowAdvertising
      fullName
      cwid
      signature
      date
      schoolDetails
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteApplicantReleaseForm = /* GraphQL */ `
  subscription OnDeleteApplicantReleaseForm(
    $filter: ModelSubscriptionApplicantReleaseFormFilterInput
    $userId: String
  ) {
    onDeleteApplicantReleaseForm(filter: $filter, userId: $userId) {
      userId
      authorizeRelease
      allowEvaluation
      allowAdvertising
      fullName
      cwid
      signature
      date
      schoolDetails
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFacultyRecommendationForm = /* GraphQL */ `
  subscription OnCreateFacultyRecommendationForm(
    $filter: ModelSubscriptionFacultyRecommendationFormFilterInput
    $userId: String
  ) {
    onCreateFacultyRecommendationForm(filter: $filter, userId: $userId) {
      userId
      facultyEmail
      applicantName
      date
      evaluatorName
      intellectual
      motivation
      initiative
      personal
      emotional
      dependability
      leadership
      character
      verbal
      studentCapacity
      majorStrength
      weaknesses
      comments
      potential
      agreement
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFacultyRecommendationForm = /* GraphQL */ `
  subscription OnUpdateFacultyRecommendationForm(
    $filter: ModelSubscriptionFacultyRecommendationFormFilterInput
    $userId: String
  ) {
    onUpdateFacultyRecommendationForm(filter: $filter, userId: $userId) {
      userId
      facultyEmail
      applicantName
      date
      evaluatorName
      intellectual
      motivation
      initiative
      personal
      emotional
      dependability
      leadership
      character
      verbal
      studentCapacity
      majorStrength
      weaknesses
      comments
      potential
      agreement
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFacultyRecommendationForm = /* GraphQL */ `
  subscription OnDeleteFacultyRecommendationForm(
    $filter: ModelSubscriptionFacultyRecommendationFormFilterInput
    $userId: String
  ) {
    onDeleteFacultyRecommendationForm(filter: $filter, userId: $userId) {
      userId
      facultyEmail
      applicantName
      date
      evaluatorName
      intellectual
      motivation
      initiative
      personal
      emotional
      dependability
      leadership
      character
      verbal
      studentCapacity
      majorStrength
      weaknesses
      comments
      potential
      agreement
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFacultyNotes = /* GraphQL */ `
  subscription OnCreateFacultyNotes(
    $filter: ModelSubscriptionFacultyNotesFilterInput
  ) {
    onCreateFacultyNotes(filter: $filter) {
      facultyEmail
      userId
      date
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFacultyNotes = /* GraphQL */ `
  subscription OnUpdateFacultyNotes(
    $filter: ModelSubscriptionFacultyNotesFilterInput
  ) {
    onUpdateFacultyNotes(filter: $filter) {
      facultyEmail
      userId
      date
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFacultyNotes = /* GraphQL */ `
  subscription OnDeleteFacultyNotes(
    $filter: ModelSubscriptionFacultyNotesFilterInput
  ) {
    onDeleteFacultyNotes(filter: $filter) {
      facultyEmail
      userId
      date
      notes
      createdAt
      updatedAt
    }
  }
`;
