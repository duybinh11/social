package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import javax.validation.constraints.Email;

import lombok.Data;

@Data
public class ProcessEmailRequest {
    @Email(regexp = ".+@.+\\..+", message = "Vui lòng nhập địa chỉ email hợp lệ.")
    private String email;
}
