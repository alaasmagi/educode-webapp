import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import AttendanceCheckData from "../models/AttendanceCheckData";
import ToSixDigit from "../helpers/NumberConverter";
import { useTranslation } from "react-i18next";
import { CourseAttendance } from "../models/CourseAttendanceModel";

interface PDFDocumentProperties {
  attendanceChecks: AttendanceCheckData[];
  attendanceData: CourseAttendance;
}

const PDFDocument: React.FC<PDFDocumentProperties> = ({ attendanceChecks, attendanceData }) => {
  const { t } = useTranslation();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{t("course-name") + `: ${attendanceData.courseName}`}</Text>
          <Text style={styles.title}>{t("course-code") + `: ${attendanceData.courseCode}`}</Text>
          <Text style={styles.title}>{t("date") + `: ${attendanceData.date}`}</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerText, styles.colNumber]}></Text>
            <Text style={[styles.cell, styles.headerText, styles.colStudent]}>{t("student")}</Text>
            <Text style={[styles.cell, styles.headerText, styles.colWorkplace]}>{t("workplace")}</Text>
          </View>

          {attendanceChecks?.map((attendanceCheck, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cell, styles.colNumber]}>{(index + 1) + "."}</Text>
              <Text style={[styles.cell, styles.colStudent]}>{attendanceCheck.studentCode}</Text>
              <Text style={[styles.cell, styles.colWorkplace]}>
                {attendanceCheck.workplaceId == null
                  ? t("no-workplace")
                  : ToSixDigit(Number(attendanceCheck.workplaceId))}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    marginTop: 20,
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 3,
    borderBottom: "0.5px solid #ccc",
  },
  cell: {
    paddingRight: 2,
  },
  colNumber: {
    width:"5%",
  },
  colStudent: {
    width: "25%",
  },
  colWorkplace: {
    width: "25%",
  },
  headerText: {
    fontWeight: "bold",
  },
});
