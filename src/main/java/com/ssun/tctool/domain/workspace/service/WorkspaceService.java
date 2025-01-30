package com.ssun.tctool.domain.workspace.service;

import com.ssun.tctool.domain.workspace.dto.*;
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
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    @Transactional
    public WorkspaceCreateRes create(WorkspaceCreate create) {
        Workspace result = workspaceRepository.save(Workspace.builder()
                .name(create.getName())
                .build());
        return new WorkspaceCreateRes(result.getId(), result.getName());
    }

    @Transactional
    public WorkspaceUpdateRes update(Long id, WorkspaceUpdate update) {
        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() -> new CommonException("워크스페이스를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        workspace.update(update.getName());
        return new WorkspaceUpdateRes(workspace.getId(), workspace.getName());
    }

    public List<WorkspaceItem> findList(Long id) {
        return workspaceRepository.findAllBy(id);
    }

    @Transactional
    public void delete(Long id) {
        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() -> new CommonException("워크스페이스를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
        workspace.delete();
    }
}
