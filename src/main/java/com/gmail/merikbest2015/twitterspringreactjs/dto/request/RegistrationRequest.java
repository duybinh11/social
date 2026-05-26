package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class RegistrationRequest {

    @Email(regexp = ".+@.+\\..+", message = "Vui lòng nhập địa chỉ email hợp lệ.")
    private String email;

    @NotBlank(message = "What’s your name?")
    @Size(min = 1, max = 50, message = "Vui lòng nhập tên hợp lệ.")
    private String username;

    private String birthday;
}
