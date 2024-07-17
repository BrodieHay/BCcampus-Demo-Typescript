const baseUrl = `https://bctcsws.test.bayleaf.com/api/v1.2/agreementws`;

const getInstitutionsApi = async () => {
  try {
    let response = await fetch(`${baseUrl}/GetInstitutions`);

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getSubjectsApi = async (institutionId: number) => {
  try {
    let response = await fetch(
      `${baseUrl}/GetSubjects?institutionId=${institutionId}`
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getCourseNumbersApi = async (
  institutionId: number,
  subjectCode: string
) => {
  try {
    let response = await fetch(
      `${baseUrl}/GetSendingCourses?institutionId=${institutionId}&subjectCode=${subjectCode}`
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getTransferableCoursesApi = async (
  institutionId: number,
  subjectCode: string,
  courseNumber: string
) => {
  try {
    let response = await fetch(
      `${baseUrl}/SearchFrom?sender=${institutionId}&subjectCode=${subjectCode}&courseNumber=${courseNumber}`
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  getInstitutionsApi,
  getSubjectsApi,
  getCourseNumbersApi,
  getTransferableCoursesApi,
};
