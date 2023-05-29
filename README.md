![](https://github.com/HealthTech-Devs/PMAC-healthtech-devs/blob/develop/HTD.jpg)

# PMAC Application Management System

The PMAC Application Management System is a comprehensive web and mobile application designed to streamline the process of applying to medical school and health care professional post-baccalaureate programs. It aims to simplify communication, scheduling, and document management between candidates and the Pre-Medical Advisory Committee (PMAC) at the University of Louisiana at Monroe (ULM).

## Key Features

- **Application Management:** The system provides candidates with a user-friendly interface to enter their application information and track their progress, ensuring that all necessary details are submitted accurately and efficiently.

- **Scheduling:** Committee members can submit their available interview times through an intuitive mechanism, and the committee chair can schedule candidate interviews based on the availability of both parties. This feature helps optimize the interview process and facilitates effective coordination.

- **Communication and Status Monitoring:** Candidates and committee members have access to a personalized dashboard that enables seamless communication and real-time monitoring of application status. This ensures that all stakeholders stay informed and updated throughout the application process.

- **Account Management:** The system includes features such as email verification, password authentication, and password reset options to ensure secure access and protect sensitive user information.

## Technology Stack

- **Backend**: AWS Amplify, AWS Lambda, AWS Cognito, Node.js
- **Frontend**: Next.js 13, Tailwind CSS, Material UI, JavaScript
- **Database**: DynamoDB
- **API**: AWS AppSync Graphql, AWS REST API
- **Cloud Platform**: AWS (Amazon Web Services)

<br />

## Users / Actors

There are <b>five users </b> with different level of access within the application:

1. **Admin**: Admin has the most privilege among all the users. Admin can uplift or downgrade the privilege of other users. Admin can also delete or verify user accounts.
2. **Chair Committee**: Chair Committee are second to the privileges after Admin. Chair Commitee can view the information of all the other users below it. They are privileged with handling applicants and their applications. Also, they can leverage the scheduling algorithms to schedule applicants automatically.
3. **Committee Memeber**: Committee members have less privilege as compared to Chair Committee. They can only view the applicant's information, which can also be restricted by Chair Committee.
4. **Applicants**: Applicants are generally the students or alumni that submit applications to the committee and get scheduled for interviews.
5. **Guest User**: Guest users are the faculty members of ULM that are not in the committee but are assigned by applicants to fill up recommendation forms on their behalf. They will get access to the application/forms through temporary tokens.
   <br />

## Credentials to access Web Application

Access the application by visiting `https://pmac-beta.vercel.app` in your web browser.

The following credentials can be used to view and interact with the UI designed for each user besides Admin:

- **Chair Committee**:

  - **Username**: chair_committee
  - **Password**: healthtechdev

- **Committee Member**:

  - **Username**: faculty
  - **Password**: healthtechdev

- **Applicant**:

  - **Username**: student
  - **Password**: healthtechdev

<br />

## Installation and Deployment

To deploy the PMAC Application Management System locally, follow these steps:

1. Clone the repository: git clone https://github.com/prabinbasnet09/pmac-beta
2. Install the required dependencies: npm install
3. Configure the necessary environment variables, such as database credentials and API keys.
4. Run the application: npm run dev or npm start

5. Access the application by visiting `http://localhost:3000` in your web browser.

For detailed deployment instructions and additional customization options, please refer to the [documentation](docs/deployment.md) provided.

## Contributions

Contributions to the PMAC Application Management System are welcome! If you have any suggestions, bug reports, or feature requests, please submit an issue or open a pull request. We appreciate your feedback and collaboration to make this system more robust and efficient.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the codebase as per your requirements.

## Contact

For any inquiries or further information, please contact Prabin Basnet at [prabinbasnet09@gmail.com](mailto:prabinbasnet09@gmail.com).
