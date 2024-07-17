import { useState, useEffect } from 'react';
import Institutions from './components/institutions';
import Subjects from './components/subjects';
import CourseNumbers from './components/courseNumbers';
import TransferableCourses from './components/transferableCourses';
import {
  getInstitutionsApi,
  getSubjectsApi,
  getCourseNumbersApi,
  getTransferableCoursesApi,
} from './api/bctcswsAPI';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import Grid from '@mui/material/Grid';
import { Subject } from './interfaces/Subject';
import { TransferableCourse } from './interfaces/TransferableCourse';
import { BCTransferAgreementValue } from './interfaces/BCTransferAgreement';
import { CourseNumber } from './interfaces/CourseNumber';
import { Institution } from './interfaces/Institution';

export default function App() {
  const [institutions, setInstitutions] = useState(Array<Institution>);
  const [subjects, setSubjects] = useState(Array<Subject>);
  const [courseNumbers, setCourseNumbers] = useState(Array<CourseNumber>);
  const [transferableCourses, setTransferableCourses] = useState(
    Array<TransferableCourse>
  );
  const [resetInstitutionKey, setResetInstitutionKey] = useState(false);
  const [resetSubjectKey, setResetSubjectKey] = useState(false);
  const [resetCourseNumberKey, setResetCourseNumberKey] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInstitutionChange = (value: BCTransferAgreementValue) => {
    setFormData({ institutionId: value.institutionId });

    setResetSubjectKey((prev) => !prev);
    setResetCourseNumberKey((prev) => !prev);
    if (value) {
      getSubjects(value.institutionId);
    }
  };

  const handleSubjectChange = (value: BCTransferAgreementValue) => {
    setFormData((prevFormData: BCTransferAgreementValue) => ({
      ...prevFormData,
      subjectCode: value,
    }));

    setResetCourseNumberKey((prev) => !prev);
    if (value) {
      getCourseNumbers(value.institutionId, value.subjectCode);
    }
  };

  const handleCourseNumberChange = (value: BCTransferAgreementValue) => {
    setFormData((prevFormData: BCTransferAgreementValue) => ({
      ...prevFormData,
      courseNumber: value,
    }));

    if (value) {
      getTransferableCourses(
        value.institutionId,
        value.subjectCode,
        value.courseNumber
      );
    }
  };

  useEffect(() => {
    getInstitutions();
  }, []);

  const getInstitutions = async () => {
    await getInstitutionsApi().then((data: string[]) => setInstitutions(data));
  };

  const getSubjects = async (institutionId: number) => {
    await getSubjectsApi(institutionId).then((data: Subject[]) =>
      setSubjects(data)
    );
  };

  const getCourseNumbers = async (
    institutionId: number,
    subjectCode: string
  ) => {
    await getCourseNumbersApi(institutionId, subjectCode).then(
      (data: CourseNumber[]) => setCourseNumbers(data)
    );
  };

  const getTransferableCourses = async (
    institutionId: number,
    subjectCode: string,
    courseNumber: string
  ) => {
    await getTransferableCoursesApi(
      institutionId,
      subjectCode,
      courseNumber
    ).then((data: TransferableCourse[]) => {
      data.filter((data) => {
        data.Detail.toLowerCase().trim() != 'no credit';
      });
      //Uncomment if you don't want credit values displayed, but it does mess with some data (more work would be required)
      //data.map((data) => {data.Detail = data.Detail.split('(')[0]});

      setTransferableCourses(data);
    });
  };

  const resetForm = () => {
    setFormData({
      institution: null,
      subject: null,
      courseNumber: null,
    });

    setResetInstitutionKey((prev) => !prev);
    setResetSubjectKey((prev) => !prev);
    setResetCourseNumberKey((prev) => !prev);
    setTransferableCourses([]);
  };

  return (
    <main>
      <Grid container spacing={2} columns={16}>
        <Grid item>
          <Institutions
            key={resetInstitutionKey}
            data={institutions}
            onChange={handleInstitutionChange}
          />
        </Grid>
        <Grid item>
          <Subjects
            key={resetSubjectKey}
            data={subjects}
            value={formData}
            onChange={handleSubjectChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CourseNumbers
            key={resetCourseNumberKey}
            data={courseNumbers}
            value={formData}
            onChange={handleCourseNumberChange}
          />
        </Grid>
        <Grid item>
          <Button variant="text" color="secondary" onClick={resetForm}>
            <ReplayIcon />
            Reset
          </Button>
        </Grid>
      </Grid>

      <br />
      <section className="course-container">
        <Typography variant="h6" gutterBottom>
          Transfers To
        </Typography>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {transferableCourses?.map(
            (transferableCourse: TransferableCourse) => (
              <Grid item>
                <TransferableCourses
                  key={transferableCourse.Id}
                  title={transferableCourse.RcvrInstitutionCode}
                  body={transferableCourse.Detail}
                />
              </Grid>
            )
          )}
        </Grid>
      </section>
      <br />
    </main>
  );
}
