package com.ssun.tctool.domain.testcase.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TestcaseUpdateRes {
    private Long id;
    private String name;
    private String assignee;
    private String category1;
    private String category2;
    private String category3;
    private String status;
}
