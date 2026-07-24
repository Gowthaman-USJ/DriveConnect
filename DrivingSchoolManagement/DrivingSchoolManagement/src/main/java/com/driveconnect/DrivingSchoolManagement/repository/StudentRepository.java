package com.driveconnect.DrivingSchoolManagement.repository;

import com.driveconnect.DrivingSchoolManagement.entity.Instructor;
import com.driveconnect.DrivingSchoolManagement.entity.Schedule;
import com.driveconnect.DrivingSchoolManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StudentRepository extends JpaRepository<Student,Integer>{

    Student findByUser_UserID(Integer userID);

    int countByInstructorInsID(
            int insID
    );

    List<Student> findByInstructor_InsID(int insID);

    int countByDrivingSchoolDsID(
            int dsID
    );

    List<Student> findByDrivingSchoolDsID(
            int dsID
    );


}
