package iuh.fit;

import iuh.fit.entity.Doctor;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class Client {

    public static void main(String[] args) {
        try (
                Socket socket = new Socket("MSI", 8080);
                ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream in = new ObjectInputStream(socket.getInputStream());
                Scanner sc = new Scanner(System.in);
        ) {
            System.out.println("Client khởi động");
            while (true){
                System.out.println("\n------MENU------");
                System.out.println("1. Tìm bác sĩ theo mã");
                System.out.println("2. Thoát");
                System.out.println("3. Thêm bác sĩ");
                System.out.println("4. Thống kê bác sĩ theo chuyên khoa ");
                System.out.println("5. Tìm bác sĩ theo chuyên khoa");
                System.out.println("6. Cập nhật chuẩn đoán");
                System.out.println("7. Xóa Bác Sĩ theo ID");
                System.out.println("Vui Lòng Nhập Đúng Yêu Cầu: ");
                int chon  = sc.nextInt();
                sc.nextLine();
                switch (chon){
                    case 1: findDoctorById(out, in, sc);

                        break;
                    case 2:
                        out.writeUTF("EXIT");
                        out.flush();
                        System.out.println("Client ngắt kết nối");
                        return;
                    case 3:
                        addDoctor(out, in, sc);
                        break;
                    case 4:
                        countDoctorsBySpeciality(out, in, sc);
                        break;
                    case 5:
                        searchDoctorsBySpeciality(out, in, sc);
                        break;
                    case 6:
                        updatediagnosis(out, in, sc);
                        break;
                    case 7:
                        xoaBacSiTheoID(out, in, sc);
                        break;
                    default:
                        System.out.println("Chọn không hợp lệ");
                        break;
                }


            }
        } catch (Exception e) {
            System.err.println("Lỗi: " + e.getMessage());
        }
    }

    // Tìm bác sĩ
    private static void findDoctorById(ObjectOutputStream out, ObjectInputStream in, Scanner sc) throws Exception {
        out.writeUTF("FIND_DOCTOR");

        System.out.print("Nhập mã bác sĩ cần tìm: ");
        String doctorID = sc.nextLine();
        out.writeUTF(doctorID);
        out.flush();

        Doctor doctor = (Doctor) in.readObject();
        if (doctor != null) {
            System.out.println("\nThông tin bác sĩ:");
            System.out.println(doctor);
        } else {
            System.out.println("Không tìm thấy bác sĩ với ID: " + doctorID);
        }
    }

//    3. Thêm bác sĩ"
        public static void addDoctor(ObjectOutputStream out, ObjectInputStream in, Scanner sc) throws Exception{
            out.writeUTF("ADD_NEW_DOCTOR");
            System.out.println("Ma bac si: ");
            String doctorID = sc.nextLine();
            System.out.println("Ten bac si: ");
            String name = sc.nextLine();
            System.out.println("So dien thoai: ");
            String sdt = sc.nextLine();
            System.out.println("Phong ban: ");
            String phongban = sc.nextLine();

            Doctor doctor = new Doctor(doctorID, name, sdt, phongban);
            out.writeObject(doctor);
            out.flush();

            boolean result = in.readBoolean();
            System.out.println(result ? "\nThem thanh cong" : "Them that bai");

        }

//    4. Thống kê bác sĩ theo chuyên khoa
        private static void countDoctorsBySpeciality(ObjectOutputStream out, ObjectInputStream in, Scanner sc) throws Exception {
            out.writeUTF("THONG_KE_SPECIALITY");
            System.out.print("Nhập tên phòng ban thống kê: ");
            String departmentName = sc.nextLine();
            out.writeUTF(departmentName);
            out.flush();
            Map<String, Long> res = (Map<String, Long>) in.readObject();
            System.out.println("\nThống kê số lượng bác sĩ theo chuyên khoa:");
            res.forEach((k, v) -> System.out.println( "Khoa " + k + ": " + v + " bác sĩ"));
        }

//    5. Tìm bác sĩ theo chuyên khoa"
        private static void searchDoctorsBySpeciality(ObjectOutputStream out, ObjectInputStream in, Scanner sc) throws Exception {
            out.writeUTF("SEARCH_DOCTOR_BY_SPECIALITY");
            System.out.print("Nhập từ khóa chuyên khoa: ");
            String keyword = sc.nextLine();
            out.writeUTF(keyword);
            out.flush();

            List<Doctor> doctors = (List<Doctor>) in.readObject();
            System.out.println("\nKết quả tìm kiếm:");
            if (doctors.isEmpty()) {
                System.out.println("Không tìm thấy bác sĩ nào phù hợp");
            } else {
                doctors.forEach(System.out::println);
            }
        }
//    6. Cập nhật chuẩn đoán
        private static void updatediagnosis(ObjectOutputStream out, ObjectInputStream in, Scanner sc) throws Exception {
            out.writeUTF("UPDATE_DIAGNOSIS");

            System.out.print("Enter Patient ID: ");
            String patientId = sc.nextLine();
            out.writeUTF(patientId);

            System.out.print("Enter Doctor ID: ");
            String doctorId = sc.nextLine();
            out.writeUTF(doctorId);

            System.out.print("Enter New Diagnosis: ");
            String newDiagnosis = sc.nextLine();
            out.writeUTF(newDiagnosis);
            out.flush();

            boolean isUpdated = in.readBoolean();
            if (isUpdated) {
                System.out.println("Diagnosis updated successfully!");
            } else {
                System.out.println("Failed to update diagnosis!");
            }
        }
//     7. Xóa Bác Sĩ theo ID
    public static void xoaBacSiTheoID(ObjectOutputStream out, ObjectInputStream in, Scanner sc) throws Exception {
        out.writeUTF("DELETE_DOCTOR_BY_ID");

        System.out.println("Nhap Ma Bac Si Muon Xoa: ");
        String maBSXoa =  sc.nextLine();
        out.writeUTF(maBSXoa);
        out.flush();

        boolean isXoa = in.readBoolean();
        if (isXoa) {
            System.out.println("Xoa Thanh Cong.");
        } else {
            System.out.println("Xoa That Bai!!");
        }
    }

}
