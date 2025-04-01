package iuh.fit.entity;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;


@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Treatment implements Serializable {
    private LocalDate startDate;
    private LocalDate endDate;
    private String diagnosis;
}
