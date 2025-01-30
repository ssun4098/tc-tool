package com.ssun.tctool.domain.testcase.infra.entity.converter;

import com.ssun.tctool.domain.testcase.infra.entity.TestStatus;
import com.ssun.tctool.global.jpa.BaseEnumConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TestStatusConverter extends BaseEnumConverter<TestStatus, Integer> {
    protected TestStatusConverter() {
        super(TestStatus.class);
    }
}
