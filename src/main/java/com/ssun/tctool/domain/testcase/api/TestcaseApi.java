package com.ssun.tctool.domain.testcase.api;

import com.ssun.tctool.domain.testcase.dto.TestcaseCreateReq;
import com.ssun.tctool.domain.testcase.dto.TestcaseCreateRes;
import com.ssun.tctool.domain.testcase.dto.TestcaseItem;
import com.ssun.tctool.domain.testcase.dto.TestcaseSearch;
import com.ssun.tctool.domain.testcase.service.TestcaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/testcases")
public class TestcaseApi {
    private final TestcaseService testcaseService;

    @PostMapping
    public ResponseEntity<TestcaseCreateRes> create(@RequestBody TestcaseCreateReq body) {
        return ResponseEntity.ok(testcaseService.create(body));
    }

    @GetMapping
    public ResponseEntity<List<TestcaseItem>> findList(TestcaseSearch search) {
        return ResponseEntity.ok(testcaseService.findList(search));
    }
}
