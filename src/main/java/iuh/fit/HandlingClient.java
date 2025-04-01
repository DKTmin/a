package iuh.fit;

import iuh.fit.dao.DoctorDAO;
import iuh.fit.entity.Doctor;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class HandlingClient implements Runnable {
    private Socket socket;
    private DoctorDAO doctorDAO;

    public HandlingClient(Socket socket) {
        this.socket = socket;
        this.doctorDAO = new DoctorDAO();
    }

    @Override
    public void run() {
        try (
                ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream in = new ObjectInputStream(socket.getInputStream());
        ) {
            while (true) {
                String command = in.readUTF();
                switch (command) {
                    case "FIND_DOCTOR" -> {
                        String doctorID = in.readUTF();
                        out.writeObject(doctorDAO.findDoctorById(doctorID));
                        out.flush();
                    }
                    case "EXIT" -> {
                        System.out.println("Client disconnected");
                        return;
                    }
                    case "ADD_NEW_DOCTOR" -> {
                        Doctor newdoctor = (Doctor) in.readObject();
                        System.out.println("Nhan bac si moi: " + newdoctor);
                        boolean result = doctorDAO.addDoctor(newdoctor);
                        out.writeBoolean(result);
                        out.flush();
                    }
                    case "THONG_KE_SPECIALITY" -> {
                        String departmentName = in.readUTF();
                        out.writeObject(doctorDAO.getNoOfDoctorsBySpeciality(departmentName));
                        out.flush();
                    }
                    case "SEARCH_DOCTOR_BY_SPECIALITY" -> {
                        out.writeObject(doctorDAO.listDoctorsBySpeciality(in.readUTF()));
                        out.flush();
                    }
                    case "UPDATE_DIAGNOSIS" -> {
                        String patientId = in.readUTF();
                        String doctorId = in.readUTF();
                        String diagnosis = in.readUTF();

                        boolean result = doctorDAO.updateDiagnosis(patientId, doctorId, diagnosis);

                        out.writeBoolean(result);
                        out.flush();
                    }
                    case "DELETE_DOCTOR_BY_ID" -> {
                        String doctorID = in.readUTF();

                        boolean result = doctorDAO.deleteDoctor(doctorID);
                        out.writeBoolean(result);
                        out.flush();
                    }
                    default -> {
                        System.out.println("Unknown command: " + command);
                        out.writeObject("Unknown command");
                        out.flush();
                    }
                }
            }

        } catch (Exception e) {
            System.err.println("Error handling client: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (Exception e) {
                System.err.println("Error closing socket: " + e.getMessage());
            }
        }
    }
}