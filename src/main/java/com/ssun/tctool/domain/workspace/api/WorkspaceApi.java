package com.ssun.tctool.domain.workspace.api;

import com.ssun.tctool.domain.workspace.dto.*;
import com.ssun.tctool.domain.workspace.entity.Workspace;
import com.ssun.tctool.domain.workspace.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceApi {

    private final WorkspaceService workspaceService;

    @GetMapping
    public ResponseEntity<List<WorkspaceItem>> findList(@RequestParam(required = false, defaultValue = "0") Long id) {
        return ResponseEntity.ok(workspaceService.findList(id));
    }

    @PostMapping
    public ResponseEntity<WorkspaceCreateRes> create(@RequestBody WorkspaceCreate create) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(workspaceService.create(create));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkspaceUpdateRes> update(@PathVariable Long id, @RequestBody WorkspaceUpdate update) {
        return ResponseEntity.ok(workspaceService.update(id, update));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workspaceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
