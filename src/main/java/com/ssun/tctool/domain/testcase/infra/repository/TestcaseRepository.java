package com.ssun.tctool.domain.testcase.infra.repository;

import com.ssun.tctool.domain.testcase.infra.entity.Testcase;
import com.ssun.tctool.domain.workspace.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestcaseRepository extends JpaRepository<Testcase, Long> {
    List<Testcase> findAllByWorkspaceOrderByIdDesc(Workspace workspace);
}
