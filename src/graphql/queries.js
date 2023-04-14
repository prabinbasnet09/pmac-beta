/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudentDocuments = /* GraphQL */ `
  query GetStudentDocuments($id: ID!) {
    getStudentDocuments(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getApplicantForm = /* GraphQL */ `
  query GetApplicantForm($userId: String!) {
    getApplicantForm(userId: $userId) {
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
export const listApplicantForms = /* GraphQL */ `
  query ListApplicantForms(
    $userId: String
    $filter: ModelApplicantFormFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listApplicantForms(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getApplicantReleaseForm = /* GraphQL */ `
  query GetApplicantReleaseForm($userId: String!) {
    getApplicantReleaseForm(userId: $userId) {
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
export const listApplicantReleaseForms = /* GraphQL */ `
  query ListApplicantReleaseForms(
    $userId: String
    $filter: ModelApplicantReleaseFormFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listApplicantReleaseForms(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getFacultyRecommendationForm = /* GraphQL */ `
  query GetFacultyRecommendationForm($userId: String!) {
    getFacultyRecommendationForm(userId: $userId) {
      userId
      applicantName
      signature
      evaluatorName
      applicantObservation
      applicantStrength
      applicantWeakness
      applicantPotential
      additionalComments
      evaluatorSignature
      date
      createdAt
      updatedAt
    }
  }
`;
export const listFacultyRecommendationForms = /* GraphQL */ `
  query ListFacultyRecommendationForms(
    $userId: String
    $filter: ModelFacultyRecommendationFormFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFacultyRecommendationForms(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        applicantName
        signature
        evaluatorName
        applicantObservation
        applicantStrength
        applicantWeakness
        applicantPotential
        additionalComments
        evaluatorSignature
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;