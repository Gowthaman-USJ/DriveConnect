package com.driveconnect.DrivingSchoolManagement.service;


import com.driveconnect.DrivingSchoolManagement.dto.LoginResponse;
import com.driveconnect.DrivingSchoolManagement.entity.DrivingSchool;
import com.driveconnect.DrivingSchoolManagement.entity.Instructor;
import com.driveconnect.DrivingSchoolManagement.entity.Login;
import com.driveconnect.DrivingSchoolManagement.repository.DrivingSchoolRepository;
import com.driveconnect.DrivingSchoolManagement.repository.InstructorRepository;
import com.driveconnect.DrivingSchoolManagement.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private InstructorRepository instructorPortalRepository;

    @Autowired
    private DrivingSchoolRepository drivingSchoolRepository;

    public LoginResponse login(String email, String password){

        Login user = loginRepository.findByEmail(email);


        if(user != null && user.getPassword().equals(password)){

            LoginResponse response = new LoginResponse();

            response.setLoginID(user.getLoginID());
            response.setEmail(user.getEmail());
            response.setUserRole(String.valueOf(user.getUserRole()));


            if(user.getUserRole() == Login.UserRole.Instructor){

                Instructor instructor =
                        instructorPortalRepository.findByLogin_LoginID(user.getLoginID());

                response.setInsID(
                        instructor.getInsID()
                );
            }

            else if(user.getUserRole() == Login.UserRole.DrivingSchool){

                DrivingSchool drivingSchool =
                        drivingSchoolRepository.findByLogin_LoginID(user.getLoginID());

                response.setDsID(
                        drivingSchool.getDsID()
                );
            }


            return response;
        }


        return null;
    }
}

