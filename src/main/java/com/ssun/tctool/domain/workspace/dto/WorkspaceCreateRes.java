package com.ssun.tctool.domain.workspace.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WorkspaceCreateRes {
    private final Long id;
    private final String name;
}
