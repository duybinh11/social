package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.exception.InputFieldException;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.AuthUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.UserCommonProjection;
import com.gmail.merikbest2015.twitterspringreactjs.security.JwtProvider;
import com.gmail.merikbest2015.twitterspringreactjs.security.UserPrincipal;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.email.MailSender;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final MailSender mailSender;

    @Override
    public Long getAuthenticatedUserId() {
        return ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
    }

    @Override
    public User getAuthenticatedUser() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
    }

    @Override
    public Map<String, Object> login(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            AuthUserProjection user = userRepository.findAuthUserByEmail(email)
                    .orElseThrow(() -> new ApiRequestException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
            String token = jwtProvider.createToken(email, "USER");
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", token);
            return response;
        } catch (AuthenticationException e) {
            throw new ApiRequestException("Mật khẩu hoặc email không đúng", HttpStatus.FORBIDDEN);
        }
    }

    @Override
    public String registration(String email, String username, String birthday) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setUsername(username);
            user.setFullName(username);
            user.setBirthday(birthday);
            user.setRole("USER");
            user.setTweetCount(0L);
            user.setMediaTweetCount(0L);
            user.setLikeCount(0L);
            user.setNotificationsCount(0L);
            user.setLanguage("Tiếng Việt");
            userRepository.save(user);
            return "Đã kiểm tra dữ liệu người dùng.";
        }

        if (!existingUser.get().isActive()) {
            existingUser.get().setUsername(username);
            existingUser.get().setFullName(username);
            existingUser.get().setBirthday(birthday);
            existingUser.get().setRegistrationDate(LocalDateTime.now().withNano(0));
            existingUser.get().setRole("USER");
            userRepository.save(existingUser.get());
            return "Đã kiểm tra dữ liệu người dùng.";
        }
        throw new ApiRequestException("Email đã được sử dụng.", HttpStatus.FORBIDDEN);
    }

    @Override
    @Transactional
    public String sendRegistrationCode(String email) {
        UserCommonProjection user = userRepository.findCommonUserByEmail(email)
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
        userRepository.updateActivationCode(UUID.randomUUID().toString().substring(0, 7), user.getId());

        String subject = "Mã đăng ký";
        String template = "registration-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("fullName", user.getFullName());
        String code = user.getActivationCode();
        attributes.put("registrationCode", code);
        System.out.println("Activation Code: " + code);
        mailSender.sendMessageHtml(user.getEmail(), subject, template, attributes);
        return "Đã gửi mã đăng ký thành công";
    }

    @Override
    @Transactional
    public String activateUser(String code) {
        UserCommonProjection user = userRepository.findCommonUserByActivationCode(code)
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy mã kích hoạt.", HttpStatus.NOT_FOUND));
        userRepository.updateActivationCode(null, user.getId());
        return "Kích hoạt tài khoản thành công.";
    }

    @Override
    @Transactional
    public Map<String, Object> endRegistration(String email, String password) {
        if (password.length() < 8) {
            throw new ApiRequestException("Mật khẩu cần có ít nhất 8 ký tự", HttpStatus.BAD_REQUEST);
        }
        AuthUserProjection user = userRepository.findAuthUserByEmail(email)
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
        userRepository.updatePassword(passwordEncoder.encode(password), user.getId());
        userRepository.updateActiveUserProfile(user.getId());
        String token = jwtProvider.createToken(email, "USER");
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }

    @Override
    public Map<String, Object> getUserByToken() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        AuthUserProjection user = userRepository.findAuthUserByEmail(principal.getName())
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
        String token = jwtProvider.createToken(user.getEmail(), "USER");
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }

    @Override
    public String findEmail(String email) {
        userRepository.findCommonUserByEmail(email)
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy email", HttpStatus.NOT_FOUND));
        return "Mã đặt lại mật khẩu đã được gửi đến email của bạn";
    }

    @Override
    public AuthUserProjection findByPasswordResetCode(String code) {
        return userRepository.findByPasswordResetCode(code)
                .orElseThrow(() -> new ApiRequestException("Mã đặt lại mật khẩu không hợp lệ!", HttpStatus.BAD_REQUEST));
    }

    @Override
    @Transactional
    public String sendPasswordResetCode(String email) {
        UserCommonProjection user = userRepository.findCommonUserByEmail(email)
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy email", HttpStatus.NOT_FOUND));
        userRepository.updatePasswordResetCode(UUID.randomUUID().toString().substring(0, 7), user.getId());

        String subject = "Đặt lại mật khẩu";
        String template = "password-reset-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("fullName", user.getFullName());
        attributes.put("passwordResetCode", user.getPasswordResetCode());
        mailSender.sendMessageHtml(user.getEmail(), subject, template, attributes);
        return "Mã đặt lại mật khẩu đã được gửi đến email của bạn";
    }

    @Override
    @Transactional
    public String passwordReset(String email, String password, String password2) {
        checkMatchPasswords(password, password2);
        UserCommonProjection user = userRepository.findCommonUserByEmail(email)
                .orElseThrow(() -> new InputFieldException(HttpStatus.NOT_FOUND, Map.of("email", "Không tìm thấy email")));
        userRepository.updatePassword(passwordEncoder.encode(password), user.getId());
        userRepository.updatePasswordResetCode(null, user.getId());
        return "Đổi mật khẩu thành công!";
    }

    @Override
    @Transactional
    public String currentPasswordReset(String currentPassword, String password, String password2) {
        Long userId = getAuthenticatedUserId();
        String userPassword = userRepository.getUserPasswordById(userId);

        if (!passwordEncoder.matches(currentPassword, userPassword)) {
            processPasswordException("currentPassword", "Mật khẩu bạn nhập không đúng.", HttpStatus.NOT_FOUND);
        }
        checkMatchPasswords(password, password2);
        userRepository.updatePassword(passwordEncoder.encode(password), userId);
        return "Mật khẩu của bạn đã được cập nhật thành công.";
    }

    private void checkMatchPasswords(String password, String password2) {
        if (password != null && !password.equals(password2)) {
            processPasswordException("password", "Mật khẩu không khớp.", HttpStatus.BAD_REQUEST);
        }
    }

    private void processPasswordException(String paramName, String exceptionMessage, HttpStatus status) {
        throw new InputFieldException(status, Map.of(paramName, exceptionMessage));
    }
}
