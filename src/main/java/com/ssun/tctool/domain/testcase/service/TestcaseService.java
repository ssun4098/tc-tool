package com.ssun.tctool.domain.testcase.service;

import com.ssun.tctool.domain.testcase.dto.TestcaseCreateReq;
import com.ssun.tctool.domain.testcase.dto.TestcaseCreateRes;
import com.ssun.tctool.domain.testcase.dto.TestcaseItem;
import com.ssun.tctool.domain.testcase.dto.TestcaseSearch;
import com.ssun.tctool.domain.testcase.infra.entity.Testcase;
import com.ssun.tctool.domain.testcase.infra.repository.TestcaseRepository;
import com.ssun.tctool.domain.workspace.entity.Workspace;
import com.ssun.tctool.domain.workspace.repository.WorkspaceRepository;
import com.ssun.tctool.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TestcaseService {
    private final TestcaseRepository testcaseRepository;
    private final WorkspaceRepository workspaceRepository;

    @Transactional
    public TestcaseCreateRes create(TestcaseCreateReq param) {
        Workspace workspace = workspaceRepository.findById(param.getWorkspaceId())
                .orElseThrow(() -> new CommonException("워크스페이스를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        Testcase result = testcaseRepository.save(Testcase.builder()
                        .name(param.getName())
                        .link(param.getLink())
                        .explanation(param.getExplanation())
                        .assignee(param.getAssignee())
                        .category1(param.getCategory1())
                        .category2(param.getCategory2())
                        .category3(param.getCategory3())
                        .workspace(workspace)
                .build());
        return new TestcaseCreateRes(result.getId(), result.getName(), result.getAssignee(), result.getCategory1(), result.getCategory2(), result.getCategory3(), result.getStatus().name());
    }

    public List<TestcaseItem> findList(TestcaseSearch param) {
        Workspace workspace = workspaceRepository.findById(param.getWorkspaceId())
                .orElseThrow(() -> new CommonException("워크스페이스를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
        return testcaseRepository.findAllByWorkspaceOrderByIdDesc(workspace)
                .stream()
                .map((testcase -> TestcaseItem.builder()
                        .id(testcase.getId())
                        .name(testcase.getName())
                        .assignee(testcase.getAssignee())
                        .category1(testcase.getCategory1())
                        .category2(testcase.getCategory2())
                        .category3(testcase.getCategory3())
                        .status(testcase.getStatus().name())
                        .build())
                )
                .toList();
    }
}
