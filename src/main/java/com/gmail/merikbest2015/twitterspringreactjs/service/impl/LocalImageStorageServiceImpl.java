package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.service.LocalImageStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class LocalImageStorageServiceImpl implements LocalImageStorageService {

    @Value("${app.upload.local-dir:uploads}")
    private String localUploadDir;

    @Value("${app.upload.base-url:http://localhost:8080}")
    private String uploadBaseUrl;

    @Override
    public String store(MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            throw new ApiRequestException("Không tìm thấy tệp phương tiện", HttpStatus.BAD_REQUEST);
        }

        String fileName = buildFileName(multipartFile.getOriginalFilename());

        try {
            Path uploadDirectory = Paths.get(localUploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadDirectory);
            Path targetFile = uploadDirectory.resolve(fileName);
            multipartFile.transferTo(targetFile.toFile());
            return uploadBaseUrl.replaceAll("/$", "") + "/uploads/" + fileName;
        } catch (IOException exception) {
            throw new ApiRequestException("Không thể lưu tệp phương tiện", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String buildFileName(String originalFilename) {
        String safeName = originalFilename == null ? "media" : originalFilename.replaceAll("[^a-zA-Z0-9._-]", "_");
        return UUID.randomUUID() + "_" + safeName;
    }
}
