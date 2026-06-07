package com.gmail.merikbest2015.twitterspringreactjs.service;

import org.springframework.web.multipart.MultipartFile;

public interface LocalImageStorageService {
    String store(MultipartFile multipartFile);
}
