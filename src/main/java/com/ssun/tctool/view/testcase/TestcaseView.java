package com.ssun.tctool.view.testcase;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/testcases")
public class TestcaseView {

    @GetMapping
    public String list(@RequestParam Long workspaceId) {
        return "/html/testcase/list.html";
    }

}
