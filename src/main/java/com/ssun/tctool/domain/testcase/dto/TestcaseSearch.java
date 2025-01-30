package com.ssun.tctool.domain.testcase.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TestcaseSearch {
    private Long workspaceId;
    private String name;
}
