package com.ssun.tctool.domain.workspace.repository;

import com.ssun.tctool.domain.workspace.dto.WorkspaceItem;
import com.ssun.tctool.domain.workspace.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
    @Query(value = "SELECT w.id, w.name FROM workspace w WHERE deleted = false AND (id > :id AND id < 12 + :id) ORDER BY ID DESC", nativeQuery = true)
    List<WorkspaceItem> findAllBy(Long id);
}
