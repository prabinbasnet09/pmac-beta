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
<<<<<<< HEAD
      facultyRecommendation
      personalStatement
      transcript
      amcasForm
      applicantForm
      applicantReleaseForm
      schedule
=======
      fileURL
      personalStatement
      transcript
      amcasForm
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
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
<<<<<<< HEAD
      facultyRecommendation
      personalStatement
      transcript
      amcasForm
      applicantForm
      applicantReleaseForm
      schedule
=======
      fileURL
      personalStatement
      transcript
      amcasForm
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
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
<<<<<<< HEAD
      facultyRecommendation
      personalStatement
      transcript
      amcasForm
      applicantForm
      applicantReleaseForm
      schedule
=======
      fileURL
      personalStatement
      transcript
      amcasForm
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
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
<<<<<<< HEAD
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
=======
      fullName
      cwid
      cellPhone
      email
      major
      minor
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
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
<<<<<<< HEAD
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
=======
      fullName
      cwid
      cellPhone
      email
      major
      minor
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
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
<<<<<<< HEAD
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
export const onUpdateFacultyRecommendationForm = /* GraphQL */ `
  subscription OnUpdateFacultyRecommendationForm(
    $filter: ModelSubscriptionFacultyRecommendationFormFilterInput
    $userId: String
  ) {
    onUpdateFacultyRecommendationForm(filter: $filter, userId: $userId) {
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
export const onDeleteFacultyRecommendationForm = /* GraphQL */ `
  subscription OnDeleteFacultyRecommendationForm(
    $filter: ModelSubscriptionFacultyRecommendationFormFilterInput
    $userId: String
  ) {
    onDeleteFacultyRecommendationForm(filter: $filter, userId: $userId) {
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
=======
      fullName
      cwid
      cellPhone
      email
      major
      minor
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
      createdAt
      updatedAt
    }
  }
`;
