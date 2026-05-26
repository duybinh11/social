package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class AuthenticationRequest {

    @Email(regexp = ".+@.+\\..+", message = "Vui lòng nhập địa chỉ email hợp lệ.")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống.")
    @Size(min = 8, message = "Mật khẩu cần có ít nhất 8 ký tự. Vui lòng nhập dài hơn.")
    private String password;
}
