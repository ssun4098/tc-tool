package com.ssun.tctool.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {


    @ExceptionHandler(CommonException.class)
    public ResponseEntity<String> responseCommonResponse(CommonException e) {
        log.error("Error {}", e.getMessage());
        return ResponseEntity.status(e.getResponseStatus())
                .body(e.getMessage());
    }

}
