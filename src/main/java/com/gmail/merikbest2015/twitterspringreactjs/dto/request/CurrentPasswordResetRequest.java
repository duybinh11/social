package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class CurrentPasswordResetRequest {
    
    @NotBlank(message = "Mật khẩu hiện tại không được để trống.")
    private String currentPassword;
    
    @NotBlank(message = "Mật khẩu không được để trống.")
    @Size(min = 8, message = "Mật khẩu cần có ít nhất 8 ký tự. Vui lòng nhập dài hơn.")
    private String password;
    
    @NotBlank(message = "Xác nhận mật khẩu không được để trống.")
    @Size(min = 8, message = "Mật khẩu cần có ít nhất 8 ký tự. Vui lòng nhập dài hơn.")
    private String password2;
}
