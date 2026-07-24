package com.driveconnect.DrivingSchoolManagement.repository;

import com.driveconnect.DrivingSchoolManagement.entity.Schedule;
import com.driveconnect.DrivingSchoolManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule,Integer> {

    int countByInstructorInsIDAndDate(
            int insID,
            LocalDate date
    );

    int countByDrivingSchoolDsIDAndDate(
            int dsID,
            LocalDate date
    );

    List<Schedule> findByDrivingSchool_DsIDOrderByTimeAsc(
            int dsID
    );

    void deleteByInstructor_InsID(int insID);

    void deleteByStudent_StuID(int stuID);

    List<Schedule> findByInstructor_InsIDOrderByTimeAsc(int insID);

    @Query("SELECT COUNT(s) FROM Schedule s WHERE s.student.stuID = :studentId")
    long countLessonsByStudent(@Param("studentId") int studentId);
}
