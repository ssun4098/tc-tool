package com.ssun.tctool.domain.testcase.infra.entity;

import com.ssun.tctool.global.jpa.BaseEnum;
import lombok.Getter;

@Getter
public enum TestStatus implements BaseEnum<Integer> {
    NOT_STARTED(100),
    IN_PROGRESS(200),
    BLOCKED(300),
    ON_HOLD(301),
    COMPLETED(400),
    PASS(500);

    private final int code;

    TestStatus(int code) {
        this.code = code;
    }

    @Override
    public Integer getCode() {
        return code;
    }
}
