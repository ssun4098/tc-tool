package com.ssun.tctool.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CommonException extends RuntimeException {
    private HttpStatus responseStatus;

    public CommonException(String message, HttpStatus responseStatus) {
        super(message);
        this.responseStatus = responseStatus;
    }
}
