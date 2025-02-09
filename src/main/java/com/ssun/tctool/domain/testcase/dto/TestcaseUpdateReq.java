package com.ssun.tctool.domain.testcase.dto;

import lombok.Getter;

@Getter
public class TestcaseUpdateReq {
    private String name;
    private String link;
    private String explanation;
    private String assignee;
    private String category1;
    private String category2;
    private String category3;
    private String status;
}
