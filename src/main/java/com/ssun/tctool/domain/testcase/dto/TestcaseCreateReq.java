package com.ssun.tctool.domain.testcase.dto;

import jakarta.persistence.Column;
import lombok.Getter;

@Getter
public class TestcaseCreateReq {
    private Long workspaceId;
    private String name;
    private String link;
    private String explanation;
    private String assignee;
    private String category1;
    private String category2;
    private String category3;
}
