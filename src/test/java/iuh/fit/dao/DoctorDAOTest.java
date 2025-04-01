package iuh.fit.dao;

import iuh.fit.entity.Doctor;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DoctorDAOTest {
    private DoctorDAO doctorDAO;

    @BeforeAll
    void setup(){
        doctorDAO = new DoctorDAO();
    }

    @Test
    void findDoctorByIDTest(){
        Doctor doctor = doctorDAO.findDoctorById("DR.010");
        assertEquals("Daniel Rodriguez", doctor.getName());
        assertEquals("0567.890.123", doctor.getPhone());
        assertEquals("Ophthalmology and Optometry", doctor.getSpeciality());
    }

    @Test
    void findDoctorByIDNullTest(){
        Doctor doctor = doctorDAO.findDoctorById("DR.110");
        assertNull(doctor);
    }


    @AfterAll
    void tearDown(){
        doctorDAO = null;
    }
}
