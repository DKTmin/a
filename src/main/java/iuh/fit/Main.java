package iuh.fit;

import iuh.fit.dao.DoctorDAO;
import iuh.fit.entity.Doctor;

public class Main {
        public static void main(String[] args) {
            System.out.println("Hello word");

            DoctorDAO dao = new DoctorDAO();
            System.out.println(dao.findDoctorById("DR.001"));

        }
    }